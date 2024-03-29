import React, { useState, useEffect } from 'react'
import Camera from '../svg/Camera'
import Micro from '../svg/Micro'
import './input.css'
import { socket } from '../../App'


export default function Input({ inputRef }) {

  const [inputValue, setInputValue] = useState('')
  // const handleEnterPress = (ev) => {
  //   if (ev.key === 'Enter' && !ev.shiftKey) {
  //     if (!!ev.target.value) {
  //       ev.target.value = ''
  //       socket.send(inputValue)
  //     }
  //   }
  // };

  // useEffect(() => {
  //   socket.on('message', (data) => {
  //     console.log('Получено сообщение:', JSON.parse(data)['data']['content']);
  //   });
  // }, []);


  return (
    <div
      className='input-wrapper'
      ref={inputRef}>
      <div className='inputbox'>
        <div className='input-container'>
          <input
            value={inputValue}
            onChange={(ev) => setInputValue(ev.target.value)}
            // onKeyDown={handleEnterPress}
            className='main-input'
            placeholder='Сообщение'
            autoComplete='off'
          />
        </div>
        <div className='tools-container'>
          <button className='input-tool-btn' onClick={() => console.log('camera')}>
            <Camera />
          </button>
          <button className='input-tool-btn' onClick={() => console.log('micro')}>
            <Micro />
          </button>
        </div>
      </div>
    </div>
  )
}
