import soundfile1 from "./../../Resources/Music/Sonder.mp3";
import soundFile2 from "./../../Resources/Music/Transcendence-chosic.com_.mp3";
import soundFile3 from "./../../Resources/Music/Wildflowers-chosic.com_.mp3";
import soundFile4 from "./../../Resources/Music/bedtimecoffee.mp3";
import soundFile5 from "./../../Resources/Music/hibiscus.mp3";
import soundFile6 from "./../../Resources/Music/purpledream.mp3";
import soundFile7 from "./../../Resources/Music/silentwood.mp3";
import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Handler = {
  total: number;
  index: number;
  audioRef: RefObject<HTMLAudioElement> | null;
  indexHandler: Dispatch<SetStateAction<number>>;
  playing: boolean;
  playHandler: Dispatch<SetStateAction<boolean>>;
  currentTime: number;
  timeHandler: Dispatch<SetStateAction<number>>;
};

const MusicPlayer = createContext<Handler>({
  total: 0,
  index: 0,
  audioRef: null,
  indexHandler: () => {},
  playing: false,
  playHandler: () => {},
  currentTime: 0,
  timeHandler: () => {},
});

export const useMusicPlayer = () => {
  const {
    total,
    index,
    indexHandler,
    playing,
    playHandler,
    timeHandler,
    currentTime,
    audioRef,
  } = useContext(MusicPlayer);
  return {
    total,
    index,
    indexHandler,
    playing,
    playHandler,
    timeHandler,
    currentTime,
    audioRef,
  };
};

const MusicHandler = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const urls = [
      soundfile1,
      soundFile2,
      soundFile3,
      soundFile4,
      soundFile5,
      soundFile6,
      soundFile7,
    ],
    [index, setIndex] = useState<number>(
      Math.floor(Math.random() * (urls.length - 1))
    ),
    [playing, setPlaying] = useState<boolean>(false),
    [currentTime, setTime] = useState<number>(0),
    audioRef = useRef(new Audio(urls[index]));

  useEffect(() => {
    audioRef.current.src = urls[index];
    if (playing) {
      audioRef.current.currentTime = currentTime;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    return () => {
      audioRef.current.pause();
      audioRef.current.src = "";
    };
  }, [index, playing, currentTime]);

  setInterval(() => {
    if (audioRef.current.ended) setIndex((index) => index + 1);
  }, 1000);

  return (
    <MusicPlayer.Provider
      value={{
        total: urls.length,
        audioRef: audioRef,
        index: index,
        indexHandler: setIndex,
        playing: playing,
        playHandler: setPlaying,
        currentTime: currentTime,
        timeHandler: setTime,
      }}
    >
      {children}
    </MusicPlayer.Provider>
  );
};

export default MusicHandler;
