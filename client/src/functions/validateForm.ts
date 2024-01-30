import { IExperience } from "../components/interfaces/IExperience";
import { ILocation } from "../components/interfaces/ILocation";

export const validateTextInput = (experienceName: string) => {
  if (experienceName.length < 2) {
    return false;
  }
  return true;
};

export const validateDropdown = (value: string) => {
  if (
    value === "Välj prisintervall" ||
    value === "Välj Kategori" ||
    value === ""
  ) {
    return false;
  }
  return true;
};

export const validateLocation = (location: ILocation) => {
  console.log(location);
  if (location.latitude === 0 || location.longitude === 0) {
    return false;
  }
  return true;
};

export const validateForm = (experience: IExperience) => {
  if (validateTextInput(experience.experienceName) === false) {
    return false;
  }
  if (validateDropdown(experience.category) === false) {
    return false;
  }
  if (validateDropdown(experience.price) === false) {
    return false;
  }
  if (validateLocation(experience.location) === false) {
    return false;
  }
  if (validateTextInput(experience.description) === false) {
    return false;
  }
  if (validateTextInput(experience.userName) === false) {
    return false;
  }

  return true;
};
