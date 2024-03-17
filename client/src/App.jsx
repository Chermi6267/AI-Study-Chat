import React from 'react'
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
import io from 'socket.io-client';

const APIUrl = process.env.REACT_APP_API_URL;

export const socket = io.connect(APIUrl)

export default function App() {

  return (
    <ThemeProvider>
      <OrintationProvider>
        <div className='root-bg'>
          <Router>
            <Routes>
              <Route exact path="/" element={<Main />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/reg" element={<Registration />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </Router>
        </div >
      </OrintationProvider >
    </ThemeProvider >
  )
}
