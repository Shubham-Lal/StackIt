import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import Navbar from './components/Navbar.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <Navbar />
    <App />
  </>
)
