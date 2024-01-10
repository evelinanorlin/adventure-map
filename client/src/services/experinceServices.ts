import axios from 'axios';
import { IExperience } from '../components/interfaces/IExperience';

export const getExperiences = async () => {
  const url = 'http://localhost:3000/experiences';
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const addExperience = async (experience: IExperience) => {
  const url = 'http://localhost:3000/experiences/add';
  try {
    const response = await axios.post(url, experience);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}