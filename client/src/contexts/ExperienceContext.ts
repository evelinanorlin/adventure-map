import { createContext } from "react";
import { IExperience } from "../components/interfaces/IExperience";

interface IExperienceContext {
  experiences: IExperience[];
  setExperiences: React.Dispatch<React.SetStateAction<IExperience[]>>;
  visualExperiences: IExperience[];
  setVisualExperiences: React.Dispatch<React.SetStateAction<IExperience[]>>;
}

export const ExperienceContext = createContext<IExperienceContext>(
  {} as IExperienceContext,
);
