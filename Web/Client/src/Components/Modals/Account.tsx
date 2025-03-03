import { useEffect, useState } from "react";

type option = "Signup" | "Login";

const Account = (): React.ReactNode => {
  const [tab, setTab] = useState<option>("Login"),
    tabHandler = (Tab: option) => {
      setTab(Tab);
    };

  useEffect(() => {
    const loginTab = document.querySelector<HTMLDivElement>("#login"),
      signupTab = document.querySelector<HTMLDivElement>("#signup"),
      underliner = document.querySelector<HTMLDivElement>(
        "#accountModal #switch #underliner"
      );
    if (loginTab && signupTab && underliner) {
      if (tab == "Login") {
        signupTab.style.display = "none";
        loginTab.style.display = "block";
        underliner.style.transform = "translateX(0px)";
      } else {
        signupTab.style.display = "block";
        loginTab.style.display = "none";
        underliner.style.transform = "translateX(149.5px)";
      }
    }
  }, [tab]);

  return (
    <div id="accountModal">
      <div id="switch">
        <button onClick={() => tabHandler("Login")}>Login</button>
        <button onClick={() => tabHandler("Signup")}>Sign Up</button>
        <div id="underliner"></div>
      </div>
      <form id="login">
        <label htmlFor="email">Email</label>
        <br />
        <input type="email" id="email" name="email" required />
        <div id="pass">
          <label htmlFor="password">Password</label>
          <br />
          <input type="password" id="password" name="password" required />
          <i className="fa-solid fa-eye"></i>
        </div>
        <button type="submit">Login</button>
      </form>
      <form id="signup">
        <label htmlFor="name">Name</label>
        <br />
        <input type="text" id="name" name="name" required />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input type="email" id="email" name="email" required />
        <br />
        <div id="pass">
          <label htmlFor="password">Password</label>
          <br />
          <input type="password" id="password" name="password" required />
          <i className="fa-solid fa-eye"></i>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Account;
