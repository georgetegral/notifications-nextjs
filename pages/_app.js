import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import AppLayout from "../src/layout/AppLayout";
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AppLayout>
        <Head>
          <title>Notifications</title>
        </Head>
        <Component {...pageProps} />
      </AppLayout>
    </ChakraProvider>
  )
}

export default MyApp
