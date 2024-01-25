import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import AddExperience from "./components/AddExperience";
import Experience from "./components/Experience";
import AdminLogin from "./components/AdminLogin";
import AdminList from "./components/AdminList";
import About from "./components/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/om-aventyrskartan",
        element: <About />,
      },
      {
        path: "/lagg-till-upplevelse",
        element: <AddExperience />,
      },
      {
        path: "/upplevelser/:id",
        element: <Experience />,
      },
      {
        path: "/logga-in",
        element: <AdminLogin />,
      },
      {
        path: "/upplevelser-lista",
        element: <AdminList />,
      },
    ],
  },
]);
