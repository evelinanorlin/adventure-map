//import { useState } from "react";
import { useState } from "react";
import AdventureMap from "./AdvetureMap";
import SearchFieldMap from "./SearchFieldMap";

export function MainPage() {
  // Start with a default location
  const [location, setLocation] = useState({
    latitude: 62,
    longitude: 16,
    display_name: "",
    zoom: 5,
  });

  return (
    <div className="main-page">
      <SearchFieldMap setLocation={setLocation} />
      <AdventureMap location={location} />
    </div>
  );
}
