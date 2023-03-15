import { useState } from "react";
import style from "./Count.module.css";

export const Count = (props) => {
  const [count, setCount] = useState(props.count);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className={style.count}>
      <button
        className={style.minus}
        onClick={decreaseCount}
        disabled={count === 1}
      >
        -
      </button>
      <p className={style.amount}>{count}</p>
      <button className={style.plus} onClick={increaseCount}>
        +
      </button>
    </div>
  );
};
