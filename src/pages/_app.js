import 'bootstrap/dist/css/bootstrap.css'; // Add this line
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import '@/styles/globals.css'

// import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);
  return (
    <>
      <Component {...pageProps} />
      {/* <Analytics /> */}
    </>
  )
}