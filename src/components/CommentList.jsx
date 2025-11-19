import { useEffect, useState } from 'react';
import { fetchComments } from '../services/commentService.js';

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchComments(postId)
      .then(setComments)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) return <p>Cargando comentarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul className="comment-list">
      {comments.map(c => (
        <li key={c.id}>
          <strong>{c.email}</strong>: {c.body}
        </li>
      ))}
    </ul>
  );
}
