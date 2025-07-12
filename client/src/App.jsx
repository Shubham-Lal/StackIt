import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import { useAuthFetch } from './hooks/useAuthFetch';

export default function App() {
  const { fetchUser } = useAuthFetch();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path='' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='about' element={<About />} />
          <Route path='team' element={<Team />} />
          <Route path='contact' element={<Contact />} />
        <Route path='*' element={<NotFound path='*' />} />
      </Routes>
    </BrowserRouter>
  );
}