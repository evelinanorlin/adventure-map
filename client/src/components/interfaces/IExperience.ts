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
  imageURL: string;
  publicId: string;
  userName: string;
  userLink?: string;
  isReviewed: boolean;
  date?: Date;
}

export interface IExperienceId extends IExperience {
  _id: string;
}
