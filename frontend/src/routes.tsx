import {createBrowserRouter} from "react-router-dom";
import Home from "./routes/Home.tsx";
import {AuthLoader} from "./loaders/AuthLoader.ts";
import AuthPage from "./routes/AuthPage.tsx";
import Photos from "./routes/Photos.tsx";
import UploadPage from "./routes/UploadPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage/>
  },
  {
    path: "/",
    loader: AuthLoader,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/photos',
        element: <Photos/>
      },
      {
        path: '/upload',
        element: <UploadPage/>
      }
    ]
  },
]);
