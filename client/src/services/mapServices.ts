import axios from 'axios';

export const getCityName = async (lat: number, lng: number) => {
  const url = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' +
    lat + '&lon=' + lng;
    
  try {
    const response = await axios.get(url);
    if (response.data && response.data.address && response.data.address.city) {
      return `${ response.data.address.city }, ${ response.data.address.country }`
    } else {
      console.log('City name not found in the response structure.');
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLocationSearchResults = async (searchTerm: string) => {
  const API_KEY = import.meta.env.VITE_MAPTILER_KEY;
  const url = `https://api.maptiler.com/geocoding/${searchTerm}.json?fuzzyMatch=true&limit=3&language=sv&autocomplete=true&key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    if (response.data && response.data.features) {
      return response.data.features;
    } else {
      console.log('No results found.');
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}