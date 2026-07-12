
import './App.css'
import { Outlet } from 'react-router'
import Header from './components/Header'

// App.jsx will be the shell containing the routes
// Outlet is what we are swapping between while Header remains constant

function App() {
  return (
    <div className='main-container'>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
