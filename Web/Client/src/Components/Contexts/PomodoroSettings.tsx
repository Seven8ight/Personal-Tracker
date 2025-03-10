import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type times = {
  focus: number;
  longBreak: number;
  shortBreak: number;
};

type settings = {
  defaults: times;
  setSettings: Dispatch<SetStateAction<times>>;
};

const Times = createContext<settings>({
  defaults: {
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
  },
  setSettings: () => {},
});

export const useTimes = () => {
  const { defaults, setSettings } = useContext(Times);
  return { defaults, setSettings };
};

const PomoProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [currentSettings, setSettings] = useState<times>({
    focus: 45,
    shortBreak: 3,
    longBreak: 20,
  });

  return (
    <Times.Provider
      value={{ defaults: currentSettings, setSettings: setSettings }}
    >
      {children}
    </Times.Provider>
  );
};

export default PomoProvider;
