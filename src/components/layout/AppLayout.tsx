import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'

export default function AppLayout() {
  return (
    <div className='min-h-screen flex flex-col bg-slate-950 text-slate-50'>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
