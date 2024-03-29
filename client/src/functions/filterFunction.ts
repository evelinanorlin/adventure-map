import { IExperience } from "../components/interfaces/IExperience";

export const filterList = (
  experiences: IExperience[],
  text: string,
  checked: boolean,
) => {
  const searchHits = experiences
    .filter((experience) => {
      return experience.experienceName
        .toLowerCase()
        .includes(text.toLowerCase());
    })
    .filter((experience) => {
      return checked ? !experience.isReviewed : true;
    });
  return searchHits;
};

export const filterVisualExperiences = (
  categories: string[],
  priceChecked: boolean,
  experiences: IExperience[],
) => {
  if (categories.length === 0 && !priceChecked) {
    return experiences;
  } else if (categories.length === 0 && priceChecked) {
    return experiences.filter((experience) => {
      return experience.price.toLocaleLowerCase() === "gratis";
    });
  } else {
    return experiences
      .filter((experience) => {
        return categories.includes(experience.category);
      })
      .filter((experience) => {
        return priceChecked
          ? experience.price.toLocaleLowerCase() === "gratis"
          : true;
      });
  }
};
