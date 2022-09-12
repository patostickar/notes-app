import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Notes from './components/Notes';
import Note from './components/Note';
import Footer from './components/Footer';
// import Notification from './components/Notification';

import { initializeNotes } from './reducers/noteReducer';

const App = () => {
  // const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector(({ login }) => login);

  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

  const Users = () => (
    <div>
      <h2>TKTL notes app</h2>
      <ul>
        <li>Matti Luukkainen</li>
        <li>Juha Tauriainen</li>
        <li>Arto Hellas</li>
      </ul>
    </div>
  );

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/notes/:id' element={<Note />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/users' element={user ? <Users /> : <Navigate replace to='/login' />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/' element={<Home />} />
      </Routes>

      {/* <Notification message={errorMessage} /> */}

      <Footer />
    </div>
  );
};

export default App;
