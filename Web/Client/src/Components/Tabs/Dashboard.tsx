import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ChartContainer, ChartConfig } from "../ui/chart";
import { Bar, BarChart, XAxis } from "recharts";
import { useMusicPlayer } from "../Contexts/MusicHandler";
import { usePhotos } from "../Contexts/PicturesHandler";
import Error from "../Popups/Error";

type audio = {
  id: number;
  name: string;
  audio: string;
  playing: boolean;
};

const Dashboard = (): React.ReactNode => {
  //Summary
  const chartData = [
    { month: "January", day: "Monday", desktop: 186, mobile: 80 },
    { month: "February", day: "Tuesday", desktop: 305, mobile: 200 },
    { month: "March", day: "Wednesday", desktop: 237, mobile: 120 },
    { month: "April", day: "Thursday", desktop: 73, mobile: 190 },
    { month: "May", day: "Friday", desktop: 209, mobile: 130 },
    { month: "June", day: "Saturday", desktop: 214, mobile: 140 },
    { day: "Sunday", desktop: 150, mobile: 70 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "white",
    },
    mobile: {
      label: "Mobile",
      color: "black",
    },
  } satisfies ChartConfig;

  //Audio-Recordings
  const [audioTapes, setTapes] = useState<audio[]>([]),
    [recording, setRecording] = useState<boolean>(false),
    [currentClip, setClip] = useState<number>(0),
    [clipName, setName] = useState<string>(""),
    inputRef = useRef<HTMLInputElement | null>(null),
    audioCapture: Blob[] = [];

  useEffect(() => {
    let mediaRecorder: MediaRecorder | null = null,
      stream: MediaStream | null = null,
      tapeId = audioTapes.length + 1;

    const startRecording = async () => {
        try {
          if ((inputRef.current as HTMLInputElement).value.length > 0) {
            stream = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: false,
            });
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.start();

            mediaRecorder.onstart = () => {
              playHandler(false);
              if (mediaRecorder)
                mediaRecorder.ondataavailable = (event: BlobEvent) => {
                  audioCapture.push(event.data);
                };
            };

            mediaRecorder.onstop = () => {
              console.log(audioCapture);
              const audioFile: Blob = new Blob(audioCapture, {
                  type: "audio/mp4",
                }),
                audioReader: FileReader = new FileReader();

              audioReader.onloadend = () => {
                console.log(audioReader.result);

                const audioBaseSrc = audioReader.result as string;

                setTapes((tapes) => [
                  ...tapes,
                  {
                    id: tapeId,
                    name: clipName,
                    audio: audioBaseSrc,
                    playing: false,
                  },
                ]);
              };

              audioReader.readAsDataURL(audioFile);
            };
          } else
            (inputRef.current as HTMLInputElement).placeholder =
              "Enter a value first";
        } catch (error) {
          if (
            error ==
            "NotAllowedError: The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission."
          ) {
            console.log("Not allowed");
            <Error type="Rejected Media" />;
            setRecording(false);
          } else {
            console.log(error);
          }
        }
      },
      stopRecording = async () => {
        if (mediaRecorder) {
          mediaRecorder.stop();
        }
      };

    if (recording) startRecording();
    else stopRecording();

    return () => {
      if (mediaRecorder && mediaRecorder.state == "recording")
        mediaRecorder.stop();
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, [recording]);

  const audioHandler = (id: number): void => {
      let audioElement = document.querySelector<HTMLAudioElement>(
          `#tape-${id} audio`
        ),
        audioTape = audioTapes.find((tape) => tape.id == id) as audio;

      if (audioElement && audioTape) {
        if (audioTape.playing) {
          audioElement.pause();
          audioTape.playing = false;
        } else {
          audioElement.play();
          audioTape.playing = true;
          playHandler(false);
        }
      }

      setTapes((tapes) =>
        [...tapes].map((tape) => {
          if (tape.id == id) return audioTape;
          return tape;
        })
      );
      setClip(id);
    },
    clipHandler = (type: "next" | "previous"): void => {
      if (type == "next") {
        if (currentClip + 1 == audioTapes.length)
          setClip((current) => current + 1);
        else setClip(0);
      } else {
        if (currentClip - 1 < 0) setClip(0);
      }
    },
    deleteClip = (id: number): void => {
      setTapes((tapes) => tapes.filter((tape) => tape.id != id));
    };

  //Music Handler
  const {
    audioRef,
    total,
    index,
    indexHandler,
    playing,
    playHandler,
    timeHandler,
    musicContainerHandler,
  } = useMusicPlayer();

  const nextPreviousHandler = (action: "Next" | "Back") => {
    if (action == "Next") {
      if (index + 1 == total) indexHandler(0);
      else indexHandler((current) => current + 1);
      timeHandler(0);
    } else {
      if (index - 1 < 0) indexHandler(total - 1);
      else indexHandler((current) => current - 1);
      timeHandler(0);
    }
  };

  const musicShuffler = (): void => {
    playHandler(false);
    timeHandler(0);
    musicContainerHandler((musicArray) =>
      musicArray
        .map((value) => ({ value, sort: Math.random() * 10 }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    );
  };

  //Photos
  const photos = usePhotos(),
    [photoIndex, setIndex] = useState<number>(1),
    photo = photos?.photos[photoIndex];

  const photoIndexHandler = () => {
    setIndex(Math.floor(Math.random() * 9));
  };

  return (
    <div id="dashboard">
      <div id="summary" className="shadow-2xl p-5">
        <h1>Summary</h1>
        <div id="summarydetails">
          <div id="tasksdone">
            <i className="fa-solid fa-list-check"></i>
            <p>Tasks so far</p>
            <p>3 tasks done</p>
          </div>
          <div id="timetaken">
            <i className="fa-solid fa-clock-rotate-left"></i>
            <p>Time taken</p>
            <p>5 hrs so far</p>
          </div>
        </div>
      </div>
      <div id="graph">
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] w-full border-none shadow-2xl"
          title="Performance"
        >
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
      <div id="recordings" className="shadow-2xl p-5">
        <h1>Audio Recordings</h1>
        <audio src="#"></audio>
        <div id="records">
          <p>Provide notes in form of audio recordings</p>
          <div id="addRecord">
            <input
              value={clipName}
              type="text"
              placeholder="Name"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setName(event.target.value)
              }
              ref={inputRef}
            />
            <button onClick={() => setRecording(!recording)}>
              {recording == false ? "Start Recording" : "Stop Recording"}
            </button>
          </div>
          <div id="clips">
            {audioTapes.length > 0 &&
              audioTapes.map((tape) => (
                <div id={`tape-${tape.id}`} key={tape.id}>
                  <audio src={tape.audio}></audio>
                  <p>{tape.name}</p>
                  <div id="audio">
                    <button onClick={() => clipHandler("previous")}>
                      <i className="fa-solid fa-backward-step"></i>
                    </button>
                    <button onClick={() => audioHandler(tape.id)}>
                      {tape.playing && <i className="fa-solid fa-pause"></i>}
                      {!tape.playing && <i className="fa-solid fa-play"></i>}
                    </button>
                    <button onClick={() => clipHandler("next")}>
                      <i className="fa-solid fa-forward-step"></i>
                    </button>
                    <button onClick={() => deleteClip(tape.id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            {audioTapes.length == 0 && (
              <div>
                <p className="font-[Cookie] text-2xl">No Recordings Added</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div id="music" className="shadow-2xl p-5">
        <h1>Music</h1>
        <div id="musicdesc">
          <img src={photo?.src.original} alt="music banner" />
          <p>
            <a href={photo?.photographer_url}>{photo?.photographer}</a>
          </p>
        </div>
        <div id="audio">
          <button onClick={() => nextPreviousHandler("Back")}>
            <i className="fa-solid fa-backward-step"></i>
          </button>
          <button
            onClick={() => {
              playHandler(!playing);
              if (audioRef?.current.currentTime)
                timeHandler(audioRef.current.currentTime);
            }}
          >
            {playing == false && <i className="fa-solid fa-play"></i>}
            {playing == true && <i className="fa-solid fa-pause"></i>}
          </button>
          <button>
            <i
              className="fa-solid fa-forward-step"
              onClick={() => nextPreviousHandler("Next")}
            ></i>
          </button>
        </div>
        <div id="options">
          <button onClick={() => musicShuffler()}>
            <i className="fa-solid fa-shuffle"></i>
          </button>
          <button onClick={photoIndexHandler}>
            <i className="fa-solid fa-dice"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
