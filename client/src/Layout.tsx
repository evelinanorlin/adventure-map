import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { MainPage } from "./components/MainPage";

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <MainPage />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
