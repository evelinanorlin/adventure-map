import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { MainPage } from "./components/MainPage";
import About from "./components/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <MainPage />,
        index: true,
      },
      {
        path: "/about",
        element: <About />,
      },
      //{
      //   path: "/contact",
      //   element: <Contact />,
      // },
    ],
  },
]);