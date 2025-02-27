const Sidebar = (): React.ReactNode => {
  return (
    <div id="sidebar">
      <div id="navigation">
        <button>
          <i className="fa-solid fa-house"></i>
        </button>
        <button>
          <i className="fa-solid fa-hourglass"></i>
        </button>
        <button>
          <i className="fa-solid fa-record-vinyl"></i>
        </button>
      </div>
      <div id="settings">
        <button>
          <i className="fa-solid fa-gear"></i>
        </button>
        <button>
          <i className="fa-solid fa-volume-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
