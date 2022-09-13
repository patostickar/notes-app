import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer';
import { useField } from '../hooks/useField';

const NoteForm = () => {
  const dispatch = useDispatch();
  const note = useField();

  const addNote = (event) => {
    event.preventDefault();
    dispatch(createNote({ content: note.value }));

    note.setValue('');
  };

  return (
    <div className='formDiv'>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          id='noteForm'
          placeholder='write note content here'
          type='text'
          value={note.value}
          onChange={note.onChange}
        />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default NoteForm;
