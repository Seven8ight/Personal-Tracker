import Sidebar from "./Components/SideBar";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Tabs/Dashboard";
import Timer from "./Components/Tabs/Timer";
// import Music from "./Components/Modals/Music";
// import Account from "./Components/Modals/Account";

const App = (): React.ReactNode => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Dashboard />
      <Timer />
    </>
  );
};

export default App;
