import api from './api';

export async function login(email: string, password: string) {
  try {
    const res = await api.post('/user/login', { email, password });
    return res?.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Login failed');
  }
}

export async function register(email: string, password: string) {
  try {
    const res = await api.post('/user/register', { email, password });
    return res?.data ?? res;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Registration failed');
  }
}

export async function logout() {
  try {
    const res = await api.post('/user/logout');
    return res.data;
  } catch (err: any) {
    throw new Error('Logout failed');
  }
}

export async function getCurrentUser() {
  try {
    const res = await api.get('/user/me');
    return res.data;
  } catch {
    throw new Error('Failed to get current user');
  }
}
