import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import style from './EditView.module.css';
import { Context } from "../../Store/Context";

const EditView = (props) => {
    const { url, state, handleChangeInput } = useContext(Context)
    const { title, description, price } = state

    const history = useHistory()
    const handleSave = async () => {
        try {
            fetch(`${url}/${state.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(state)
            })
                .then(res => res.json())
            history.push("/MainView")
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={style.CreateEditView}>
            <div className={style.Cart}>Edit View

                <input className={style.CartInput} placeholder="title" value={title}
                    onChange={(e) => handleChangeInput("title", e)} />
                <textarea className={style.CartTextarea} placeholder="description" value={description}
                    onChange={(e) => handleChangeInput("description", e)} />
                <input className={style.CartInput} placeholder="Price" value={price}
                    onChange={(e) => handleChangeInput("price", e)} />
                <div>
                    <div>
                        <button className={style.SaveCart} onClick={handleSave}>Save</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EditView;