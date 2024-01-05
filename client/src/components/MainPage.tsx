//import { useState } from "react";
import { useState } from "react";
import AdventureMap from "./AdvetureMap";
import SearchFieldMap from "./SearchFieldMap";
import WelcomePopup from "./WelcomePopup";
import { setIsVisited } from "./functions/storage";
//import { getCityName } from "../services/mapServices";


export function MainPage() {
  // Start with a default location
  const [ location, setLocation ] = useState({
    latitude: 62,
    longitude:16,
    display_name: "",
    zoom: 7,
  });
  // get current location
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     getCurrentCityName,
  //   );
  // }, []);
  // // get current city name
  // async function getCurrentCityName(position : GeolocationPosition) {    
  //   const lat = position.coords.latitude;
  //   const lon = position.coords.longitude;
  //   const name = await getCityName(lat, lon);
  //   if(name){
  //     setLocation({ latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //       display_name: name,
  //       zoom: 5, })
  //   }
  // }
  // only show welcome popup once
  const isVisited = localStorage.getItem("isVisited");
  setIsVisited()

  return (
    <div className="main-page">
      {!isVisited ?  <WelcomePopup /> : ""}
      <SearchFieldMap setLocation={ setLocation }/>
      <AdventureMap location = { location } />
    </div>
  );
}
