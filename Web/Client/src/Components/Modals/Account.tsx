const Account = (): React.ReactNode => {
  return (
    <div id="accountModal">
      <div id="switch">
        <button>Login</button>
        <button>Sign Up</button>
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
