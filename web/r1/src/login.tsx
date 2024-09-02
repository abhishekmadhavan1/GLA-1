import { useState } from "react";
import "./App.css";
import api from "./axios";
import { useUser } from "./App";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const [data, setData] = useState({ email: "Initial", password: "initial" });
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(null);
  const { setCurrentUser } = useUser();

  const updateData = (type, event) => {
    setData({ ...data, [type]: event.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await api.post("/login", data);
    const result = await response.data;

    if (result?.payload?.token) {
      localStorage.setItem("token", result?.payload?.token);
      setCurrentUser(result?.payload?.user);
      navigate("/table");
    }

    setMessage(result?.msg);
    // window.location.href = "/table";
    console.log(result);
  };

  return (
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
      {message && <h2>{message}</h2>}
    </>
  );
};

export default LoginForm;
