export async function login(email, password) {
  
  const mockLogin = async () => {
    await new Promise(r => setTimeout(r, 400));
    const validCombos = [
      { email: 'eve.holt@reqres.in', password: 'cityslicka' },
      { email: 'demo@local', password: 'demo123' },
    ];
    const ok = validCombos.some(v => v.email === email && v.password === password);
    if (!ok) throw new Error('Credenciales inválidas (mock)');
    return { token: 'mock-token-' + Math.random().toString(36).slice(2) };
  };

  try {
    const res = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = (data && (data.error || data.message)) || `HTTP ${res.status}`;
      if (String(msg).toLowerCase().includes('missing api key') || res.status === 403) {
        return await mockLogin();
      }
      throw new Error(msg || 'Credenciales inválidas');
    }
    return data;
  } catch (err) {
    return await mockLogin().catch(() => {
      throw new Error(err?.message || 'Error de red al iniciar sesión');
    });
  }
}
