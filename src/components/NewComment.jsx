import { useState } from 'react';
import { createComment } from '../services/commentService.js';

export default function NewComment({ postId, onAdd }) {
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const newComment = await createComment(postId, { body, email });
      const commentWithUniqueId = { 
        ...newComment, 
        id: `temp-${Date.now()}-${Math.random()}` 
      };
      onAdd?.(commentWithUniqueId);
      setBody('');
      setEmail('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-comment">
      <h4>Nuevo Comentario (simulado)</h4>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="Tu email"
        value={email}
        type="email"
        onChange={e => setEmail(e.target.value)}
        required
      />
      <textarea
        placeholder="Comentario"
        value={body}
        onChange={e => setBody(e.target.value)}
        required
      />
      <button disabled={loading}>{loading ? 'Enviando...' : 'Comentar'}</button>
    </form>
  );
}
