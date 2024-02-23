import React, { useState, useEffect } from 'react'


export default function Input({ target }) {
    const label = {
        'name': 'Имя пользователя',
        'email': 'Электронная почта',
        'password': 'Пароль',
        'password1': 'Пароль',
        'password2': 'Подтвердите пароль',
    }

    const [isPassword, setIsPassword] = useState(false)
    const showPassword = (target) => {
        if (target === 'password1' || target === 'password') {
            return <label id='passwordLabel' onClick={() => setIsPassword(!isPassword)}>Показать пароль</label>
        }
    }

    const forgetPassword = (target) => {
        if (target === 'password') {
            return true
        }
    }

    useEffect(() => {
        const password = document.querySelector('#password1') || document.querySelector('#password')
        if (password) {
            if (password.type === 'text') {
                password.type = 'password'
                document.querySelector('#passwordLabel').textContent = 'Показать пароль'
            } else {
                password.type = 'text'
                document.querySelector('#passwordLabel').textContent = 'Скрыть пароль'
            }
        }
    }, [isPassword])

    return (
        <div className='reg-log-container'>
            <input autoComplete="on" name={target}
                type={target === 'password' || target === 'password1' || target === 'password2' ? 'password' : 'text'}
                className='reg-log-input' id={target} />
            {forgetPassword(target)
                ?
                <div className='label-forget-password-container'>
                    {showPassword(target)}
                    <label>Забыли пароль?</label>
                </div>
                :
                <div className='label-forget-password-container'>
                    <label htmlFor={target}>{label[target]}</label>
                    {showPassword(target)}
                </div>
            }
        </div>
    )
}
