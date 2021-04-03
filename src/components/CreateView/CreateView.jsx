import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import style from './CreateView.module.css';
import { Context } from "../../Store/Context";

const CreateView = (props) => {
    const { url, state, handleChangeInput } = useContext(Context)
    const { title, description, price } = state

    const history = useHistory()
    const handleSave = async () => {
        const data = {
            title: title,
            description: description,
            price: price,
            inCart: false
        }
        try {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            history.push("/MainView")
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={style.CreateEditView}>
            <div className={style.Cart}>Create View
            <div>
                <input className={style.CartInput}
                    type="text"
                    required
                    minLength="5" maxLength="40"
                    placeholder="title" value={title}
                    onChange={(e) => handleChangeInput("title", e)} />
                <span className={style.form__error}>Это поле должо иметь меньше 40 символов</span>
            </div>
            <div>
                <textarea className={style.CartTextarea}
                    type="text"
                    minLength="100" maxLength="200" 
                    required
                    placeholder="description"
                    value={description}
                    onChange={(e) => handleChangeInput("description", e)} />
                <span className={style.form__error}>Это поле должо иметь больше 20 симв</span>
            </div>

            <div>
                <input className={style.CartInput}
                    type="number"
                    required
                    min="100" max="950"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => handleChangeInput("price", e)} />
                <span className={style.form__error}>Цена больше100</span>
            </div>
            <div>
                <button className={style.SaveCart} onClick={handleSave}>Save</button>
            </div>
        </div>
        </div >
    );
};

export default CreateView;