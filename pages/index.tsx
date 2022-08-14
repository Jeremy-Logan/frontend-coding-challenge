import type { NextPage } from "next";
import Head from "next/head";
import { AuthenticationProvider } from "../context/Authentication";
import axios from 'axios'

const Home: NextPage = () => {

  

 

  return (
    <div className='p-[0 2rem]'>
      <Head>
        <title>Practicegenius Post Feed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='min-h-[100vh] p-[4rem 0] flex flex-col justify-center items-center'>
        
      </main>
    </div>
  );
};

const ProvidedApp = () => (
  <AuthenticationProvider>
    <Home />
  </AuthenticationProvider>
);

export default ProvidedApp;

