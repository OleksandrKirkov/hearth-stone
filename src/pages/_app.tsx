import { NextPage } from "next";
import "@/styles/global.css"
import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/assets/store/store";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
} & { title: string }

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return getLayout(
        <>
            <Head>
                <title>{Component.title}</title>
            </Head>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext)

    return {
        pageProps: {
            ...appProps.pageProps,
        }
    }
}

export default MyApp;
