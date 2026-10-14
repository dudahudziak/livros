import { useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import type { Book } from './types/book';

export default function App() {
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const handleBookCreated = (_book: Book): void => {
    setRefreshKey((k) => k + 1);
  };

  return (
    <main className="layout">
      <header>
        <h1>Catálogo de livros</h1>
        <p className="muted">Cadastre o que você já leu e o que ainda está na fila.</p>
      </header>

      <div className="columns">
        <BookForm onBookCreated={handleBookCreated} />
        <section>
          <h2>Minha estante</h2>
          <BookList refreshKey={refreshKey} />
        </section>
      </div>
    </main>
  );
}
