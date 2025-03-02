import { useTimes } from "../Contexts/PomodoroSettings";

type settings = "focus" | "longBreak" | "shortBreak";

const Settings = (): React.ReactNode => {
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
          <img src="https://img.freepik.com/premium-photo/layered-waves-background-abstract_701806-1002.jpg" />
          <img src="https://png.pngtree.com/thumb_back/fw800/background/20240704/pngtree-modern-blue-and-orange-layered-wave-background-design-image_15922110.jpg" />
          <img src="https://img.freepik.com/premium-photo/elegant-abstract-design-featuring-layered-waves-warm-cool-tones-perfect-backgrounds-modern-aesthetics_985997-17184.jpg" />
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
              Images rightfully belong to their owners. I claim no ownership of
              any of the images presented in this website
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
