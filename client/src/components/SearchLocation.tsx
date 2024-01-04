import { ChangeEvent, useState } from "react";

export interface SearchLocationProps {
  setLocation: React.Dispatch<React.SetStateAction<{
    latitude: number;
    longitude: number;
    display_name: string;
  }>>;
}

export default function SearchLocation({setLocation}: SearchLocationProps) {
  // console.log(props)

  const [ city, setCity ] = useState<string>();
  const API_KEY = import.meta.env.VITE_MAPTILER_KEY;

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    if(event.target.value.length > 2){
      setCity(event.target.value);
      console.log(city)
      if (city){
        submitHandler(city)
      }
    }

    setLocation(
      {latitude: 10,
      longitude: 10,
      display_name: "",}
)
  };

  function submitHandler(city:string) {
    const url = `https://api.maptiler.com/geocoding/${city}.json?fuzzyMatch=true&limit=10&language=sv&autocomplete=true&key=${API_KEY}`;
   
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
          console.log(data)
        //   setLocation({
        //   latitude: data[0].lat,
        //   longitude: data[0].lon,
        //   display_name: data[0].display_name,
        // })
      }).catch(() => console.log("Please Check your input"));
  }

  return (
    <div className="search-location">
       <input className="search-field" type="text" placeholder="Search for a city" onChange={handleChange} />
    </div>
  );
}