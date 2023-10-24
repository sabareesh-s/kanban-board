import React from 'react';
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <main className="md:w-screen h-screen flex md:justify-center items-start pt-16 p-4 bg-[url('https://i.imgur.com/QzikZzo.jpg')] md:bg-cover">
      {/* <h1 className="font-semibold text-2xl">Kanban Board</h1> */}
      <section className='max-w-[840px] flex-shrink-0 p-4 bg-white rounded-xl shadow-md border backdrop-blur-sm'>
        <KanbanBoard />
      </section>
    </main>
  );
}

export default App;
