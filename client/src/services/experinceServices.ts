import axios from "axios";
import { IExperience } from "../components/interfaces/IExperience";

const BASE_URL = import.meta.env.VITE_APP_URL;

export const getExperiences = async () => {
  const url = `${BASE_URL}experiences`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addExperience = async (experience: IExperience) => {
  const url = `${BASE_URL}experiences/add`;
  try {
    const response = await axios.post(url, experience);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateReviewed = async (update: {
  _id: string;
  isReviewed: boolean;
}) => {
  const BASE_URL = import.meta.env.VITE_APP_URL;
  const url = `${BASE_URL}experiences/update`;
  try {
    const response = await axios.put(url, update);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteExperience = async (_id: { _id: string }) => {
  const url = `${BASE_URL}experiences/delete`;
  try {
    const response = await axios.delete(url, {
      data: _id,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
