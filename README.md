# Catálogo de livros (React + TypeScript + crudcrud)

Lista, cadastra, remove e (opcionalmente) altera o status de livros usando uma API REST real no [crudcrud.com](https://crudcrud.com).

## Como rodar

1. Acesse https://crudcrud.com e copie sua URL única (ex.: `https://crudcrud.com/api/abc123`).
2. Copie `.env.example` para `.env` e acrescente o recurso `/books` no fim da URL:
   ```
   VITE_API_URL=https://crudcrud.com/api/abc123/books
   ```
3. Instale e execute:
   ```bash
   npm install
   npm run dev
   ```

> A URL do crudcrud expira em 24h e o limite gratuito é de 100 requisições. Se aparecer erro 404, gere uma nova URL e atualize o `.env`.

## Estrutura

```
src/
├── types/book.ts          # Book, NewBook, BookFormState, props e eventos
├── services/bookApi.ts    # GET, POST, DELETE e PUT tipados (axios) + tratamento de erro
└── components/
    ├── BookList.tsx       # GET com useEffect, mantém o estado da lista
    ├── BookForm.tsx       # POST, estado controlado do formulário
    └── BookItem.tsx       # DELETE e PUT (alternar Lido / Não lido)
```
