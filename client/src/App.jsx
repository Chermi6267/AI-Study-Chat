import React, { useEffect, useState } from 'react'
import Main from './components/Main/Main';
import About from './components/About/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Registration from './components/regLog/Registration';
import Login from './components/regLog/Login';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { OrintationProvider } from './components/providers/OrintationProvider';
import { useDispatch } from 'react-redux';
import { setUser } from './store/slices/userSlice';
import axios from 'axios';
import Preloader from './components/preLoader/Preloader';


export default function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!!localStorage.getItem('token')) {
      axios.post(process.env.REACT_APP_API_URL + '/authentication/refreshToken', undefined, { withCredentials: true })
        .then((response) => {
          localStorage.setItem('token', response.data['accessToken'])
          dispatch(setUser({
            id: response.data['id'],
            username: response.data['username'],
            email: response.data['email'],
            token: response.data['accessToken']
          }))
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [dispatch])

  return (
    <ThemeProvider>
      <OrintationProvider>
        {
          <div className='root-bg'>
            <Router>
              <Routes>
                <Route exact path="/" element={loading ? <Preloader /> : <Main />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/reg" element={<Registration />} />
                <Route exact path="/login" element={<Login />} />
              </Routes>
            </Router>
          </div >
        }
      </OrintationProvider >
    </ThemeProvider >
  )
}
