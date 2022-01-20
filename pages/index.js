import Head from 'next/head'
import Header from '../components/organisms/Header'
import Main from '../components/mulecules/Main'
import Sidebar from '../components/mulecules/Sidebar'
import Feed from '../components/organisms/Feed' 
import Modal from '../components/organisms/Modal'
export default function Home() {
  return (
    <div >
      <Head>
        <title>Instagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> 
      <Header/>

    {/* Feed */}
    <Feed/> 
    <Modal/>  
    
    {/* Footer */}
    {/* Modal */}
    </div>
  )
}
