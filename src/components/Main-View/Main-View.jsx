import React, { useState, useEffect, useContext, useRef } from 'react';
import style from './MainView.module.css';
import { NavLink } from 'react-router-dom';
import { Context } from "../../Store/Context";
import RenderCart from './RenderCart';


const MainView = (props) => {
    const { products, getDataFromServer } = useContext(Context)
    const [productSearch, setProductSearch] = useState([])
    useEffect(() => {
        getDataFromServer()
    }, [])
    // input=====
    const [prodTitle, setProdTitle] = useState('');
    const handleSearch = (event) => {
        setProdTitle(event.target.value)
        const value = event.target.value
        const prod = products.filter(i => i.title.toLowerCase().includes(value.toLowerCase()))
        setProductSearch(prod)
    }
    // ===================Paginator=========
const page = useRef(1)
    const next =()=>{
       if(products.length===10) {
           page.current=page.current+1
           getDataFromServer(page.current)
       }
    }
    const prev =()=>{
        if(page.current!==1){
            page.current=page.current-1
            getDataFromServer(page.current)
        }
    }

    return (
        <div className={style.MainView}>

            <button><NavLink to={'/CreateView'} >Create</NavLink></button>
            <input
                type="text"
                placeholder='title search'
                value={prodTitle}
                onChange={handleSearch} />
            <button onClick={()=>prev()} >prev</button>
            <button onClick={()=>next()} >next</button>
            <div className={style.CartBlock}>
                <RenderCart cart={!!productSearch.length ? productSearch : products} />
            </div>
        </div>
    );
};
// 

export default MainView;
