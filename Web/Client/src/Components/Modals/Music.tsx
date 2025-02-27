const Music = (): React.ReactNode => {
  return (
    <div id="musicModal">
      <div id="switch">
        <button>Custom List</button>
        <button>Current Playlist</button>
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
        <div id="audio1">
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
  );
};

export default Music;
