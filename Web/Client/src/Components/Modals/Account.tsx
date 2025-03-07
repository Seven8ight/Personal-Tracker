import { useEffect, useRef, useState } from "react";

type option = "Signup" | "Login";
type data = {
  type: "login" | "signup";
  name?: string;
  email?: string;
  password?: string;
};

const Account = (): React.ReactNode => {
  const [tab, setTab] = useState<option>("Login"),
    passwordLoginRef = useRef<HTMLInputElement | null>(null),
    passwordSignupRef = useRef<HTMLInputElement | null>(null),
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

  const submitHandler = async (type: "login" | "signup") => {
      try {
        const form = document.querySelector<HTMLFormElement>(
            type == "login" ? "#login" : "#signup"
          ),
          data: Partial<data> = {};

        if (form)
          form.onsubmit = (event: SubmitEvent) => {
            event.preventDefault();
            data.type = type;

            const formData = new FormData(form);
            let propertyKey: keyof data;

            formData.forEach((value, key) => {
              if (key == "email") propertyKey = "email";
              else if (key == "name") propertyKey = "name";
              else if (key == "password") propertyKey = "password";
              else return;

              if (typeof value == "string") data[propertyKey] = value;
            });
            console.log(data);
          };
      } catch (error) {
        console.error(error);
      }
    },
    showPassword = (type: "login" | "signup") => {
      if (passwordLoginRef.current && passwordSignupRef.current)
        if (type == "login") {
          if (passwordLoginRef.current.type == "password")
            passwordLoginRef.current.type = "text";
          else passwordLoginRef.current.type = "password";
        } else {
          if (passwordSignupRef.current.type == "password")
            passwordSignupRef.current.type = "text";
          else passwordSignupRef.current.type = "password";
        }
    };

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
          <input
            ref={passwordLoginRef}
            type="password"
            id="password"
            name="password"
            required
          />
          <i
            onClick={() => showPassword("login")}
            className="fa-solid fa-eye"
          ></i>
        </div>
        <button type="submit" onClick={() => submitHandler("login")}>
          Login
        </button>
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
          <input
            ref={passwordSignupRef}
            type="password"
            id="password"
            name="password"
            required
          />
          <i
            onClick={() => showPassword("signup")}
            className="fa-solid fa-eye"
          ></i>
        </div>
        <button type="submit" onClick={() => submitHandler("signup")}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Account;
