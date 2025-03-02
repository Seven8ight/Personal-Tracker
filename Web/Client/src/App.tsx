import Sidebar from "./Components/SideBar";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Tabs/Dashboard";
import Timer from "./Components/Tabs/Timer";
import Account from "./Components/Modals/Account";
import { useTabSwitcher } from "./Components/Contexts/TabSwitcher";
import { useModalOpener } from "./Components/Contexts/ModalHandler";
import Music from "./Components/Modals/Music";
import Settings from "./Components/Modals/Settings ";
import { useEffect } from "react";

const App = (): React.ReactNode => {
  const { tab } = useTabSwitcher();
  let { currentModal, setter2 } = useModalOpener();

  useEffect(() => {
    const handleClicker = async (event: MouseEvent) => {
      let clickedElement = event.target as HTMLElement,
        modals = [
          document.getElementById("accountModal"),
          document.getElementById("musicModal"),
          document.getElementById("settingsModal"),
        ],
        Modal = modals.find((element) =>
          element?.id.includes(currentModal.toLowerCase())
        ) as HTMLElement;

      if (Modal) {
        if (!Modal.contains(clickedElement)) {
          setter2("None");
        }
      }
    };
    document.addEventListener("click", handleClicker);

    return () => {
      document.removeEventListener("click", handleClicker);
    };
  }, [currentModal]);

  return (
    <>
      <div id="Navigation nodes">
        <Navbar />
        <Sidebar />
      </div>
      <div id="main pages">
        {tab == "Dashboard" ? <Dashboard /> : <Timer />}
      </div>
      <div id="Modal nodes">
        {currentModal != "None" && currentModal == "Account" ? (
          <Account />
        ) : currentModal == "Music" ? (
          <Music />
        ) : currentModal == "Settings" ? (
          <Settings />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default App;
