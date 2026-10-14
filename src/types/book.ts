import type { ChangeEvent, FormEvent } from 'react';

export type BookStatus = 'Lido' | 'Não lido';

export interface Book {
  _id: string;
  title: string;
  author: string;
  status: BookStatus;
}

export type NewBook = Omit<Book, '_id'>;

export interface BookFormState {
  title: string;
  author: string;
  status: BookStatus;
}

export interface BookListProps {
  refreshKey: number;
}

export interface BookFormProps {
  onBookCreated: (book: Book) => void;
}

export interface BookItemProps {
  book: Book;
  onDeleted: (id: string) => void;
  onStatusChanged: (book: Book) => void;
}

export type FormSubmitEvent = FormEvent<HTMLFormElement>;
export type FieldChangeEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement>;
