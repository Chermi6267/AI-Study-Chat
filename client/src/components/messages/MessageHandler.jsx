import React from 'react'
import HumanMessage from './HumanMessage'
import BotMessage from './BotMessage'


export default function MessageHandler({ element }) {

    return (
        element.type === 'bot'
            ?
            <BotMessage element={element} />
            :
            <HumanMessage element={element} />
    )
}
