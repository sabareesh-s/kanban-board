import React from 'react';
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <main className="p-8">
      <h1 className="mb-6 font-semibold text-2xl">Kanban Board</h1>
      <section>
        <KanbanBoard />
      </section>
    </main>
  );
}

export default App;
