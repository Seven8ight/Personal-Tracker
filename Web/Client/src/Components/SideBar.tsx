import { useTabSwitcher } from "./Contexts/TabSwitcher";
import { useModalOpener, type currentmodal } from "./Contexts/ModalHandler";
import { useMusicPlayer } from "./Contexts/MusicHandler";

const Sidebar = (): React.ReactNode => {
  const { setter } = useTabSwitcher(),
    { setter2 } = useModalOpener(),
    openHandler = (event: React.MouseEvent, targetModal: currentmodal) => {
      event.stopPropagation();
      setter2(targetModal);
    },
    { audioRef, timeHandler, muted, mutedHandler, playHandler } =
      useMusicPlayer();

  const muteHandler = () => {
    mutedHandler(!muted);
    timeHandler(audioRef?.current.currentTime as number);
    playHandler(true);
  };

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
        <button onClick={() => muteHandler()}>
          {!muted && <i className="fa-solid fa-volume-xmark"></i>}
          {muted && <i className="fa-solid fa-volume-high"></i>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
