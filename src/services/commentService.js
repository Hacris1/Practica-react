const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchComments(postId) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  if (!res.ok) throw new Error('Error cargar comentarios');
  return res.json();
}

export async function createComment(postId, data) {
  const res = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, postId })
  });
  if (!res.ok) throw new Error('Error creando comentario');
  return res.json();
}
