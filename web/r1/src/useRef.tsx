import { useRef } from "react";

const Counter = () => {
  const counterRef = useRef(0);

  const handleChange = () => {
    counterRef.current++;
    console.log("🚀 ~ handleChange ~ counterRef.current:", counterRef.current);
  };
  
  return (
    <>
      <h1>useRef</h1>
      <button onClick={handleChange}>Counter Button</button>
    </>
  );
};

export default Counter;
