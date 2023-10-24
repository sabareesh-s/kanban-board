import React from 'react';

const KanbanCard = ({ id, title, status, onDragStart, onClick }) => {
  return (
    <div
      className="bg-white p-2 rounded shadow mt-2 border text-sm font-semibold cursor-pointer"
      draggable
      onDragStart={(e) => onDragStart(e, id, status)}
      onClick={() => onClick()}
    >
      <p className="text-gray-800">{title}</p>
    </div>
  );
};

export default KanbanCard;
