import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { Center } from '../components/Center'
import { Player } from '../components/Player'
import { Sidebar } from '../components/Sidebar'

export default function Home() {
  return (
    <>
      <Head>
        <title>Spotify 2.0</title>
      </Head>

      <div className='bg-black h-screen overflow-hidden'>
        <main className='flex'>
          <Sidebar />
          <Center />
        </main>

        <div className='sticky bottom-0'>
          <Player />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  return {
    props: {
      session,
    }
  }
}
