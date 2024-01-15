import axios from "axios";
import { IExperience } from "../components/interfaces/IExperience";

export const getExperiences = async () => {
  const BASE_URL = import.meta.env.VITE_APP_URL;
  const url = `${BASE_URL}experiences`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addExperience = async (experience: IExperience) => {
  const BASE_URL = import.meta.env.VITE_APP_URL;
  const url = `${BASE_URL}experiences/add`;
  try {
    const response = await axios.post(url, experience);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
