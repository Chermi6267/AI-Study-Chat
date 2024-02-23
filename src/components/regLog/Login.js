import React from 'react'
import Header from '../Header'
import Input from './Input'
import Button from './Button'

export default function Login() {
    return (
        <div>
            <div className='header-container'>
                <Header isActive={true} target={'for-reg-log'} />
            </div>
            <form className='form-container'>
                <h1 className='log-reg-h1'>Войти</h1>
                <Input target='name' />
                <Input target='password' />
                <h2 className='log-reg-h2'>
                    Если у вас нет аккаунта AI Study Chat, <a href='/reg'>то зарегистрируйтесь</a>
                </h2>
                <Button target={"Войти"} />
            </form>
        </div>
    )
}
