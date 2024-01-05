import { useState } from "react";
import { getLocationSearchResults } from "../services/mapServices";
import searchBtn from "./icons/search.svg";

export interface SearchLocationProps {
  setLocation: React.Dispatch<React.SetStateAction<{
    latitude: number;
    longitude: number;
    display_name: string;
    zoom: number;
  }>>;
}

export default function SearchLocation({setLocation}: SearchLocationProps) {
  const [ searchValue, setSearchValue ] = useState<string>("");
  const [places, setPlaces] = useState<string[]>([]);
  // search for location when user types
  const handleChange = (searchValue: string) => {
    setSearchValue(searchValue);

      if (searchValue.length > 2){
        submitHandler(searchValue)
      }
    else {
      setPlaces([]);
    }
  };

  async function submitHandler(searchValue:string) {
    const placesFeatures = await getLocationSearchResults(searchValue);
    const placesList = placesFeatures.map((place: {place_name_sv: string}) => place.place_name_sv);
    setPlaces(placesList);
  }

  function clickedSuggestion(place: string) {
    setSearchValue(place);
    changeLocation(place);
  }

  async function changeLocation(searchValue:string) {
    const places = await getLocationSearchResults(searchValue);
    if (places.length > 0) {
      setLocation(
        {latitude: places[0].geometry.coordinates[1],
        longitude: places[0].geometry.coordinates[0],
        display_name: places[0].place_name_sv,
        zoom: 10,}
      )
      setPlaces([]);
    } else {
      alert("Platsen finns inte")
    }

  }

  return (
    <div className="search-location">
        <input className="search-field" type="text" placeholder="Sök plats" value={searchValue} onChange={e => {handleChange(e.target.value);}} onKeyDown={e => e.key === 'Enter' ? changeLocation(searchValue):''}/>
        <button className="search-place-btn" aria-label="sök" onClick={() => changeLocation(searchValue)}><img src={searchBtn} alt="ett förstoringsglas"></img></button>
        <ul className="location-list bg-white p-l-z" id="locations" style={{display: places.length > 0 ? 'block' : 'none'}}>
        {places.map((place, index) => {
          const [firstPart, secondPart] = place.split(", ");
          return (
            <li key={index} onClick={() => clickedSuggestion(place)}>
              <span className="bold">{firstPart}</span>, {secondPart}
            </li>
          );
        })}
        </ul>
    </div>
  );
}