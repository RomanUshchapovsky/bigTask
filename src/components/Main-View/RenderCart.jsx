import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import style from './MainView.module.css';
import { Context } from "../../Store/Context";

const RenderCart = ({ cart }) => {
    const { setState, handleDelete, handleAddToCart } = useContext(Context)
    const handleRedirectToEdit = (item) => {
        setState(item)
    }

    if (cart) {
        return cart.map((item, id) => {
            return (
                <div className={style.Cart} key={id}>
                    <div><h3 >{item.title}</h3>
                    </div>
                    <div><p>{item.description}</p>
                    </div>
                    <div className={style.PriseColor}>Prise: {item.price} $
                    </div>
                    <div className={style.CartBtn}>
                        <div>
                            <button onClick={() => handleRedirectToEdit(item)}>
                                <NavLink to={'/EditView'}>Edit</NavLink></button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                        <div>
                            <button onClick={() => handleAddToCart(item)}>Add to cart</button>
                        </div>
                    </div>
                </div>
            );
        }).reverse()
    }
};
export default RenderCart;