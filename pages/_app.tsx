import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ContextProvider } from '../contexts/UseContext';
import TanstackProvider from '@/providers/TanstackProvider';
import { Toaster } from "@/components/ui/toaster"
import { Router } from 'next/router';
import { useState } from 'react';
import Loading from '@/components/Loading';

function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading]= useState(false);
  Router.events.on("routeChangeStart", (url)=>{
    console.log("route is changing....");
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url)=>{
    console.log("route change is completed");
    setLoading(false);
  });
  return (
    <TanstackProvider>
      <ContextProvider>
        {loading && (<Loading />)}
        <Component {...pageProps} />
        <Toaster />
      </ContextProvider>
    </TanstackProvider>
  );
}
export default App;
