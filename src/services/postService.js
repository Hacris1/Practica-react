const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchPosts() {
  const res = await fetch(`${BASE_URL}/posts?_limit=15`);
  if (!res.ok) throw new Error('Error cargar posts');
  return res.json();
}

export async function fetchPost(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) throw new Error('Post no encontrado');
  return res.json();
}

export async function createPost(data) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error creando post');
  return res.json();
}
