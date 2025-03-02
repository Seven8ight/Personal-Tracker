import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type tabs = "Dashboard" | "Pomodoro";

type Context = {
  tab: tabs;
  setter: Dispatch<SetStateAction<tabs>>;
};

export const TabSwitcher = createContext<Context>({
  tab: "Dashboard",
  setter: () => {},
});

export const useTabSwitcher = () => {
  const { tab, setter } = useContext(TabSwitcher);
  return { tab, setter };
};

export default function Switcher({ children }: { children: React.ReactNode }) {
  const [currentTab, setTab] = useState<tabs>("Dashboard");

  return (
    <TabSwitcher.Provider value={{ tab: currentTab, setter: setTab }}>
      {children}
    </TabSwitcher.Provider>
  );
}
