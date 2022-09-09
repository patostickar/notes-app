import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Togglable from './components/Toggable';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';
import VisibilityFilter from './components/VisibilityFilter';
import Notes from './components/Notes';
import Footer from './components/Footer';
// import Notification from './components/Notification';

import { initializeNotes } from './reducers/noteReducer';

const App = () => {
  // const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

  const noteFormRef = useRef();

  return (
    <div>
      <LoginForm />
      <Togglable buttonLabel='new note' ref={noteFormRef}>
        <NoteForm />
      </Togglable>
      <div></div>
      {/* <Notification message={errorMessage} /> */}
      <ul>
        <VisibilityFilter />
        <Notes />
      </ul>
      <Footer />
    </div>
  );
};

export default App;
