import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import About from "./components/About";
import WelcomePopup from "./components/WelcomePopup";
import AddExperience from "./components/AddExperience";
import Experience from "./components/Experience";

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
      }
  
      //{
      //   path: "/contact",
      //   element: <Contact />,
      // },
    ],
  },
]);
