import { createContext } from "react";

interface IClickableMapContext {
  clickable: boolean;
  setClickable: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ClickableMapContext = createContext<IClickableMapContext>(
  {} as IClickableMapContext,
);
