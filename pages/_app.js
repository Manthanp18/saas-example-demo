import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from '../context/AuthContext';
import { AuthContextProvider, useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Head from 'next/head';
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
    </>
  );
}

export default MyApp
