import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useMusicPlayer } from "../Contexts/MusicHandler";

type option = "Currentplaylist" | "CustomList";

type media = {
  id: number;
  name: string;
  src: string;
};

const mediaChecker = (obj: Partial<media>): obj is media =>
  obj.name != undefined && obj.src != undefined;

const Music = (): React.ReactNode => {
  const [tab, setTab] = useState<option>("CustomList"),
    tabHandler = (Tab: option) => {
      setTab(Tab);
    },
    {
      audioRef,
      indexHandler,
      playing,
      musicContainerHandler,
      playHandler,
      musicContainer,
      timeHandler,
    } = useMusicPlayer(),
    CurrentlyPlaying = ({
      musicIndex,
      musicName,
    }: {
      musicIndex: number;
      musicName: string;
    }): React.ReactNode => {
      if (audioRef?.current.src.includes(musicName))
        return (
          <button
            onClick={(event) => {
              event.stopPropagation();
              playHandler(!playing);
              timeHandler(audioRef.current.currentTime);
            }}
          >
            {playing && <i className="fa-solid fa-pause" />}
            {!playing && <i className="fa-solid fa-play" />}
          </button>
        );
      else {
        return (
          <button
            onClick={(event) => {
              event.stopPropagation();
              indexHandler(musicIndex);
              playHandler(true);
            }}
          >
            <i className="fa-solid fa-play"></i>
          </button>
        );
      }
    },
    deletionHandler = (id: number) => {
      musicContainerHandler((current) =>
        current.filter((_, index) => index != id)
      );
    };

  useEffect(() => {
    const customTab = document.querySelector<HTMLDivElement>(
        "#musicModal #custom"
      ),
      currentPlaylistTab = document.querySelector<HTMLDivElement>(
        "#musicModal #current"
      ),
      underliner = document.querySelector<HTMLDivElement>(
        "#musicModal #switch #underliner"
      );

    if (customTab && currentPlaylistTab && underliner) {
      if (tab == "Currentplaylist") {
        currentPlaylistTab.style.display = "block";
        customTab.style.display = "none";
        underliner.style.transform = "translateX(212.5px)";
      } else {
        customTab.style.display = "block";
        currentPlaylistTab.style.display = "none";
        underliner.style.transform = "translateX(00px)";
      }
    }
  }, [tab]);

  //Custom music
  const inputRef = useRef<HTMLInputElement | null>(null),
    [customList, setList] = useState<media[]>([]);

  const onchangeHandler = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    let file = event.target.files;

    Array.from(file as FileList).forEach((file) => {
      const audioReader = new FileReader(),
        musicId = customList.length + 1;
      let mediaObj: Partial<media> = {};

      audioReader.onload = (_: ProgressEvent) => {
        mediaObj.id = musicId;
        mediaObj.name = file.name;
        mediaObj.src = audioReader.result as string;

        if (mediaChecker(mediaObj))
          setList((current) => [...current, mediaObj]);
      };

      audioReader.readAsDataURL(file);
    });
  };

  return (
    <div id="musicModal">
      <div id="switch">
        <button onClick={() => tabHandler("CustomList")}>Custom List</button>
        <button onClick={() => tabHandler("Currentplaylist")}>
          Current Playlist
        </button>
        <div id="underliner"></div>
      </div>
      <div id="custom">
        <div id="addition">
          <div>
            <label>Add </label>
            <input
              ref={inputRef}
              onChange={onchangeHandler}
              type="file"
              title="Enter a file"
              accept=".mp3,.mpeg"
            />
          </div>
        </div>
        <div id="customlist">
          {customList.length > 0 &&
            customList.map((file) => (
              <div id={`music-${file.id}`} key={file.id}>
                <p>{file.name}</p>
                <div id="commands">
                  <button>
                    <i className="fa-solid fa-play"></i>
                  </button>
                  <button>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            ))}
          {customList.length == 0 && (
            <div id="emptycustom">
              <p>No customs added</p>
              <p>Experimental, currently not functional as expected</p>
            </div>
          )}
        </div>
      </div>
      <div id="current">
        {musicContainer.map((music, index) => {
          return (
            <div id={`music-${index}`} key={index}>
              <p>{music.split("/")[4].replace(/_/g, " ").split(".")[0]}</p>
              <div id="commands">
                <CurrentlyPlaying musicIndex={index} musicName={music} />
                <button onClick={() => deletionHandler(index)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Music;
