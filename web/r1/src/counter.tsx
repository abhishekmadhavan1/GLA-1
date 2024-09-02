import { useContext, useEffect, useMemo, useState } from "react";

const Counter = (props) => {
  const { buttonLabel = "Test Button" } = props;

  const [count, setCount] = useState(0);

  const updateCount = () => {
    setCount(count + 1);
  };

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
