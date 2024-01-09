import { ILocation } from "./ILocation";

export interface Image {
  preview: string;
  data: File | undefined;
}

export interface IExperience {
  experienceName: string;
  location: ILocation;
  link?: string;
  price: string;
  category: string;
  description: string;
  image?: Image;
  userName: string;
  userLink?: string;
}