import { ChartContainer, ChartConfig } from "../ui/chart";
import { Bar, BarChart, XAxis } from "recharts";

const Dashboard = (): React.ReactNode => {
  const chartData = [
    { month: "January", day: "Monday", desktop: 186, mobile: 80 },
    { month: "February", day: "Tuesday", desktop: 305, mobile: 200 },
    { month: "March", day: "Wednesday", desktop: 237, mobile: 120 },
    { month: "April", day: "Thursday", desktop: 73, mobile: 190 },
    { month: "May", day: "Friday", desktop: 209, mobile: 130 },
    { month: "June", day: "Saturday", desktop: 214, mobile: 140 },
    { day: "Sunday", desktop: 150, mobile: 70 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "white",
    },
    mobile: {
      label: "Mobile",
      color: "black",
    },
  } satisfies ChartConfig;

  return (
    <div id="dashboard">
      <div id="summary" className="shadow-2xl p-5">
        <h1>Summary</h1>
        <div id="summarydetails">
          <div id="tasksdone">
            <i className="fa-solid fa-list-check"></i>
            <p>Tasks so far</p>
            <p>3 tasks done</p>
          </div>
          <div id="timetaken">
            <i className="fa-solid fa-clock-rotate-left"></i>
            <p>Time taken</p>
            <p>5Hrs so far</p>
          </div>
        </div>
      </div>
      <div id="graph">
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] w-full border-none shadow-2xl"
          title="Performance"
        >
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
      <div id="recordings" className="shadow-2xl p-5">
        <h1>Audio Recordings</h1>
        <audio src="#"></audio>
        <div id="records">
          <p>Provide notes in form of audio recordings</p>
          <div id="clips">
            <div>
              <audio src="#"></audio>
              <p>Clip 1</p>
              <div id="audio">
                <button>
                  <i className="fa-solid fa-backward-step"></i>
                </button>
                <button>
                  <i className="fa-solid fa-play"></i>
                </button>
                <button>
                  <i className="fa-solid fa-forward-step"></i>
                </button>
              </div>
            </div>
            <div>
              <audio src="#"></audio>
              <p>Clip 2</p>
              <div id="audio">
                <button>
                  <i className="fa-solid fa-backward-step"></i>
                </button>
                <button>
                  <i className="fa-solid fa-play"></i>
                </button>
                <button>
                  <i className="fa-solid fa-forward-step"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="music" className="shadow-2xl p-5">
        <h1>Music</h1>
        <audio id="audioelement" src="#"></audio>
        <div id="musicdesc">
          <img
            src="https://media.istockphoto.com/id/1464130407/vector/lofi-illustration-room-line-grain-purple-colors-lo-fi-work-place-bedroom-window-guitar.jpg?s=612x612&w=0&k=20&c=X8qo3ykb-CZOIxx2XFuoMJcEQqTfxicuLyZrHF3haps="
            alt="music banner"
          />
          <p>Lofi beats by Lorenzo</p>
        </div>
        <div id="audio">
          <button>
            <i className="fa-solid fa-backward-step"></i>
          </button>
          <button>
            <i className="fa-solid fa-play"></i>
          </button>
          <button>
            <i className="fa-solid fa-forward-step"></i>
          </button>
        </div>
        <div id="options">
          <i className="fa-solid fa-plus"></i>
          <i className="fa-solid fa-shuffle"></i>
          <i className="fa-solid fa-dice"></i>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
