import { ThemeProvider } from "@providers/theme";
import { NextPage } from "next";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react"; // Corrigido: importação do SessionProvider
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  pageProps: {
    session: Session | null;
    pageProps: any;
  };
};

const App: React.FC<AppPropsWithLayout> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default App;
