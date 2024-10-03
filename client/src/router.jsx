import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Favorite from "./pages/Favorite";
import UploadImg from "./pages/UploadImg";
import RootLayout from "./layouts/RootLayout";

const requireAuth = () => {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) {
    throw redirect("/login");
  }
  return null;
};

const loginLoader = () => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    throw redirect("/");
  }
  return null;
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: loginLoader,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <RootLayout />,
    loader: requireAuth,
    children: [
      {
        index: true,
        loader: requireAuth,
        action: () => redirect("/home"),
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "monster/:id",
        element: <Detail />,
      },
      {
        path: "favorites",
        element: <Favorite />,
      },
      {
        path: "monster/:id/update-img",
        element: <UploadImg />,
      },
    ],
  },
]);
