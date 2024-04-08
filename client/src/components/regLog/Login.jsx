import React, { useState, useEffect } from 'react'
import Header from './Header'
import './regLog.css'
import AuthServices from '../../services/authServices'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/slices/userSlice'


export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
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

    const handleLogin = (username, password) => {
        setLoading(true)
        AuthServices.login(username, password)
            .then((response) => {
                setUsername('')
                setPassword('')
                setLoading(false)
                dispatch(setUser({
                    id: response.data.data['id'],
                    username: response.data.data['username'],
                    email: response.data.data['email'],
                    token: response.data.data['access_token']
                }))
                console.log(`${response.data.data['username']} signed in`)
                localStorage.setItem('token', response.data.data['access_token'])
                window.location.href = '/'
            })
            .catch(error => {
                setLoading(false)
                console.log(error.response.data['message'])
            })
    }

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
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className='header-container'>
                <Header isActive={true} target={'for-reg-log'} />
            </div>

            <form className='form-container'>
                <h1 className='log-reg-h1'>Войти</h1>

                <div className='reg-log-container'>
                    <input autoComplete="off" name='name'
                        onChange={(e) => { setUsername(e.target.value) }}
                        type='text'
                        className='reg-log-input' id='name' />
                    <div className='label-forget-password-container'>
                        <label htmlFor='name'>Имя пользователя</label>
                    </div>
                </div>

                <div className='reg-log-container'>
                    <input autoComplete="off" name='password'
                        onChange={(e) => { setPassword(e.target.value) }}
                        type='password'
                        className='reg-log-input' id='password' />

                    <div className='label-forget-password-container'>
                        <label id='passwordLabel' onClick={() => setIsPassword(!isPassword)}>Показать пароль</label>
                        <label>Забыли пароль?</label>
                    </div>
                </div>

                <h2 className='log-reg-h2'>
                    Если у вас нет аккаунта AI Study Chat, <a href='/reg'>то зарегистрируйтесь</a>
                </h2>

                <button type='button' onClick={(e) => {
                    e.preventDefault()
                    handleLogin(username, password)
                }} className='submit-btn'>{loading ? <p className='dots'>{dots}</p> : 'Войти'}</button>
            </form>
        </div>
    )
}
