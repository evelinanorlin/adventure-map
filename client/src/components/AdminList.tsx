import { ChangeEvent, useContext, useEffect, useState } from "react";
import { ExperienceContext } from "../contexts/ExperienceContext";
import alert from "/icons/alert.svg";
import check from "/icons/check.svg";
import close from "/icons/close.svg";
import { Link, useNavigate } from "react-router-dom";
import { IExperienceId } from "./interfaces/IExperience";
import search from "/icons/search.svg";

export default function AdminList() {
  const experiences = useContext(ExperienceContext).experiences;
  const [visibleExperiences, setVisibleExperiences] = useState<IExperienceId[]>(experiences);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    setVisibleExperiences(experiences);
  }, [experiences]);

  const filterOnReview = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
      setIsChecked(checked);

      const filtered = experiences.filter((experience) => {
        return checked ? !experience.isReviewed : true;
      }).filter((experience) => {
        return experience.experienceName.toLowerCase().includes(searchText.toLowerCase());
      });

      setVisibleExperiences(filtered);
  };

  const filterOnText = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    //console.log(isChecked)
    const searchHits = experiences.filter((experience) => {
        return experience.experienceName.toLowerCase().includes(e.target.value.toLowerCase());
      }).filter((experience) => {
        return isChecked ? !experience.isReviewed : true;
      })
      // if (isChecked){
      //   const filtered = searchHits.filter((experience) => {
      //     return experience.isReviewed === !isChecked;
      //   });
      //   setVisibleExperiences(filtered);
      //   return;
      // }
      setVisibleExperiences(searchHits);
  }


  const listHtml =  visibleExperiences.map((experience) => {
    return (
      <div className="p-t-5 p-b-5 admin-list-item" key={experience._id}>
        <div className="row direction-row row-gap-z justify-between">
          <h2>{experience.experienceName}</h2>
          <div
            className="row direction-row row-gap-10 align-items-center"
            style={{ width: "fit-content" }}
          >
            <img src={experience.isReviewed ? check : alert} alt="approved" />
            <p className="m-b-z">
              {experience.isReviewed ? "Publicerad" : "Ej granskad"}
            </p>
          </div>
        </div>
        <p>
          <span className="bold">Kategori:</span> {experience.category}
        </p>
        <p>
          <span className="bold">Kommentarer:</span> Inga
        </p>
        <button
          className="btn btn-secondary"
          onClick={() => {
            navigate(`/upplevelser/${experience._id}`);
          }}
        >
          Granska / redigera
        </button>
      </div>
    );
  });

  return (
    <section className="admin-list">
      <div className="popup popup-right p-5">
        <Link to="/" className="close-btn">
          <img src={close} alt="close" className="close" />
        </Link>
        <h1>Upplevelser</h1>
        <label>
          <p className="bold">Sök upplevelse</p>
          <input type="text" className="search-field" onChange={filterOnText}/>
          <button className="search-btn"><img src={search} alt="search" className="search-icon"/></button>
        </label><br></br>
        <label className="row direction-row align-items-center m-t-3">
          <p className="strong m-z">Visa bara ogranskade upplevelser</p>
          <input type="checkbox" style={{width: "15px"}} onChange={filterOnReview}/>
        </label>
        {listHtml}
      </div>
    </section>
  );
}
