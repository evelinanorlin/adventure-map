import { useEffect, useState } from "react";
import chevronDown from "./icons/chevronDown.svg";

export default function FilterSearch() {
  const [chosenCategories, setChosenCategories] = useState<string[]>([]);
  const [showCategories, setShowCategories] = useState<boolean>(false);

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
    } else {
      setChosenCategories([...chosenCategories, category]);
    }
  };

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
        <li onClick={() => handleLiClick("Vandra")} tabIndex={1}>
          <label>
            <input
              type="checkbox"
              checked={chosenCategories.includes("Vandra")}
              onChange={() => updateChosenCategories("Vandra")}
            />
            Vandra
          </label>
        </li>
        <li onClick={() => handleLiClick("Paddla")} tabIndex={2}>
          <label>
            <input
              type="checkbox"
              checked={chosenCategories.includes("Paddla")}
              onChange={() => updateChosenCategories("Paddla")}
            />
            Paddla
          </label>
        </li>
      </ul>
    </div>
  );
}
