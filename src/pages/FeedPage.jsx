import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../components/AuthUser.jsx';
import NewPost from '../components/NewPost.jsx';
import PostList from '../components/PostList.jsx';

export default function FeedPage() {
  const [tempPosts, setTempPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="page feed-page">
      <h2>Feed</h2>
      <nav className="page-nav">
        <Link to="/about">Acerca de</Link>
      </nav>
      <AuthUser />
      
      {/* Filtro */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar posts por título..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <NewPost onAdd={(p) => setTempPosts(prev => [p, ...prev])} />
      
      {tempPosts.length > 0 && (
        <div className="temp-posts">
          <h4>Posts agregados localmente</h4>
          {tempPosts.map(p => (
            <div key={p.id} className="post-item temp">
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      )}
      
      <PostList searchTerm={searchTerm} />
    </div>
  );
}