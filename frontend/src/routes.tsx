import {createBrowserRouter} from "react-router-dom";
import Home from "./routes/Home.tsx";
import {AuthLoader} from "./loaders/AuthLoader.ts";
import AuthPage from "./routes/AuthPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage/>
  },
  {
    path: "/",
    loader: AuthLoader,
    element: <Home/>
  },
]);
