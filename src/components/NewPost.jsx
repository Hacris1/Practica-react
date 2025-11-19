import { useState } from 'react';
import { createPost } from '../services/postService.js';

export default function NewPost({ onAdd }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const newPost = await createPost({ title, body, userId: 1 });
      const postWithUniqueId = { 
        ...newPost, 
        id: `temp-${Date.now()}-${Math.random()}` 
      };
      onAdd?.(postWithUniqueId);
      setTitle('');
      setBody('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-post">
      <h4>Nuevo Post (simulado)</h4>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Contenido"
        value={body}
        onChange={e => setBody(e.target.value)}
        required
      />
      <button disabled={loading}>{loading ? 'Enviando...' : 'Publicar'}</button>
    </form>
  );
}
