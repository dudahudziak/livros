import { useState } from 'react';
import { deleteBook, getErrorMessage, updateBookStatus } from '../services/bookApi';
import type { BookItemProps, BookStatus } from '../types/book';

export default function BookItem({ book, onDeleted, onStatusChanged }: BookItemProps) {
  const [busy, setBusy] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (): Promise<void> => {
    setBusy(true);
    setError(null);
    try {
      await deleteBook(book._id);
      onDeleted(book._id);
    } catch (err) {
      setError(getErrorMessage(err));
      setBusy(false);
    }
  };

  const handleToggleStatus = async (): Promise<void> => {
    const next: BookStatus = book.status === 'Lido' ? 'Não lido' : 'Lido';
    setBusy(true);
    setError(null);
    try {
      const updated = await updateBookStatus(book, next);
      onStatusChanged(updated);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <li className={`book ${book.status === 'Lido' ? 'book--read' : ''}`}>
      <div className="book__info">
        <h3 className="book__title">{book.title}</h3>
        <p className="book__author">{book.author}</p>
        {error && <p className="error" role="alert">{error}</p>}
      </div>
      <div className="book__actions">
        <button
          type="button"
          className="badge"
          onClick={handleToggleStatus}
          disabled={busy}
          title="Alternar status"
        >
          {book.status}
        </button>
        <button type="button" className="btn-remove" onClick={handleDelete} disabled={busy}>
          Remover
        </button>
      </div>
    </li>
  );
}
