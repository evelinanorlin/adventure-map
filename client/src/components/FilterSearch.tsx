import { useState } from "react";

export default function FilterSearch() {
  const [chosenCategories, setChosenCategories] = useState<string[]>(["Välj kategori"]);
  const catgoriesHtml = chosenCategories.map((category) => {return `${category}`});
  const [showCategories, setShowCategories] = useState<boolean>(false);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  }

  return(
    <div className="select-category">
      <div>
      <button className="btn btn-form" onClick={toggleCategories}>{catgoriesHtml}</button>
      </div>
      <ul style={{display: showCategories ? 'block' : 'none'}}>
        <li><button>Vandra</button></li>
        <li><button>Vandra</button></li>
        <li><button>Vandra</button></li>
        <li><button>Vandra</button></li>
      </ul>
    </div>
  )
}