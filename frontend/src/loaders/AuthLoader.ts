import {redirect} from "react-router-dom";
import {store} from "../store";
import {setUser} from "../store/slices/authSlice.ts";

export async function AuthLoader(){
  const res = await fetch(import.meta.env.VITE_BACKEND_URL.concat('/v1/auth'), {
    method: 'GET',
    credentials: 'include'
  })
  if (res.status !== 200) {
    return redirect('/auth')
  }
  const user = await res.json();
  store.dispatch(setUser(user));
  return true
}
