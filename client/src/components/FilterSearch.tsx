import { useContext, useEffect, useState } from "react";
import { categories } from "../data/categories";
import { ExperienceContext } from "../contexts/ExperienceContext";
import { IExperienceId } from "./interfaces/IExperience";

export default function FilterSearch() {
  const [chosenCategories, setChosenCategories] = useState<string[]>([]);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const experienceContextData = useContext(ExperienceContext);
  const visualExperiences = experienceContextData.visualExperiences;
  const setVisualExperiences = experienceContextData.setVisualExperiences;

  const categoriesHtml = categories.map((category, index) => {
    if(category === "Välj kategori") return null;

    return(
      <li onClick={() => updateChosenCategories(category)} key={index} tabIndex={index + 1}>
        <label onClick={() => updateChosenCategories(category)}>
          <input
            type="checkbox"
            checked={chosenCategories.includes(category)}
            onChange={() => updateChosenCategories(category)}
          />{category}
          </label>
      </li>
    )
  });

  // to close the dropdown when clicking outside of it
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const dropdownSelector = document.querySelector(".dropdown-selector");
      const categoryList = document.querySelector(".category-list");

      if (
        event.target !== dropdownSelector &&
        event.target !== categoryList &&
        !categoryList?.contains(event.target as Node)
      ) {
        setShowCategories(false);
      } else {
        setShowCategories(true);
      }
    };

    document.addEventListener("click", handler);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const updateChosenCategories = (category: string) => {
    if (chosenCategories.includes(category)) {
      const chosenCategoriesUpdated = chosenCategories.filter((item) => item !== category);
      setChosenCategories(chosenCategoriesUpdated);
      if(chosenCategoriesUpdated.length > 0) {
        const visualExperiencesUpdated = visualExperiences.filter((experience) => experience.category !== category);
        setVisualExperiences(visualExperiencesUpdated);
      } else {
        setVisualExperiences(experienceContextData.experiences);
      }
    } else {
      const chosenCategoriesUpdated = [...chosenCategories, category]
      setChosenCategories(chosenCategoriesUpdated);
      let visualExperiencesUpdated: IExperienceId[] = [];
      chosenCategoriesUpdated.map((category) => {
        const chosenCategoryExperience = experienceContextData.experiences.filter((experience) => experience.category === category);
        visualExperiencesUpdated=[...visualExperiencesUpdated, ...chosenCategoryExperience]
      })
      setVisualExperiences(visualExperiencesUpdated);
    }
  };

  return (
    <div className="select-category">
      <div>
        <button
          className="dropdown-selector"
          onClick={toggleCategories}
          tabIndex={0}
        >
          {chosenCategories.length > 0
            ? chosenCategories.join(", ")
            : "Välj kategori"}
        </button>
      </div>
      <ul
        className="category-list"
        style={{ display: showCategories ? "block" : "none" }}
      >
        {categoriesHtml}
      </ul>
    </div>
  );
}
