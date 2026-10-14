import { useEffect, useState } from 'react';
import { fetchBooks, getErrorMessage } from '../services/bookApi';
import type { Book, BookListProps } from '../types/book';
import BookItem from './BookItem';

export default function BookList({ refreshKey }: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBooks();
        if (!cancelled) setBooks(data);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const handleDeleted = (id: string): void => {
    setBooks((prev) => prev.filter((b) => b._id !== id));
  };

  const handleStatusChanged = (updated: Book): void => {
    setBooks((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
  };

  if (loading) return <p className="muted">Carregando livros…</p>;
  if (error) return <p className="error" role="alert">{error}</p>;
  if (books.length === 0) {
    return <p className="muted">Nenhum livro cadastrado ainda. Use o formulário para adicionar o primeiro.</p>;
  }

  return (
    <ul className="books">
      {books.map((book) => (
        <BookItem
          key={book._id}
          book={book}
          onDeleted={handleDeleted}
          onStatusChanged={handleStatusChanged}
        />
      ))}
    </ul>
  );
}
