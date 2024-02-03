import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className='flex min-h-screen flex-col items-center'>
        {children}
      </main>
      <Footer />
    </>
  )
}