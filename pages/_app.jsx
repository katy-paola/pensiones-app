import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/index.css';
import '../styles/login.css';
import '../styles/register.css';
import '../styles/home.css';
import '../styles/add-pension.css';
import '../styles/edit-pension.css';
import '../styles/view-pension.css';
import 'leaflet/dist/leaflet.css';
import { AuthContextProvider } from '../context/authContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
