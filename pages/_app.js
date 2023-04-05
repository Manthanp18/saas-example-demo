import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from '../context/AuthContext';
import { AuthContextProvider, useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Navbar from '../components/Navbar';
// import { useAuth } from "../context/AuthContext";


const noAuthRequired = ['/'];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="icon" href="/sefavicon.ico" />
      </Head>
      <Provider>
        <ChakraProvider>

          <Navbar />
          <Component {...pageProps} />

        </ChakraProvider>
      </Provider>
    </>
  );
}

export default MyApp
