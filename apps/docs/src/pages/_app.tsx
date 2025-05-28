import type { AppProps } from 'next/app';
import { inter } from '../fonts';
import '../globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.variable};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
