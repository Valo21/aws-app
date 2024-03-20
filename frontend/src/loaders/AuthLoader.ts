import {redirect} from "react-router-dom";

export async function AuthLoader(){
  // TODO: CHANGE THIS
  if (true) {
    return redirect('auth');
  }
  return true;
}
