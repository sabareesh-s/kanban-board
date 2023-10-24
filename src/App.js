import React from 'react';
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <main className="w-screen h-screen flex justify-center items-start pt-16 bg-[url('https://i.imgur.com/QzikZzo.jpg')] bg-cover">
      {/* <h1 className="font-semibold text-2xl">Kanban Board</h1> */}
      <section className='max-w-[840px] flex-shrink-0 p-4 bg-white rounded-xl shadow-md border backdrop-blur-sm'>
        <KanbanBoard />
      </section>
    </main>
  );
}

export default App;
