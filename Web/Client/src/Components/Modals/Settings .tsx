import { useTimes } from "../Contexts/PomodoroSettings";
import { useStorage } from "../Contexts/StorageHandler";
import Background1 from "./../../public/circle-scatter-haikei.svg";
import Background2 from "./../../public/layered-waves-haikei-2.svg";
import Background3 from "./../../public/layered-waves-haikei.svg";
import Background4 from "./../../public/stacked-waves-haikei.svg";

type settings = "focus" | "longBreak" | "shortBreak";

export const backgrounds = [Background1, Background2, Background3, Background4];

const Settings = (): React.ReactNode => {
  const { backgroundHandler } = useStorage();
  const { defaults, setSettings } = useTimes(),
    settingsHandler = (setting: settings, value: number) => {
      if (setting == "focus")
        setSettings({
          ...defaults,
          [setting]: value,
        });
      else if (setting == "longBreak")
        setSettings({
          ...defaults,
          [setting]: value,
        });
      else
        setSettings({
          ...defaults,
          [setting]: value,
        });
    },
    backgroundSetter = (id: number) => {
      switch (id) {
        case 1:
          backgroundHandler(1);
          document.body.style.background = `url("${Background1}")`;
          document.body.style.color = "white";
          break;
        case 2:
          backgroundHandler(2);
          document.body.style.background = `url("${Background2}")`;
          document.body.style.color = "black";
          break;
        case 3:
          backgroundHandler(3);
          document.body.style.background = `url("${Background3}")`;
          document.body.style.color = "white";
          break;
        case 4:
          backgroundHandler(4);
          document.body.style.background = `url("${Background4}")`;
          document.body.style.color = "black";
          break;
        default:
          backgroundHandler(4);
          document.body.style.background = `url("${Background4}")`;
          document.body.style.color = "black";
          break;
      }
      document.body.style.backgroundAttachment = "fixed";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover";
    };

  return (
    <div id="settingsModal">
      <h1>Settings</h1>
      <div id="pomodoro">
        <h2>Pomodoro Settings</h2>
        <div id="form">
          <label>Focus Time</label>
          <br />
          <input
            type="number"
            placeholder={String(defaults.focus)}
            onChange={(event) =>
              settingsHandler("focus", Number(event.target.value))
            }
          />
          <br />
          <label>Short Break</label>
          <br />
          <input
            type="number"
            placeholder={String(defaults.shortBreak)}
            onChange={(event) =>
              settingsHandler("shortBreak", Number(event.target.value))
            }
          />
          <br />
          <label>Long Break</label>
          <br />
          <input
            type="number"
            placeholder={String(defaults.longBreak)}
            onChange={(event) =>
              settingsHandler("longBreak", Number(event.target.value))
            }
          />
        </div>
      </div>
      <hr />
      <div id="background">
        <h2>Background Images</h2>
        <div id="backgroundImages">
          <img onClick={() => backgroundSetter(1)} src={Background1} />
          <img onClick={() => backgroundSetter(2)} src={Background2} />
          <img onClick={() => backgroundSetter(3)} src={Background3} />
          <img onClick={() => backgroundSetter(4)} src={Background4} />
        </div>
      </div>
      <hr />
      <div id="share">
        <p>A work performance trend application, made with love by Lawrence.</p>
        <p>
          If you find the website useful, please be willing to share, otherwise
          do provide feedback if necessary on areas of improvement to your
          liking.
        </p>
        <p>
          <b>
            <u>
              Images and music on this site rightfully belong to their owners. I
              claim no ownership of any of the images or music presented in the
              website
            </u>
          </b>
        </p>
        <div id="socials">
          <a href="https://github.com/Cubedrain" target="_blank">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://x.com/AtMuchiri" target="_blank">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Settings;
