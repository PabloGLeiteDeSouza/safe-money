import { ThemeContext } from "@contexts/theme";
import React from "react";

export const useTheme = () => React.useContext(ThemeContext);