import { ChangeEvent, useContext, useEffect, useState } from "react";
import { ExperienceContext } from "../contexts/ExperienceContext";
import alert from "/icons/alert.svg";
import check from "/icons/check.svg";
import close from "/icons/close.svg";
import { Link, useNavigate } from "react-router-dom";
import { IExperienceId } from "./interfaces/IExperience";

export default function AdminList() {
  const experiences = useContext(ExperienceContext).experiences;
  const [visibleExperiences, setVisibleExperiences] = useState<IExperienceId[]>(experiences);
  const navigate = useNavigate();

  useEffect(() => {
    setVisibleExperiences(experiences);
  }, [experiences]);

  const filterExperiences = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.checked) {
      const unreviewed = experiences.filter((experience) => {
        return experience.isReviewed === false;
      });
      console.log(unreviewed)
      setVisibleExperiences(unreviewed);
    } else {
      setVisibleExperiences(experiences.slice().reverse());
    }

  };

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
          <input type="text" />
        </label><br></br>
        <label className="row direction-row align-items-center m-t-3">
          <p className="strong m-z">Visa bara ogranskade upplevelser</p>
          <input type="checkbox" style={{width: "15px"}} onChange={filterExperiences}/>
        </label>
        {listHtml}
      </div>
    </section>
  );
}
