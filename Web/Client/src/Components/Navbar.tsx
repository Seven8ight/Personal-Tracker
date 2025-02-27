const Navbar = (): React.ReactNode => {
  const currentTime = new Date();

  return (
    <div id="navbar">
      <div id="time">
        <p>{`${currentTime.getHours()}:${
          currentTime.getMinutes() < 10
            ? currentTime.getMinutes().toString().padStart(2, "0")
            : currentTime.getMinutes()
        } ${currentTime.getHours() < 12 ? "am" : "pm"}`}</p>
      </div>
      <div id="changeTabs">
        <button id="dashboardtab">
          <i className="fa-solid fa-table"></i>
        </button>
        <button id="timertab">
          <i className="fa-solid fa-clock"></i>
        </button>
      </div>
      <div id="account">
        <button>
          <i className="fa-solid fa-user-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
