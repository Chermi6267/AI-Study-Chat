import React, { useState, useEffect } from 'react'
import Header from './Header'
import './regLog.css'
import AuthServices from '../../services/authServices'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/slices/userSlice'


export default function Registration() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const dispatch = useDispatch()

    const [isPassword, setIsPassword] = useState(false)


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

    const handleRegister = (username, email, password1, password2) => {
        setLoading(true)
        if (password1 !== password2) {
            console.log('ПРОВЕРЬ ПАРОЛИ, ДЕБИЛ')
            setLoading(false)
            return
        }
        AuthServices.registration(username, email, password1)
            .then((response) => {
                setUsername('')
                setEmail('')
                setPassword1('')
                setPassword2('')
                setLoading(false)
                dispatch(setUser({
                    id: response.data.data['id'],
                    username: response.data.data['username'],
                    email: response.data.data['email'],
                    token: response.data.data['access_token']
                }))
                console.log(`${response.data.data['username']} signed up`)
                localStorage.setItem('token', response.data.data['access_token'])
                window.location.href = '/'
            })
    }

    const [loading, setLoading] = useState(false)

    const [dots, setDots] = useState('.');
    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prevDots => {
                switch (prevDots) {
                    case '.':
                        return '..';
                    case '..':
                        return '...';
                    case '...':
                        return '....';
                    case '....':
                        return '.';
                    default:
                        return '.';
                }
            });
        }, 300); // Задержка между изменениями точек в миллисекундах (300ms в данном случае)

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className='header-container'>
                <Header isActive={true} target={'for-reg-log'} />
            </div>
            <form className='form-container'>
                <h1 className='log-reg-h1'>Регистрация</h1>

                <div className='reg-log-container'>
                    <input autoComplete="off" name='name'
                        value={username} onChange={(e) => { setUsername(e.target.value) }}
                        type='text'
                        className='reg-log-input' id='name' />
                    <div className='label-forget-password-container'>
                        <label htmlFor='name'>Имя пользователя</label>
                    </div>
                </div>

                <div className='reg-log-container'>
                    <input autoComplete="off" name='email'
                        value={email} onChange={(e) => { setEmail(e.target.value) }}
                        type='text'
                        className='reg-log-input' id='email' />
                    <div className='label-forget-password-container'>
                        <label htmlFor='email'>Электронная почта</label>
                    </div>
                </div>

                <div className='reg-log-container'>
                    <input autoComplete="off" name='password1'
                        value={password1} onChange={(e) => { setPassword1(e.target.value) }}
                        type='password'
                        className='reg-log-input' id='password1' />

                    <div className='label-forget-password-container'>
                        <label id='passwordLabel' onClick={() => setIsPassword(!isPassword)}>Показать пароль</label>
                        <label onClick={() => { console.log('ЛОХ') }}>Забыли пароль?</label>
                    </div>
                </div>

                <div className='reg-log-container'>
                    <input autoComplete="off" name='password2'
                        value={password2} onChange={(e) => { setPassword2(e.target.value) }}
                        type='password'
                        className='reg-log-input' id='password2' />
                    <div className='label-forget-password-container'>
                        <label htmlFor='password2'>Повторите пароль</label>
                    </div>
                </div>

                <h2 className='log-reg-h2'>
                    Если у вас есть аккаунт AI Study Chat, <a href='/login'> то войдите в него</a>
                </h2>

                <button type='button' onClick={(e) => {
                    e.preventDefault()
                    handleRegister(username, email, password1, password2)
                }} className='submit-btn'>{loading ? <p className='dots'>{dots}</p> : 'Зарегистрироваться'}</button>
            </form>
        </div>
    )
}
