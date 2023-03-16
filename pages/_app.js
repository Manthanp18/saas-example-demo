import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from '../context/AuthContext';
import { useRouter } from 'next/router';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Head from 'next/head';
import { SessionProvider } from "next-auth/react"


const noAuthRequired = ['/'];

function MyApp({ Component, pageProps, session }) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <Head>
        <link rel="icon" href="/sefavicon.ico" />
      </Head>
      <Provider>
        <ChakraProvider>
          {noAuthRequired.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            // <ProtectedRoute>
            <>
              <Navbar />
              <Component {...pageProps} />
            </>
            // </ProtectedRoute>
          )}
        </ChakraProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp
