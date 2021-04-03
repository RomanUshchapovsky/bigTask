import React, { useEffect, useContext } from 'react';
import style from './CartView.module.css';
import { Context } from '../../Store/Context';
import CartView from './CartView';

const CartViewContainer = (props) => {
  const { cart, getDataCartFromServer } = useContext(Context)
  useEffect(() => {
    getDataCartFromServer()
  }, [])

  return (
    <div className={style.BasketBlock}>
      <div className={style.CartView}>        
      <div>oбщая стоимость = {cart.price} </div>
        <CartView carts={cart} />

      </div>
    </div>
  );
}
export default CartViewContainer;