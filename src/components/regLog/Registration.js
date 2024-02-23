import React from 'react'
import Header from '../Header'
import Input from './Input'
import Button from './Button'

export default function Registration() {
    return (
        <div>
            <div className='header-container'>
                <Header isActive={true} target={'for-reg-log'} />
            </div>
            <form className='form-container'>
                <h1 className='log-reg-h1'>Регистрация</h1>
                <Input target='name' />
                <Input target='email' />
                <Input target='password1' />
                <Input target='password2' />
                <h2 className='log-reg-h2'>
                    Если у вас есть аккаунт AI Study Chat, <a href='/login'> то войдите в него</a>
                </h2>
                <Button target={"Зарегистрироваться"} />
            </form>
        </div>
    )
}
