//import { useState } from "react";
import { useEffect, useState } from "react";
import AdventureMap from "./AdvetureMap";
import SearchFieldMap from "./SearchFieldMap";
import WelcomePopup from "./WelcomePopup";
import { setIsVisited } from "./functions/storage";


export function MainPage() {
  const [ location, setLocation ] = useState({
    latitude: 0,
    longitude:0,
    display_name: "",
  });

  // const API_KEY = import.meta.env.VITE_MAPTILER_KEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      getCurrentCityName,
    );
  }, []);

  useEffect(() => {
    console.log(location)
  }, [location]);

  function getCurrentCityName(position : GeolocationPosition) {      
   
    const url = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='
    + position.coords.latitude + '&lon='  
    + position.coords.longitude ;
   
    fetch(url, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {     
        setLocation({ latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          display_name:`${ data.address.city }, ${ data.address.country }` })         
      });
    }

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
