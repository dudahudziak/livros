import axios from 'axios';
import type { Book, BookStatus, NewBook } from '../types/book';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function fetchBooks(): Promise<Book[]> {
  const { data } = await api.get<Book[]>('');
  return data;
}

export async function createBook(newBook: NewBook): Promise<Book> {
  const { data } = await api.post<Book>('', newBook);
  return data;
}

export async function deleteBook(id: string): Promise<void> {
  await api.delete(`/${id}`);
}

export async function updateBookStatus(book: Book, status: BookStatus): Promise<Book> {
  const { _id, ...rest } = book;
  await api.put(`/${_id}`, { ...rest, status });
  return { ...book, status };
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Não foi possível conectar à API. Verifique sua internet e a URL do crudcrud.';
    }
    if (error.response.status === 404) {
      return 'A URL do crudcrud não foi encontrada. Ela pode ter expirado (dura 24h): gere uma nova.';
    }
    return `A API respondeu com erro ${error.response.status}.`;
  }
  return error instanceof Error ? error.message : 'Erro inesperado.';
}
