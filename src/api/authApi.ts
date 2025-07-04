import api from './api';

type ErrType = { response?: { data: { message: string } } };

export async function login(email: string, password: string) {
  try {
    const res = await api.post('/user/login', { email, password });
    return res?.data;
  } catch (err: unknown) {
    throw new Error((err as ErrType).response?.data?.message || 'Login failed');
  }
}

export async function register(email: string, password: string) {
  try {
    const res = await api.post('/user/register', { email, password });
    return res?.data ?? res;
  } catch (err: unknown) {
    throw new Error(
      (err as ErrType).response?.data?.message || 'Registration failed'
    );
  }
}

export async function logout() {
  try {
    const res = await api.post('/user/logout');
    return res.data;
  } catch (err: unknown) {
    throw new Error(
      (err as ErrType).response?.data?.message || 'Logout failed'
    );
  }
}

export async function getCurrentUser() {
  try {
    const res = await api.get('/user/me');
    return res.data;
  } catch (errRes: unknown) {
    if ((errRes as { data: { status?: number } })?.data?.status == 401) {
      try {
        // try to refresh token if expired
        const res = await api.post('/user/refreshToken');
        return res?.data;
      } catch {
        throw new Error('Failed to get current user');
      }
    }
  }
}
