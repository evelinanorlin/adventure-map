import {
  deleteExperience,
  updateReviewed,
} from "../services/experinceServices";
import { IExperienceId } from "../components/interfaces/IExperience";

export const publish = async (
  id: string | undefined,
  experiences: IExperienceId[],
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
    return "success";
  } else {
    return "error";
  }
};

export const remove = async (
  id: string | undefined,
  experience: IExperienceId,
  experiences: IExperienceId[],
) => {
  if (!experience) return;
  const response = await deleteExperience({ _id: experience._id });
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

export const newUnreviewedArr = (
  id: string,
  action: string,
  unreviewedExperiences: IExperienceId[],
  experiences: IExperienceId[],
) => {
  let unreviewed: IExperienceId[] = unreviewedExperiences;
  if (action === "remove") {
    unreviewed = unreviewedExperiences.filter((experience) => {
      return experience._id !== id;
    });
  } else if (action === "add") {
    const experience = experiences.find((experience) => experience._id === id);
    if (!experience) return;
    unreviewed = [...unreviewedExperiences, experience];
  }

  return unreviewed;
};
