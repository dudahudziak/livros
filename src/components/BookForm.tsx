import { useState } from 'react';
import { createBook, getErrorMessage } from '../services/bookApi';
import type {
  BookFormProps,
  BookFormState,
  FieldChangeEvent,
  FormSubmitEvent,
} from '../types/book';

const INITIAL_STATE: BookFormState = { title: '', author: '', status: 'Não lido' };

export default function BookForm({ onBookCreated }: BookFormProps) {
  const [form, setForm] = useState<BookFormState>(INITIAL_STATE);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: FieldChangeEvent): void => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormSubmitEvent): Promise<void> => {
    event.preventDefault();
    if (!form.title.trim() || !form.author.trim()) {
      setError('Preencha o título e o autor.');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const created = await createBook({
        title: form.title.trim(),
        author: form.author.trim(),
        status: form.status,
      });
      onBookCreated(created);
      setForm(INITIAL_STATE);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Adicionar livro</h2>

      <label>
        Título
        <input name="title" value={form.title} onChange={handleChange} disabled={saving} />
      </label>

      <label>
        Autor
        <input name="author" value={form.author} onChange={handleChange} disabled={saving} />
      </label>

      <label>
        Status
        <select name="status" value={form.status} onChange={handleChange} disabled={saving}>
          <option value="Não lido">Não lido</option>
          <option value="Lido">Lido</option>
        </select>
      </label>

      {error && <p className="error" role="alert">{error}</p>}

      <button type="submit" className="btn-primary" disabled={saving}>
        {saving ? 'Salvando…' : 'Salvar livro'}
      </button>
    </form>
  );
}
