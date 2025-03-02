import { useModalOpener, type currentmodal } from "./Contexts/ModalHandler";
import { useTabSwitcher } from "./Contexts/TabSwitcher";

const Navbar = (): React.ReactNode => {
  const currentTime = new Date(),
    { setter } = useTabSwitcher(),
    { setter2 } = useModalOpener(),
    openHandler = (event: React.MouseEvent, targetModal: currentmodal) => {
      event.stopPropagation();
      setter2(targetModal);
    };

  return (
    <div id="navbar">
      <div id="time">
        <p>{`${
          currentTime.getHours() < 10
            ? currentTime.getHours().toString().padStart(2, "0")
            : currentTime.getHours()
        }:${
          currentTime.getMinutes() < 10
            ? currentTime.getMinutes().toString().padStart(2, "0")
            : currentTime.getMinutes()
        } ${currentTime.getHours() < 12 ? "am" : "pm"}`}</p>
      </div>
      <div id="changeTabs">
        <button id="dashboardtab" onClick={() => setter("Dashboard")}>
          <i className="fa-solid fa-table"></i>
        </button>
        <button id="timertab" onClick={() => setter("Pomodoro")}>
          <i className="fa-solid fa-clock"></i>
        </button>
      </div>
      <div id="account">
        <button
          onClick={(event: React.MouseEvent) => openHandler(event, "Account")}
        >
          <i className="fa-solid fa-user-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
