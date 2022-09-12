import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setUser } from '../reducers/loginReducer';
import noteService from '../services/notes';
// import Notification from './Notification';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(({ login }) => login);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedNoteappUser'));
    if (user) {
      dispatch(setUser(user));
      noteService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user) noteService.setToken(user.token);
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(loginUser({ username, password }));
    window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
    setUsername('');
    setPassword('');
  };

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    window.location.reload();
  };

  return (
    <div>
      {/* <Notification message={errorMessage} /> */}
      {user === null ? (
        <div>
          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                id='username'
                value={username}
                onChange={({ target }) => {
                  setUsername(target.value);
                }}
              />
            </div>
            <div>
              password
              <input
                id='password'
                type='password'
                value={password}
                onChange={({ target }) => {
                  setPassword(target.value);
                }}
              />
            </div>
            <button id='login-button' type='submit'>
              login
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogOut}>Log Out</button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
