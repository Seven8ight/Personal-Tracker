//Stores background-specified, timer on, and tasks applied for the moment and handles local storage
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { times } from "../Tabs/Timer";

export type timer = {
  type: times;
  minutes: number;
  seconds: number;
  paused: boolean;
};
type task = {
  id: number;
  task: string;
  status: "Complete" | "Incomplete";
};
type data = {
  summaryTasks: dayTasks[];
  summaryTHandler: Dispatch<SetStateAction<dayTasks[]>>;
  summaryTimes: timeTaken[];
  summaryTimeHandler: Dispatch<SetStateAction<timeTaken[]>>;
  presentTasks: task[];
  activeTasksHandler: Dispatch<SetStateAction<task[]>>;
  timer: timer;
  activeTimeHandler: Dispatch<SetStateAction<timer>>;
  backgroundId: number | null;
  backgroundHandler: Dispatch<SetStateAction<number | null>>;
};
type dayTasks = {
  Day: string;
  taskCount: number;
};
type timeTaken = {
  Day: string;
  timeInhours: number;
};
//timer and tasks hold for days
const Storage = createContext<data>({
  summaryTasks: [],
  summaryTHandler: () => {},
  summaryTimes: [],
  summaryTimeHandler: () => {},
  presentTasks: [],
  activeTasksHandler: () => {},
  timer: {
    type: "focus",
    minutes: 45,
    seconds: 0,
    paused: true,
  },
  activeTimeHandler: () => {},
  backgroundId: 1,
  backgroundHandler: () => {},
});

export const useStorage = () => {
  const {
    summaryTasks,
    summaryTHandler,
    summaryTimes,
    summaryTimeHandler,
    presentTasks,
    activeTasksHandler,
    timer,
    activeTimeHandler,
    backgroundId,
    backgroundHandler,
  } = useContext(Storage);

  return {
    summaryTasks,
    summaryTHandler,
    summaryTimes,
    summaryTimeHandler,
    presentTasks,
    activeTasksHandler,
    timer,
    activeTimeHandler,
    backgroundId,
    backgroundHandler,
  };
};

const StorageHandler = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  //Current tasks
  const [tasks, setTasks] = useState<task[]>([]),
    [timer, setTimer] = useState<timer | null>(null),
    [backgroundId, setBId] = useState<number | null>(null);
  //Summary Data
  const [DayTasks, setDTasks] = useState<dayTasks[]>([]),
    [DayTimes, setTimes] = useState<timeTaken[]>([]);

  const presentTasks = localStorage.getItem("Present Tasks"),
    presentTime = localStorage.getItem("Present Time"),
    summaryTasks = localStorage.getItem("Summary Tasks"),
    summaryTime = localStorage.getItem("Summary Time"),
    localbackgroundId = localStorage.getItem("Background Id");

  //Getter
  useEffect(() => {
    if (localbackgroundId != null) setBId(Number.parseInt(localbackgroundId));
    if (presentTasks != null) setTasks(JSON.parse(presentTasks));
    if (presentTime != null) setTimer(JSON.parse(presentTime));
    if (summaryTime != null) setTimes(JSON.parse(summaryTime));
    if (summaryTasks != null) setDTasks(JSON.parse(summaryTasks));
  }, []);

  //Setter -- first time joining
  useEffect(() => {
    if (typeof backgroundId == "number")
      window.localStorage.setItem("Background Id", backgroundId.toString());

    if (presentTasks == null)
      window.localStorage.setItem("Present Tasks", JSON.stringify([]));
    else window.localStorage.setItem("Present Tasks", JSON.stringify(tasks));

    if (presentTime == null)
      window.localStorage.setItem("Present Time", JSON.stringify({}));
    else window.localStorage.setItem("Present Time", JSON.stringify(timer));

    if (summaryTasks == null)
      window.localStorage.setItem("Summary Tasks", JSON.stringify([]));
    else window.localStorage.setItem("Summary Tasks", JSON.stringify(DayTasks));

    if (summaryTime == null)
      window.localStorage.setItem("Summary Time", JSON.stringify([]));
    else window.localStorage.setItem("Summary Time", JSON.stringify(DayTimes));
  }, [backgroundId, tasks, timer, DayTasks, DayTimes]);

  return (
    <Storage.Provider
      value={{
        summaryTasks: DayTasks,
        summaryTHandler: setDTasks,
        summaryTimes: DayTimes,
        summaryTimeHandler: setTimes,
        presentTasks: tasks,
        activeTasksHandler: setTasks,
        timer: timer as timer,
        activeTimeHandler: setTimer as Dispatch<SetStateAction<timer>>,
        backgroundId: backgroundId,
        backgroundHandler: setBId,
      }}
    >
      {children}
    </Storage.Provider>
  );
};

export default StorageHandler;
