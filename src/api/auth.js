// auth.js
export async function loginUser(username, password) {
    // In a real implementation, do something like:
    // const { data } = await api.post('/login', { username, password });
    // store token in local storage
  
    // Mock success for demonstration
    if (username === 'admin' && password === 'admin') {
      return Promise.resolve({
        token: 'mock-jwt-token',
        user: { username: 'admin', role: 'Admin' },
      });
    }
    return Promise.reject(new Error('Invalid credentials'));
  }
  