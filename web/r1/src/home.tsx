import { useEffect, useState } from "react";

export const Home = () => {
  const [title, setTitle] = useState('');

  const getData = async () => {
    const response = await fetch("http://127.0.0.1:5000/home");
    const data = await response.json();
    setTitle(data?.payload?.title)
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>{title}</h1>
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
    </>
  );
};
