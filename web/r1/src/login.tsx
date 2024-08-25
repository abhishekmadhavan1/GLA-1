import { useContext, useEffect, useState } from "react";
import "./App.css";
import { TitleContext } from "./home";

const LoginForm = (props) => {
  const title = useContext(TitleContext);

  const [data, setData] = useState({ email: "Initial", password: "initial" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const updateData = (type, event) => {
    setData({ ...data, [type]: event.target.value });
  };

  const correctValue = {
    email: "test@gmail.com",
    password: "123456",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.email === correctValue.email &&
      data.password === correctValue.password
    ) {
      setIsLoggedIn(true);
      setError(null);
    } else setError("Invalid Credentials");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          border: "2px solid red",
        }}
      >
        {title}
      </div>
      {isLoggedIn && <h1>Welcome Home</h1>}
      {!isLoggedIn && (
        <>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            onSubmit={handleSubmit}
          >
            <form>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  required
                  onChange={(event) => updateData("email", event)}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  required
                  onChange={(event) => updateData("password", event)}
                />
              </div>
              <button type="submit">Login</button>
              {error && <h3 style={{ color: "red" }}>{error}</h3>}
            </form>
          </div>
          <h2>
            The entered email is <h1>{data.email}</h1> and the password is{" "}
            <h1>{data.password}</h1>
          </h2>
        </>
      )}
    </>
  );
};

export default LoginForm;
