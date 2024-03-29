import {
  deleteExperience,
  updateReviewed,
} from "../services/experinceServices";
import { IExperience } from "../components/interfaces/IExperience";

export const publish = async (
  id: string | undefined,
  experiences: IExperience[],
) => {
  if (!id) return;
  const response = await updateReviewed({
    _id: id,
    isReviewed: true,
  });

  if (response) {
    experiences.map((experience) => {
      if (experience._id === id) {
        experience.isReviewed = true;
      }
      return experience;
    });
    return experiences;
  } else {
    return "error";
  }
};

export const remove = async (
  id: string,
  experience: IExperience,
  experiences: IExperience[],
) => {
  if (!experience) return;
  const response = await deleteExperience(experience);
  if (response) {
    experiences.map((experience) => {
      if (experience._id === id) {
        const index = experiences.indexOf(experience);
        experiences.splice(index, 1);
      }
      return experience;
    });
    return experiences;
  } else {
    return "error";
  }
};

export const newExperienceArr = (
  id: string,
  action: string,
  experiences: IExperience[],
) => {
  console.log(experiences);
  if (action === "remove") {
    experiences = experiences.filter((experience) => {
      return experience._id !== id;
    });
  } else if (action === "add") {
    console.log("tillagd");
  }
  return experiences;
};
