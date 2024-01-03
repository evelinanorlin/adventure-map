//import { useState } from "react";
import AdventureMap from "./AdvetureMap";
import SearchFieldMap from "./SearchFieldMap";
import WelcomePopup from "./WelcomePopup";

export function MainPage() {
  // const [showPopup, setShowPopup] = useState(true);
  return (
    <div className="main-page">
      <AdventureMap />
      <SearchFieldMap />
      <WelcomePopup />
    </div>
  );
}