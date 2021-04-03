import React, { useContext, useEffect, useState } from 'react';
import style from './RegForm.module.css';

const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(false)
    const [maxLengthError, setMaxLengthError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [inputValid, setInputValid] = useState(false)

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break;
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break;
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
                    break;
                case 'isEmail':
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break;
            }

        }
    }, [value])

    useEffect(() => {
        if (isEmpty || minLengthError || maxLengthError || emailError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, minLengthError, maxLengthError, emailError])

    return {
        isEmpty,
        minLengthError,
        maxLengthError,
        emailError,
        inputValid,
    }
}
const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)
    const onChange = (e) => {
        setValue(e.target.value)
    }
    const onBlur = (e) => {
        setDirty(true)
    }
    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}


const RegForm = (props) => {
    const email = useInput('', { isEmpty: true, minLength: 5, isEmail: true })
    const password = useInput('', { isEmpty: true, minLength: 4, maxLength: 9 })

    return (
        <div className={style.formBlock}>
            <form>
                <h1>Registration</h1>
                <div>
                    {(email.isDirty && email.isEmpty) && <div style={{ color: 'red' }}>  the field cannot be empty</div>}
                    {(email.isDirty && email.minLengthError) && <div style={{ color: 'red' }}>  longer than 5 characters</div>}
                    {(email.isDirty && email.emailError) && <div style={{ color: 'red' }}>  incorrect email</div>}

                    <input onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} value={email.value}
                        type="text" name="email" id="" placeholder="Enter your email...." />
                </div>
                <div>
                    {(password.isDirty && password.isEmpty) && <div style={{ color: 'red' }}>  the field cannot be empty</div>}
                    {(password.isDirty && password.minLengthError) && <div style={{ color: 'red' }}>  longer than 4 characters</div>}
                    {(password.isDirty && password.maxLengthError) && <div style={{ color: 'red' }}>  very long password</div>}

                    <input onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} value={password.value}
                        type="password" name="password" id="" placeholder="Enter your password...." />
                </div>
                <div>
                    <button disabled={!email.inputValid || !password.inputValid} type="submit">register</button>
                </div>
            </form>

        </div>
    );
};

export default RegForm;