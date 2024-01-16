import axios from "axios";

export const getLocationSearchResults = async (searchTerm: string) => {
  const API_KEY = import.meta.env.VITE_MAPTILER_KEY;
  const url = `https://api.maptiler.com/geocoding/${searchTerm}.json?fuzzyMatch=true&limit=3&language=sv&autocomplete=true&key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    if (response.data && response.data.features) {
      return response.data.features;
    } else {
      console.log("No results found.");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLocationName = async (lng: number, lat: number) => {
  const API_KEY = import.meta.env.VITE_MAPTILER_KEY;
  const url = `https://api.maptiler.com/geocoding/${lng},${lat}.json?limit=1&language=sv&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data && response.data.features) {
      return response.data.features;
    } else {
      console.log("No results found.");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
