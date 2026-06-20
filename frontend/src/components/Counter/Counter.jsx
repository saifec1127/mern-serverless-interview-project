import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [isInterval, setIsInterval] = useState(null);

  const HandlerDecrement = () => {
    if (isInterval) {
      clearInterval(isInterval);
    }

    const id = setInterval(() => {
      return setCount((prevValue) => prevValue - 1);
    }, 800);

    setIsInterval(id);
  };

  const HandlerIncrement = () => {
    if (isInterval) {
      clearInterval(isInterval);
    }

    const id = setInterval(() => {
      return setCount((prevValue) => prevValue + 1);
    }, 800);

    setIsInterval(id);
  };

  const HandlerReset = () => {
    if (isInterval) {
      clearInterval(isInterval);
      setIsInterval(null);
    }
    setCount(0);
  };

  const HandlerStop = () => {
        if (isInterval) {
      setIsInterval(null);
      clearInterval(isInterval);
    }
  };

  return (
    <div>
      <h3>Counter</h3>
      <button onClick={HandlerDecrement}>Decrement</button>
      {count}
      <button onClick={HandlerIncrement}>Increment</button>
      <br />
      <button onClick={HandlerReset}>Reset</button>
      <span>
        <button onClick={HandlerStop}>Stop</button>
      </span>
    </div>
  );
};

export default Counter;
