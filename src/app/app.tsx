"use client"
import { ThemeProvider } from "@providers/theme";
import { SessionProvider } from "next-auth/react"; // Corrigido: importação do SessionProvider

export type AppPropsWithLayout = {
  children: React.ReactNode;
};

const App: React.FC<AppPropsWithLayout> = ({
  children,
}) => {
  return (
    <SessionProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default App;
