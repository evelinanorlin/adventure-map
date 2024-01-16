import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import About from "./components/About";
import WelcomePopup from "./components/WelcomePopup";
import AddExperience from "./components/AddExperience";
import Experience from "./components/Experience";
import AdminLogin from "./components/AdminLogin";
import AdminList from "./components/AdminList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <WelcomePopup />,
        index: true,
      },
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

      //{
      //   path: "/contact",
      //   element: <Contact />,
      // },
    ],
  },
]);
