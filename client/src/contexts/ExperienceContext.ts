import { createContext } from 'react';
import { IExperienceId } from '../components/interfaces/IExperience';

interface IExperienceContext {
  experiences: IExperienceId[],
  visualExperiences: IExperienceId[],
  setVisualExperiences: React.Dispatch<React.SetStateAction<IExperienceId[]>>,
}

export const ExperienceContext = createContext<IExperienceContext>({} as IExperienceContext);