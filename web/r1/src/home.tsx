import { createContext, useState } from "react";
import Counter from "./counter";
import LoginForm from "./login";
import Table from "./table";

export const TitleContext = createContext('');

export const Home = () => {
  const [title, setTitle] = useState("GLA University");
  return (
    <>
      <TitleContext.Provider value={title}>
        <h1>Home Page</h1>
        <nav
          style={{
            display: "flex",
            padding: "10px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <a href="/home" style={{ marginRight: "10px" }}>
            <button>Home</button>
          </a>
          <a href="/table" style={{ marginRight: "10px" }}>
            <button>Table</button>
          </a>
          <a href="/login" style={{ marginRight: "10px" }}>
            <button>Login Form</button>
          </a>
          <a href="/counter" style={{ marginRight: "10px" }}>
            <button>Counter</button>
          </a>
        </nav>
        <h1>Counter</h1>
        <Counter />
        <h1>Table</h1>
        <Table title="Title from Home Page"/>
        <h1>Login Form</h1>
        <LoginForm />
      </TitleContext.Provider>
    </>
  );
};
