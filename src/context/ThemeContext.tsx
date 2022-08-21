import React, {createContext, FC, ReactNode, useState} from 'react'

type Theme = "theme-light" | "theme-dark";

interface ThemeContextType {
    theme: Theme,
    changeTheme: (theme: Theme) => void
}

type ThemeContextProviderProps = {
    children: ReactNode
}

export const ThemeContext = createContext<ThemeContextType>({theme: "theme-light", changeTheme: () => undefined});

export const ThemeProvider: FC<ThemeContextProviderProps> = ({children}) => {
    const [theme, setTheme] = useState<Theme>( localStorage.theme === "theme-light" || localStorage.theme === "theme-dark" ? localStorage.theme : "theme-light")

    const changeTheme = (theme: Theme): void => {
        setTheme(theme);
        localStorage.theme = theme;
    }

    return (
        <ThemeContext.Provider value={{theme, changeTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}