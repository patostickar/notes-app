import { useMatch } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';

const Note = ({ note, handleClick }) => {
  const match = useMatch('/notes/:id');
  const notes = useSelector(({ notes }) => notes);

  if (match) note = notes.find((note) => note.id === Number(match.params.id));

  return (
    <li onClick={handleClick}>
      <span>{note.content}</span>
      <button>
        <strong> {note.important ? 'make not important' : 'make important'}</strong>
      </button>
    </li>
  );
};

export default Note;
