import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { MainPage } from "./components/MainPage";
import { getExperiences } from "./services/experinceServices";
import { useEffect, useState } from "react";
import { ExperienceContext } from "./contexts/ExperienceContext.ts";
import { IExperienceId } from "./components/interfaces/IExperience";

export const Layout = () => {

  const [experiences, setExperiences] = useState<IExperienceId[]>([]);
  const [visualExperiences, setVisualExperiences] = useState<IExperienceId[]>([]);

  useEffect(() => {
    if (experiences.length === 0){
      initialExperiences();
    }
  });
  
  const initialExperiences = async () => {
    const experienceList = await getExperiences();
    setExperiences(experienceList);
    setVisualExperiences(experienceList);
  }
  
  return (
    <>
      <Header />
      <main>
        <ExperienceContext.Provider value={{experiences, visualExperiences, setVisualExperiences}}>
          <MainPage />
          <Outlet />
        </ExperienceContext.Provider>
      </main>
      <Footer />
    </>
  );
};
