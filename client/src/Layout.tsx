import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { MainPage } from "./components/MainPage";
import { getExperiences } from "./services/experinceServices";
import { useEffect, useState } from "react";
import { ExperienceContext } from "./contexts/ExperienceContext.ts";
import { IExperienceId } from "./components/interfaces/IExperience";
import { ClickableMapContext } from "./contexts/ClickableMapContext.ts";
import { ChosenLocationContext } from "./contexts/ChosenLocationContext.ts";
import { ILocation } from "./components/interfaces/ILocation.ts";

export const Layout = () => {
  const [experiences, setExperiences] = useState<IExperienceId[]>([]);
  const [visualExperiences, setVisualExperiences] = useState<IExperienceId[]>(
    [],
  );
  const [clickable, setClickable] = useState<boolean>(false);
  const [chosenLocation, setChosenLocation] = useState<ILocation | null>(null);

  useEffect(() => {
    if (experiences.length === 0) {
      initialExperiences();
    }
  });

  const initialExperiences = async () => {
    const experienceList = await getExperiences();
    setExperiences(experienceList);
    setVisualExperiences(experienceList);
  };

  return (
    <>
      <Header />
      <main>
        <ExperienceContext.Provider
          value={{ experiences, visualExperiences, setVisualExperiences }}
        >
          <ClickableMapContext.Provider value={{ clickable, setClickable }}>
            <ChosenLocationContext.Provider
              value={{ chosenLocation, setChosenLocation }}
            >
              <MainPage />
              <Outlet />
            </ChosenLocationContext.Provider>
          </ClickableMapContext.Provider>
        </ExperienceContext.Provider>
      </main>
      <Footer />
    </>
  );
};
