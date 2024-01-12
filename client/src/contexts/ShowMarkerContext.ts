import { createContext } from "react";

interface IShowMarkerContext {
  showMarker: boolean;
  setShowMarker: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShowMarkerContext = createContext<IShowMarkerContext>(
  {} as IShowMarkerContext,
);
