import React from 'react'

export default function UserInfo(profInfo) {
    return (
        <div className='prof-text-container'>
            <h1 className='prof-text'>{profInfo.profInfo.userName}</h1>
            <h2 className='prof-text'>{profInfo.profInfo.userEmail}</h2>
        </div>
    )
}