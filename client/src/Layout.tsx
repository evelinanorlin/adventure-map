import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { MainPage } from "./components/MainPage";
import { getExperiences } from "./services/experinceServices";
import { useEffect, useState } from "react";
import { ExperienceContext } from "./contexts/ExperienceContext.ts";
import { IExperience } from "./components/interfaces/IExperience";
import { ClickableMapContext } from "./contexts/ClickableMapContext.ts";
import { ChosenLocationContext } from "./contexts/ChosenLocationContext.ts";
import { ILocation } from "./components/interfaces/ILocation.ts";
import { ShowMarkerContext } from "./contexts/ShowMarkerContext.ts";

export const Layout = () => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [visualExperiences, setVisualExperiences] = useState<IExperience[]>([]);
  const [clickable, setClickable] = useState<boolean>(false);
  const [chosenLocation, setChosenLocation] = useState<ILocation | null>(null);
  const [showMarker, setShowMarker] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (experiences.length === 0) {
      initialExperiences();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialExperiences = async () => {
    const experienceList = await getExperiences();
    setExperiences(experienceList);
    setVisualExperiences(experienceList);
    setIsLoading(false);
  };

  return (
    <>
      <ExperienceContext.Provider
        value={{
          experiences,
          setExperiences,
          visualExperiences,
          setVisualExperiences,
        }}
      >
        <Header />
        <main>
          <ClickableMapContext.Provider value={{ clickable, setClickable }}>
            <ChosenLocationContext.Provider
              value={{ chosenLocation, setChosenLocation }}
            >
              <ShowMarkerContext.Provider value={{ showMarker, setShowMarker }}>
                <MainPage isLoading={isLoading} />
                <Outlet />
              </ShowMarkerContext.Provider>
            </ChosenLocationContext.Provider>
          </ClickableMapContext.Provider>
        </main>
      </ExperienceContext.Provider>
      <Footer />
    </>
  );
};
