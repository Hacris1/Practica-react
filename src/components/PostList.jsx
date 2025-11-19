import { useEffect, useState } from 'react';
import { fetchPosts } from '../services/postService.js';
import PostItem from './PostItem.jsx';

export default function PostList({ searchTerm = '' }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchPosts()
      .then(setPosts)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando posts...</p>;
  if (error) return <p>Error: {error}</p>;

  const filtered = posts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="post-list">
      {filtered.length === 0 && <p>No se encontraron posts.</p>}
      {filtered.map(p => <PostItem key={p.id} post={p} />)}
    </div>
  );
}
