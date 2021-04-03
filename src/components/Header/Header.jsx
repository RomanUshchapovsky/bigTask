import React from 'react';
import style from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={style.header}>
            <div className={style.header_item}>
                <NavLink to={'/MainView'} activeClassName='active'><h2>Main View</h2></NavLink>
            </div>
            <div className={style.header_item}>
    <NavLink to={'/CartView'} activeClassName='active'><h2>Cart View</h2></NavLink>
            </div>
            <div className={style.header_item}>
    <NavLink to={'/RegForm'} activeClassName='active'><h2>Registration</h2></NavLink>
            </div>
        </header>
    );
};

export default Header;