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
import '../styles/content-profile.css';
import '../styles/edit-profile.css';
import 'leaflet/dist/leaflet.css';
import { AuthContextProvider } from '../context/authContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>

      <script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
        integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
        crossOrigin="anonymous"
        async
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js"
        integrity="sha384-IDwe1+LCz02ROU9k972gdyvl+AESN10+x7tBKgc9I5HFtuNz0wWnPclzo6p9vxnk"
        crossOrigin="anonymous"
        async
      ></script>
    </SessionProvider>
  );
}

export default MyApp;
