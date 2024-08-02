"use client"

import { useTheme } from "@/hooks/useTheme"
import { FaMoon, FaSun } from "react-icons/fa6";

const ButtonToggleTheme: React.FC = () => {
    
    const { theme, toggleTheme } = useTheme();

    return (
        <button className="btn rounded-full fixed bottom-8 right-8" onClick={toggleTheme} type="button">
            { theme === 'dark' ? <FaSun/> : <FaMoon/> }
        </button>
    )
}

export default ButtonToggleTheme;