import React, { useRef } from 'react';

import Togglable from './Toggable';
import LoginForm from './LoginForm';
import NoteForm from './NoteForm';

export default function Home() {
  const noteFormRef = useRef();
  return (
    <div>
      <LoginForm />
      <Togglable buttonLabel='new note' ref={noteFormRef}>
        <NoteForm />
      </Togglable>
    </div>
  );
}
