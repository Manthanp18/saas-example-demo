import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
// import { AuthUserProvider } from "../context/AuthUserContext";
import { AuthContextProvider, useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Head from 'next/head';
// import { useAuth } from "../context/AuthContext";
import { ShoppingCartProvider } from '../context/ShoppingCartContext';
import { wrapper } from '../redux/store';
// function MyApp({ Component, pageProps }) {
//   return (
//     <AuthUserProvider>
//       <ChakraProvider>
//         <Component {...pageProps} />
//       </ChakraProvider>
//     </AuthUserProvider>
//   );
// }

// export default MyApp;

const noAuthRequired = ['/'];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ShoppingCartProvider>
      <Head>
        <link rel="icon" href="/sefavicon.ico" />
      </Head>
      <AuthContextProvider>
        <ChakraProvider>
          {noAuthRequired.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoute>
              <Navbar />
              <Component {...pageProps} />
            </ProtectedRoute>
          )}
        </ChakraProvider>
      </AuthContextProvider>
    </ShoppingCartProvider>
  );
}

export default wrapper.withRedux(MyApp);
