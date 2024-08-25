import { useContext, useEffect, useMemo, useState } from "react";
import { TitleContext } from "./home";

const Counter = (props) => {
  const { buttonLabel = "Test Button" } = props;

  const [count, setCount] = useState(0);

  const updateCount = () => {
    setCount(count + 1);
    console.log("🚀 ~ updateCount ~ count inside:", count);
  };
  console.log("🚀 ~ updateCount ~ count outside:", count);

  return (
    <>
      <h1>Total Clicks: {count}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={() => updateCount()}>{buttonLabel}</button>
      </div>
    </>
  );
};

export default Counter;
