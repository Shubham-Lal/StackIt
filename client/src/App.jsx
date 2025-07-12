import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Home from './pages/Home/Home';
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
        <Route element={<Main />}>
          <Route path='' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='team' element={<Team />} />
          <Route path='contact' element={<Contact />} />
        </Route>
        <Route path='*' element={<NotFound path='*' />} />
      </Routes>
    </BrowserRouter>
  );
}