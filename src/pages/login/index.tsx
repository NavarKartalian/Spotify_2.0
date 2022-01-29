import { GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";

interface ProvidersProps {
  spotify: {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
  }
}

interface LoginProps {
  providers: ProvidersProps
}

export default function Login({ providers }: LoginProps) {
  return (
    <>
      <Head>
        <title>Spotify 2.0 | Login</title>
      </Head>

      <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
        <img className="w-52 mb-5" src="https://i.imgur.com/fPuEa9V.png" alt="Spotify Logo" />

        <div>
          <button 
            className="bg-[#18D860] text-white p-5 rounded-full hover:bg-[#1cff73] hover:scale-110  
            focus:outline-none focus:ring focus:ring-green-300 transition-background duration-500"
            onClick={() => signIn(providers.spotify.id, { callbackUrl: '/' })}
          >
            Login with {providers.spotify.name}
          </button>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const providers = await getProviders();
    
    return {
      props: {
        providers
      }
    }
  } 
  catch (error) {
    return {
      props: {}
    }
  }
}