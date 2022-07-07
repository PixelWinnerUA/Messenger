import React, {createContext, useState} from 'react'

export const ThemeContext = createContext({theme: "theme-light", undefined});

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.theme ? localStorage.theme : "theme-light")

    const changeTheme = (theme) => {
        setTheme(theme);
        localStorage.theme = theme;
    }

    return (
        <ThemeContext.Provider value={{theme, changeTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}