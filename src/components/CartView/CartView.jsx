import React, { useContext, useRef } from 'react';
import style from './CartView.module.css';
import { Context } from "../../Store/Context";



const CartView = ({ carts }) => {
  const { getDataCartFromServer, handleDelete2 } = useContext(Context)

  const quantity = useRef(1)
  const handleIncr = () => {
    if (quantity.length === 10) {
      quantity.current = quantity.current + 1
      getDataCartFromServer(quantity.current)
    }
  }
  const handleDecr = () => {
    if (quantity.current !== 1) {
      quantity.current = quantity.current - 1
      getDataCartFromServer(quantity.current)
    }
  }
  if (carts) {
    return carts.map((item, id) => {
      return (
        <div className={style.Cart} key={id} >
          <div><h3>{item.title}</h3></div>
          <div><p>{item.description}</p></div>
          <div className={style.PriseColor}>Prise: {item.price}$</div>
          <div className={style.CartBtn}>
            <div>
              <button onClick={() => handleDelete2(item.id)}>Delete</button>
            </div>
            <div className={style.Calculate}>
              <button onClick={() => handleDecr()}> -1 </button>
              <button onClick={() => handleIncr()}> +1 </button>
              <span> Total = {item.quantity} </span>
            </div>
          </div>
        </div>
      );
    })
  }
}
export default CartView;