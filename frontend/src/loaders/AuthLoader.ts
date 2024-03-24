import { redirect } from 'react-router-dom';
import { store } from '../store';
import { setUser } from '../store/slices/authSlice.ts';

export async function AuthLoader() {
  const accessToken: string | null = sessionStorage.getItem('accessToken');
  if (!accessToken) return redirect('/auth');

  const res = await fetch(import.meta.env.VITE_BACKEND_URL.concat('/v1/auth'), {
    headers: {
      'Authorization': 'Bearer ' +  accessToken
    }
  });
  if (!res.ok && res.status === 204) {
    return redirect('/auth');
  }
  const user = await res.json();
  store.dispatch(setUser(user));
  return true;
}
