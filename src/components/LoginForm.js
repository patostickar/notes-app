import { useState, useEffect } from 'react';
import noteService from '../services/notes';
import loginService from '../services/login';
import Notification from './Notification';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedNoteappUser'));
    if (user) {
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      noteService.setToken(user.token);
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    window.location.reload();
  };

  return (
    <div>
      <Notification message={errorMessage} />
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
