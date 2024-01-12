import { createContext } from "react";
import { ILocation } from "../components/interfaces/ILocation";

interface IChosenLocationContext {
  chosenLocation: ILocation | null;
  setChosenLocation: React.Dispatch<React.SetStateAction<ILocation | null>>;
}

export const ChosenLocationContext = createContext<IChosenLocationContext>(
  {} as IChosenLocationContext,
);
