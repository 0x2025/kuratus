import Navbar from './navbar'
import Footer from './footer'
 
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className='min-h-screen flex flex-col items-center'>{children}</main>
      <Footer />
    </>
  )
}