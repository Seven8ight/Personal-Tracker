import { useTabSwitcher } from "./Contexts/TabSwitcher";
import { useModalOpener, type currentmodal } from "./Contexts/ModalHandler";
import { useState } from "react";

const Sidebar = (): React.ReactNode => {
  const { setter } = useTabSwitcher(),
    { setter2 } = useModalOpener(),
    openHandler = (event: React.MouseEvent, targetModal: currentmodal) => {
      event.stopPropagation();
      setter2(targetModal);
    },
    [muted, setMuted] = useState<boolean>(false);

  return (
    <div id="sidebar">
      <div id="navigation">
        <button onClick={() => setter("Dashboard")}>
          <i className="fa-solid fa-house"></i>
        </button>
        <button onClick={() => setter("Pomodoro")}>
          <i className="fa-solid fa-hourglass"></i>
        </button>
        <button>
          <i
            className="fa-solid fa-record-vinyl"
            onClick={(event: React.MouseEvent) => openHandler(event, "Music")}
          ></i>
        </button>
      </div>
      <div id="settings">
        <button
          onClick={(event: React.MouseEvent) => openHandler(event, "Settings")}
        >
          <i className="fa-solid fa-gear"></i>
        </button>
        <button onClick={() => setMuted(!muted)}>
          {!muted && <i className="fa-solid fa-volume-xmark"></i>}
          {muted && <i className="fa-solid fa-volume-high"></i>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
