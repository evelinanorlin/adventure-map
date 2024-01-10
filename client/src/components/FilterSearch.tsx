import { useContext, useEffect, useState } from "react";
import { categories } from "../data/categories";
import { ExperienceContext } from "../contexts/ExperienceContext";

export default function FilterSearch() {
  const [chosenCategories, setChosenCategories] = useState<string[]>([]);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const experienteContextData = useContext(ExperienceContext);

  const categoriesHtml = categories.map((category, index) => {
    if(category === "Välj kategori") return null;

    return(
      <li onClick={() => handleLiClick(category)} key={index} tabIndex={index + 1}>
        <label>
          <input
            type="checkbox"
            checked={chosenCategories.includes(category)}
            onChange={() => updateChosenCategories(category)}
          />
          {category}
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
      setChosenCategories(chosenCategories.filter((item) => item !== category));
      filterFunction(chosenCategories.filter((item) => item !== category));
    } else {
      setChosenCategories([...chosenCategories, category]);
      filterFunction([...chosenCategories, category])
    }
  };

  const filterFunction = (categories: string[]) => {
    console.log(categories)
    // if(categories.length === 0) {
    //   experienteContextData.setExperiences(experienteContextData.experiences);
    //   return;
    // }
    // categories.map(category => {
    //   const filteredExperiences = experienteContextData.experiences.filter(experience => experience.category === category);
    //   experienteContextData.setExperiences(filteredExperiences);
    // })
  }

  const handleLiClick = (category: string) => {
    updateChosenCategories(category);
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
