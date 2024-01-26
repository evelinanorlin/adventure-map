import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { MainPage } from "./components/MainPage";
import { getExperiences } from "./services/experinceServices";
import { useCallback, useEffect, useState } from "react";
import { ExperienceContext } from "./contexts/ExperienceContext.ts";
import { IExperienceId } from "./components/interfaces/IExperience";
import { ClickableMapContext } from "./contexts/ClickableMapContext.ts";
import { ChosenLocationContext } from "./contexts/ChosenLocationContext.ts";
import { ILocation } from "./components/interfaces/ILocation.ts";
import { ShowMarkerContext } from "./contexts/ShowMarkerContext.ts";
//import { UnreviewedExperiencesContext } from "./contexts/ReviewedExperiences.ts";

export const Layout = () => {
  const [experiences, setExperiences] = useState<IExperienceId[]>([]);
  const [visualExperiences, setVisualExperiences] = useState<IExperienceId[]>(
    [],
  );
  const [clickable, setClickable] = useState<boolean>(false);
  const [chosenLocation, setChosenLocation] = useState<ILocation | null>(null);
  const [showMarker, setShowMarker] = useState<boolean>(false);
  // const [unreviewedExperiences, setUnreviewedExperiences] = useState<
  //   IExperienceId[]
  // >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setExperiencesCallback = useCallback((newExperiences) => {
    setExperiences(newExperiences);
  }, []);
  
  const setVisualExperiencesCallback = useCallback((newVisualExperiences) => {
    setVisualExperiences(newVisualExperiences);
  }, []);

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
        value={{ experiences, setExperiences: setExperiencesCallback, visualExperiences, setVisualExperiences: setVisualExperiencesCallback }}
      >
          <Header />
          <main>
            <ClickableMapContext.Provider value={{ clickable, setClickable }}>
              <ChosenLocationContext.Provider
                value={{ chosenLocation, setChosenLocation }}
              >
                <ShowMarkerContext.Provider
                  value={{ showMarker, setShowMarker }}
                >
                  <MainPage isLoading={isLoading}/>
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
