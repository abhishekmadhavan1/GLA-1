import { useState } from "react";
import "./App.css";
import api from "./axios";

import Country from "./counter";

const RegisterForm = (props) => {
  const { defaultValue = {}, buttonLabel = "Register" } = props;
  const [data, setData] = useState(
    defaultValue ? defaultValue : { email: "Initial", password: "initial" }
  );
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(null);

  const updateData = (type, event) => {
    setData({ ...data, [type]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await api.post("/updateUser", data);
    const result = await response.data;
    setMessage(result?.msg);
    props?.closeDrawer && props?.closeDrawer();
    props?.setData &&
      props?.setData((prev) => {
        const newUser = result?.payload?.user;
        const existingUserIndex = prev.findIndex(
          (user) => user.id === newUser.id
        );

        if (existingUserIndex !== -1) {
          // Update the existing user
          const updatedUsers = [...prev];
          updatedUsers[existingUserIndex] = newUser;
          return updatedUsers;
        } else {
          // Add the new user
          return [...prev, newUser];
        }
      });
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
            <label>Full Name:</label>
            <input
              required
              value={data?.fullName}
              onChange={(event) => updateData("fullName", event)}
            />
          </div>
          <div>
            <label>Mobile:</label>
            <input
              required
              value={data?.mobile}
              onChange={(event) => updateData("mobile", event)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              required
              value={data?.email}
              onChange={(event) => updateData("email", event)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={data?.password}
              required
              onChange={(event) => updateData("password", event)}
            />
          </div>
          <button type="submit">{buttonLabel}</button>
          {error && <h3 style={{ color: "red" }}>{error}</h3>}
        </form>
      </div>
      {message && <h2>{message}</h2>}
      <Country />
    </>
  );
};

export default RegisterForm;
