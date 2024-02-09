import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <div className='min-h-screen flex flex-col items-center'>
      <Navbar />
      <main className='pb-20'>
        {children}
      </main>
      <Footer />
    </div>
  )
}