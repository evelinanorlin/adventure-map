//import { useState } from "react";
import { useState } from "react";
import AdventureMap from "./AdvetureMap";
import SearchFieldMap from "./SearchFieldMap";
//import loader from "/icons/loader.gif";

// interface IMainPageProps {
//   isLoading: boolean;
// }

export function MainPage() {
  const [location, setLocation] = useState({
    latitude: 62,
    longitude: 16,
    display_name: "",
    zoom: 5,
  });

  return (
    <>
      {/* <div
        className="loader-container"
        style={isLoading ? { display: "block" } : { display: "none" }}
      >
        <div className="loader">
          <img src={loader} alt="map is loading"></img>
          <p className="bold">Kartan laddas...</p>
        </div>
      </div> */}
      <div className="main-page">
        <SearchFieldMap setLocation={setLocation} />
        <AdventureMap location={location} />
      </div>
    </>
  );
}
