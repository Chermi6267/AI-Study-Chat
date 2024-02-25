import React from 'react'
import Camera from './svg/Camera'
import Micro from './svg/Micro'


export default function Input({ inputRef }) {

  return (
    <div
      className='input-wrapper'
      ref={inputRef}>
      <div className='inputbox'>
        <div className='input-container'>
          <input className='main-input' placeholder='Сообщение' autoComplete='off' />
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
