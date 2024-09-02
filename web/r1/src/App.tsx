import React, { createContext, useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./login";
import Counter from "./counter";
import Table from "./table";
import UseRefCounter from "./useRef";
import { Home } from "./home";
import RegisterForm from "./register";
import api from "./axios";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  const getData = async () => {
    const response = await api("/current/user");
    const responseValue = await response.data;

    setCurrentUser(responseValue);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/table" element={<Table />} />
          <Route path="/useRef" element={<UseRefCounter />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
