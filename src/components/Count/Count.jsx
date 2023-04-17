import { useDispatch } from "react-redux";
import style from "./Count.module.css";
import { addProduct, removeProduct } from "../../store/order/orderSlice";

export const Count = ({ count, id }) => {
  const dispatch = useDispatch();

  const increaseCount = () => {
    dispatch(addProduct({ id }));
  };

  const decreaseCount = () => {
    dispatch(removeProduct({ id }));
  };

  return (
    <div className={style.count}>
      <button className={style.minus} onClick={decreaseCount}>
        -
      </button>
      <p className={style.amount}>{count}</p>
      <button className={style.plus} onClick={increaseCount}>
        +
      </button>
    </div>
  );
};
