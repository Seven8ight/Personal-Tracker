import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./index2.css";
import App from "./App.tsx";
import Switcher from "./Components/Contexts/TabSwitcher.tsx";
import ModalHandler from "./Components/Contexts/ModalHandler.tsx";
import PomoProvider from "./Components/Contexts/PomodoroSettings.tsx";
import MusicHandler from "./Components/Contexts/MusicHandler.tsx";
import PicturesHandler from "./Components/Contexts/PicturesHandler.tsx";
import StorageHandler from "./Components/Contexts/StorageHandler.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Switcher>
      <ModalHandler>
        <PomoProvider>
          <MusicHandler>
            <PicturesHandler>
              <StorageHandler>
                <App />
              </StorageHandler>
            </PicturesHandler>
          </MusicHandler>
        </PomoProvider>
      </ModalHandler>
    </Switcher>
  </StrictMode>
);
