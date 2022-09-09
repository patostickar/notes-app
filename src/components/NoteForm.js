import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer';

const NoteForm = () => {
  const [input, setInput] = useState('');

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    dispatch(createNote({ content: input }));

    setInput('');
  };

  return (
    <div className='formDiv'>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          id='noteForm'
          value={input}
          placeholder='write note content here'
          onChange={handleChange}
        />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default NoteForm;
