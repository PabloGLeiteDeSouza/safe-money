import React from "react";
import { IThemeProviderProps } from "./interfaces";
import { ThemeContext } from "@/contexts/theme";


export const ThemeProvider: React.FC<IThemeProviderProps> = ({defaultTheme, children, LoadingScreen, st_key, dc_key}) => {

    const [theme, changeTheme] = React.useState(defaultTheme ? defaultTheme : 'light');
    const [isLoading, setIsLoading] = React.useState(true);

    const storage_key = st_key ? st_key : "theme";
    const document_key = dc_key ? dc_key : "data-theme";


    const setTheme = React.useCallback((theme: string) => {
        localStorage.setItem(storage_key, theme);
        document.documentElement.setAttribute(storage_key, theme);
        changeTheme(theme);
    },[storage_key])

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    React.useEffect(() => {
        const document_theme = document.documentElement.getAttribute(document_key);
        const stored_theme = localStorage.getItem(storage_key);
        if (stored_theme) {
            setTheme(stored_theme);
        } else if (defaultTheme) {
            setTheme(defaultTheme)
        } else if (document_theme) {
            setTheme(document_theme)
        } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setTheme("dark");
            } else {
                setTheme("light");
            }
        }
        setIsLoading(false);
    }, [defaultTheme, document_key, setTheme, storage_key])

    if (isLoading) {
        return LoadingScreen ? 
        (<LoadingScreen/>) : 
        (
            <div>
                <div>Loading...</div>
            </div>
        )
    }

    return (
        <ThemeContext.Provider value={{theme, setTheme, toggleTheme}} >
            {children}
        </ThemeContext.Provider>
    )
}