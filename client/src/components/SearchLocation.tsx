import { ChangeEvent, useState } from "react";

export interface SearchLocationProps {
  setLocation: React.Dispatch<React.SetStateAction<{
    latitude: number;
    longitude: number;
    display_name: string;
  }>>;
}

export default function SearchLocation({setLocation}: SearchLocationProps) {

  const [ searchValue, setSearchValue ] = useState<string>();
  const API_KEY = import.meta.env.VITE_MAPTILER_KEY;
  //let places: string[] = [];
  const [places, setPlaces] = useState<string[]>([]);

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    if(event.target.value.length > 2){
      setSearchValue(event.target.value);
      console.log(searchValue)
      if (searchValue){
        submitHandler(searchValue)
      }
    } else {
      setPlaces([]);
    }

    setLocation(
      {latitude: 10,
      longitude: 10,
      display_name: "",}
)
  };

  function submitHandler(searchValue:string) {
    const url = `https://api.maptiler.com/geocoding/${searchValue}.json?fuzzyMatch=true&limit=3&language=sv&autocomplete=true&key=${API_KEY}`;
   
    fetch(url, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        if (response.ok) {                  
          return response.json();
        }
      })
      .then((data) => {
          console.log(data);
          const placesArr = (data.features.map((place: {place_name_sv: string}) => place.place_name_sv))
          setPlaces(placesArr);
          console.log(places)
        //   setLocation({
        //   latitude: data[0].lat,
        //   longitude: data[0].lon,
        //   display_name: data[0].display_name,
        // })
      }).catch(() => console.log("Please Check your input"));
  }

  return (
    <div className="search-location">
       <input className="search-field" type="text" placeholder="Search for a city" onChange={handleChange} list="locations"/>
       <datalist className="location-list bg-white p-l-z" id="locations">
          {places.map((place, index) => (
            <option key={index} value={place} />
          ))}
       </datalist>
    </div>
  );
}