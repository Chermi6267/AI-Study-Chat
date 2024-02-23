import React from 'react'

export default function Button({ target }) {
    return (
        <button type='button' onClick={() => { window.location.href = "/"; }} className='submit-btn'>{target}</button>
    )
}
