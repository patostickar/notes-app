import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';

const padding = {
  padding: 5,
};

export default function Navbar() {
  const user = useSelector(({ login }) => login);

  return (
    <div>
      <Link style={padding} to='/'>
        home
      </Link>
      <Link style={padding} to='/notes'>
        notes
      </Link>
      <Link style={padding} to='/users'>
        users
      </Link>
      {user ? (
        <em>{user.name} logged in</em>
      ) : (
        <Link style={padding} to='/login'>
          login
        </Link>
      )}
    </div>
  );
}
