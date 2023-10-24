import React, { useState } from 'react';
import KanbanCard from './KanbanCard';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', status: 'Not Started' },
    { id: 2, title: 'Task 2', status: 'Not Started' },
    { id: 3, title: 'Task 3', status: 'In Progress' },
    { id: 4, title: 'Task 4', status: 'In Progress' },
    { id: 5, title: 'Task 5', status: 'Completed' },
  ]);

  const handleDragStart = (e, taskId, currentStatus) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('currentStatus', currentStatus);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const currentStatus = e.dataTransfer.getData('currentStatus');

    if (currentStatus !== newStatus) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === parseInt(taskId)) {
          return { ...task, status: newStatus };
        }
        return task;
      });

      setTasks(updatedTasks);
    }
  };

  const renderTaskCards = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <KanbanCard
          key={task.id}
          id={task.id}
          title={task.title}
          status={task.status}
          onDragStart={handleDragStart}
        />
      ));
  };

  return (
    <div className="flex gap-6">
      <div
        className=" w-64 p-4 rounded-lg"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'Not Started')}
      >
        <h3 className="bg-red-200 px-1 mx-1 rounded w-fit text-sm">Not started</h3>
        {renderTaskCards('Not Started')}
      </div>
      <div
        className=" w-64 p-4 rounded-lg"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'In Progress')}
      >
        <h2 className="bg-blue-200 px-1 mx-1 rounded w-fit text-sm">In Progress</h2>
        {renderTaskCards('In Progress')}
      </div>
      <div
        className=" w-64 p-4 rounded-lg"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'Completed')}
      >
        <h2 className="bg-green-200 px-1 mx-1 rounded w-fit text-sm">Completed</h2>
        {renderTaskCards('Completed')}
      </div>
    </div>
  );
};

export default KanbanBoard;
