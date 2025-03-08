import soundFile1 from "./../../Resources/Music/Bedtime_Coffee.mp3";
import soundFile2 from "./../../Resources/Music/Lost_and_found.mp3";
import soundFile3 from "./../../Resources/Music/On_my_way.mp3";
import soundFile4 from "./../../Resources/Music/Purple_Dream.mp3";
import soundFile5 from "./../../Resources/Music/Silent_Wood.mp3";
import soundFile6 from "./../../Resources/Music/Sonder.mp3";
import soundFile7 from "./../../Resources/Music/Still_Awake.mp3";
import soundFile8 from "./../../Resources/Music/Transcendence.mp3";
import soundFile9 from "./../../Resources/Music/Wildflowers.mp3";
import soundFile10 from "./../../Resources/Music/hibiscus.mp3";
import soundFile11 from "./../../Resources/Music/And_so_it_begins.mp3";
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
  musicContainer: string[];
  musicContainerHandler: Dispatch<SetStateAction<string[]>>;
  muted: boolean;
  mutedHandler: Dispatch<SetStateAction<boolean>>;
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
  musicContainer: [],
  musicContainerHandler: () => {},
  muted: false,
  mutedHandler: () => {},
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
    musicContainer,
    musicContainerHandler,
    muted,
    mutedHandler,
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
    musicContainer,
    musicContainerHandler,
    muted,
    mutedHandler,
  };
};

const MusicHandler = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [urls, setUrls] = useState<string[]>([
      soundFile1,
      soundFile2,
      soundFile3,
      soundFile4,
      soundFile5,
      soundFile6,
      soundFile7,
      soundFile8,
      soundFile9,
      soundFile10,
      soundFile11,
    ]),
    [index, setIndex] = useState<number>(
      Math.floor(Math.random() * (urls.length - 1))
    ),
    [playing, setPlaying] = useState<boolean>(false),
    [currentTime, setTime] = useState<number>(0),
    [muted, setMuted] = useState<boolean>(false),
    audioRef = useRef(new Audio(urls[index]));

  useEffect(() => {
    audioRef.current.src = urls[index];
    if (muted) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = 1;
    }
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
  }, [index, playing, currentTime, muted]);

  setInterval(() => {
    if (audioRef.current.ended) {
      if (index + 1 == urls.length) setIndex(0);
      else setIndex((current) => current + 1);
    }
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
        musicContainer: urls,
        musicContainerHandler: setUrls,
        muted: muted,
        mutedHandler: setMuted,
      }}
    >
      {children}
    </MusicPlayer.Provider>
  );
};

export default MusicHandler;
