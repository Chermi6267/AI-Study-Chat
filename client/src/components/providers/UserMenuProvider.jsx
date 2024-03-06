import React, { createContext, useState } from 'react'

export const UserMenuContext = createContext()

export const UserMenuProvider = ({ children }) => {

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

    return (
        <UserMenuContext.Provider value={[isUserMenuOpen, setIsUserMenuOpen]}>
            {children}
        </UserMenuContext.Provider>
    )
}