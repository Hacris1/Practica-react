import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPost } from '../services/postService.js';
import AuthUser from '../components/AuthUser.jsx';
import CommentList from '../components/CommentList.jsx';
import NewComment from '../components/NewComment.jsx';

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localComments, setLocalComments] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchPost(id)
      .then(setPost)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddComment = (c) => {
    setLocalComments(prev => [c, ...prev]);
  };

  if (loading) return <p>Cargando post...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return null;

  return (
    <div className="page post-detail-page">
      <AuthUser />
      <h2>Post #{post.id}</h2>
      <article className="post-detail">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </article>
      <NewComment postId={post.id} onAdd={handleAddComment} />
      {localComments.length > 0 && (
        <div className="local-comments">
          <h4>Comentarios agregados localmente</h4>
          <ul>
            {localComments.map(c => <li key={c.id}>{c.email}: {c.body}</li>)}
          </ul>
        </div>
      )}
      <h4>Comentarios desde API</h4>
      <CommentList postId={post.id} />
    </div>
  );
}
