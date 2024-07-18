import React, { useState } from 'react';
import TextRow from './TextRow';
import './TextRow.css';

const TestTextRow = () => {
  const [textRows, setTextRows] = useState([{ id: 1, text: 'Click to edit' }]);

  const handleTextChange = (id, newText) => {
    console.log(`handleTextChange for row ${id}: ${newText}`);
    setTextRows(textRows.map(row => (row.id === id ? { ...row, text: newText } : row)));
  };

  const handleDelete = (id) => {
    console.log(`handleDelete for row ${id}`);
    setTextRows(textRows.filter(row => row.id !== id));
  };

  const addTextRow = () => {
    const newId = textRows.length > 0 ? textRows[textRows.length - 1].id + 1 : 1;
    setTextRows([...textRows, { id: newId, text: '' }]);
  };

  return (
    <div>
      <button onClick={addTextRow}>Add TextRow</button>
      {textRows.map(row => (
        <TextRow
          key={row.id}
          id={row.id}
          text={row.text}
          onDelete={handleDelete}
          onTextChange={handleTextChange}
        />
      ))}
    </div>
  );
};

export default TestTextRow;
