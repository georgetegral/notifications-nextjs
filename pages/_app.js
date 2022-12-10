import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { FirestoreProvider } from "../src/hook/firestore";
import AppLayout from "../src/layout/AppLayout";
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <FirestoreProvider>
        <AppLayout>
          <Head>
            <title>Notifications</title>
          </Head>
          <Component {...pageProps} />
        </AppLayout>
      </FirestoreProvider>
    </ChakraProvider>
  )
}

export default MyApp
