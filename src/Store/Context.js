import React, { createContext, useState } from 'react'


export const Context = createContext()

const url = "http://localhost:3333/products"
const urlTrash = "http://localhost:3333/cart"
const MainContext = ({ children }) => {


    const [products, setProducts] = useState([]);
    const getDataFromServer = (page=1) => {
        fetch(`${url}?_limit=10&_page=${page}`)
            .then(res => res.json())
            .then((res) => {
                setProducts(res)
            })
    }
// ==================================
    const [cart, setCarts] = useState([]);
    const getDataCartFromServer = () => {
        fetch(`${urlTrash}`)
            .then(res => res.json())
            .then((res) => {
                setCarts(res)
            })
    }
// ======================
    const handleChangeInput = (field, event) => {
        setState({ ...state, [field]: event.target.value })
    }  
// =================================================
    const handleDelete = async (item) => {
        try {
            await fetch(`${url}/${item}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            })
            getDataFromServer()
        } catch (e) {
            console.error(e)
        }
    }
// ===========================================
    const handleDelete2 = async (item) => {
        try {
            await fetch(`${urlTrash}/${item}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            })
            getDataCartFromServer()
        } catch (e) {
            console.error(e)
        }
    }
// ==============================================
    const handleAddToCart = async (item) => {
        const data = {
            title: item.title,
            description: item.description,
            price: item.price,
            quantity: 1
        }
        try {
            const getRequest = await fetch(urlTrash)
            const dataServer = await getRequest.json()
            // console.log('DATA===>>>', data)
            let ifExist = dataServer.find(i => i.title === data.title)
            if (!ifExist) {
                await fetch(urlTrash, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify(data)
                })
            } else {
                ifExist.quantity = ifExist.quantity + 1
                // console.log('EXIST===>>>', ifExist)
                await fetch(`${urlTrash}/${ifExist.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify(ifExist)
                })
            }
        } catch (e) {
            console.error(e)
        }
    };

// ===============================================
    const [state, setState] = useState({})

    return (
        <Context.Provider value={{
            url, state, setState, products, setProducts, getDataFromServer, handleDelete, handleChangeInput,
            handleAddToCart,
            urlTrash, cart, setCarts, useState, getDataCartFromServer, handleDelete2 }}>
            {children}
        </Context.Provider>
    )
}
export default MainContext;