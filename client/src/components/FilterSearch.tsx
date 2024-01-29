import { ChangeEvent, useContext, useEffect, useState } from "react";
import { categories } from "../data/categories";
import { ExperienceContext } from "../contexts/ExperienceContext";
import { filterVisualExperiences } from "../functions/filterFunction";

export default function FilterSearch() {
  const [chosenCategories, setChosenCategories] = useState<string[]>([]);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [priceInputChecked, setPriceInputChecked] = useState<boolean>(false);
  const experienceContextData = useContext(ExperienceContext);
  const experiences = experienceContextData.experiences;
  const setVisualExperiences = experienceContextData.setVisualExperiences;

  const categoriesHtml = categories.map((category, index) => {
    if (category === "Välj kategori") return null;

    return (
      <li key={index} tabIndex={index + 1} style={{ cursor: "default" }}>
        <label style={{ cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={chosenCategories.includes(category)}
            onChange={() => updateChosenCategories(category)}
            className="m-r-3"
          />
          {category}
        </label>
      </li>
    );
  });

  // to close the dropdown when clicking outside of it
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const dropdownSelector = document.querySelector(".dropdown-selector");
      const categoryList = document.querySelector(".category-list");

      if (
        (event.target !== dropdownSelector &&
          event.target !== categoryList &&
          !categoryList?.contains(event.target as Node)) ||
        event.target === dropdownSelector
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

  const toggleCategories = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowCategories(!showCategories);
  };

  const updateChosenCategories = (category: string) => {
    console.log("Updating chosen categories:", category);
    const chosenCategoriesUpdated = chosenCategories.includes(category)
      ? chosenCategories.filter((item) => item !== category)
      : [...chosenCategories, category];

    setChosenCategories(chosenCategoriesUpdated);
    const updatedvisualExperiences = filterVisualExperiences(
      chosenCategoriesUpdated,
      priceInputChecked,
      experiences,
    );
    setVisualExperiences(updatedvisualExperiences);
  };

  const filterOnPrice = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    setPriceInputChecked(e.target.checked);
    const visualExperiences = filterVisualExperiences(
      chosenCategories,
      e.target.checked,
      experiences,
    );
    setVisualExperiences(visualExperiences);
  };

  return (
    <>
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
      <label className="row direction-row row-gap-10 m-t-3">
        <input type="checkbox" onChange={filterOnPrice} />
        <p className="strong" style={{ margin: 0 }}>
          Visa bara gratis upplevelser
        </p>
      </label>
    </>
  );
}
