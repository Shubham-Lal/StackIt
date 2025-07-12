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
import PostQuestion from './pages/PostQuestion';
import QuestionDetails from './pages/QuestionDetails';
import { useAuthFetch } from './hooks/useAuthFetch';

export default function App() {
  const { fetchUser } = useAuthFetch();

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path='' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/ask' element={<PostQuestion />} />
          <Route path='/question/:question_id' element={<QuestionDetails />} />
          <Route path='about' element={<About />} />
          <Route path='team' element={<Team />} />
          <Route path='contact' element={<Contact />} />
        <Route path='*' element={<NotFound path='*' />} />
      </Routes>
    </BrowserRouter>
  );
}