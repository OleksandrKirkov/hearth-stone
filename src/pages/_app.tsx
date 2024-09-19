import { NextPage } from "next";
import "@/styles/global.css"
import { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
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
            <Component {...pageProps} />
        </>
    )
}

MyApp.getInitialProps = async (context: any) => {
    return {
        pageProps: {
            ...context.pageProps,
        }
    }
}

export default MyApp;
