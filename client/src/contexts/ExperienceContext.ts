import { createContext } from 'react';
import { IExperienceId } from '../components/interfaces/IExperience';

export const ExperienceContext = createContext<IExperienceId[] | null>(null);