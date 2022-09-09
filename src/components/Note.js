const Note = ({ note, handleClick }) => {
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
