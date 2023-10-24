import React from 'react';
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <main className="w-screen h-screen flex p-16 bg-[url('https://i.imgur.com/QzikZzo.jpg')] bg-cover">
      <section className='max-w-full h-fit p-4 bg-white rounded-xl shadow-md border'>
        <KanbanBoard />
      </section>
    </main>
  );
}

export default App;

