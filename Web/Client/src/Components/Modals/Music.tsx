import { useState, useEffect } from "react";
import { useMusicPlayer } from "../Contexts/MusicHandler";

type option = "Currentplaylist" | "CustomList";

const Music = (): React.ReactNode => {
  const [tab, setTab] = useState<option>("CustomList"),
    tabHandler = (Tab: option) => {
      setTab(Tab);
    },
    { musicContainer } = useMusicPlayer();

  useEffect(() => {
    const customTab = document.querySelector<HTMLDivElement>(
        "#musicModal #custom"
      ),
      currentPlaylistTab = document.querySelector<HTMLDivElement>(
        "#musicModal #current"
      ),
      underliner = document.querySelector<HTMLDivElement>(
        "#musicModal #switch #underliner"
      );

    if (customTab && currentPlaylistTab && underliner) {
      if (tab == "Currentplaylist") {
        currentPlaylistTab.style.display = "block";
        customTab.style.display = "none";
        underliner.style.transform = "translateX(212.5px)";
      } else {
        customTab.style.display = "block";
        currentPlaylistTab.style.display = "none";
        underliner.style.transform = "translateX(00px)";
      }
    }
  }, [tab]);

  return (
    <div id="musicModal">
      <div id="switch">
        <button onClick={() => tabHandler("CustomList")}>Custom List</button>
        <button onClick={() => tabHandler("Currentplaylist")}>
          Current Playlist
        </button>
        <div id="underliner"></div>
      </div>
      <div id="custom">
        <div id="addition">
          <label>Add</label>
          <div>
            <input type="file" placeholder="Add a file" accept=".mp3,.mp4" />
          </div>
        </div>
        <div id="customlist">
          <div id="music1">
            <p>Name</p>
            <div id="commands">
              <button>
                <i className="fa-solid fa-play"></i>
              </button>
              <button>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="current">
        {musicContainer.map((music, index) => (
          <div id={`music-${index}`} key={index}>
            <p>{music.split("/")[4].replace("_", " ")}</p>
            <div id="commands">
              <button>
                <i className="fa-solid fa-play"></i>
              </button>
              <button>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Music;
