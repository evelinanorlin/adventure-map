import { useContext } from "react";
import { ExperienceContext } from "../contexts/ExperienceContext";
import alert from "/icons/alert.svg";
import check from "/icons/check.svg";
import close from "/icons/close.svg";
import { Link, useNavigate } from "react-router-dom";

export default function AdminList() {
  const experiences = useContext(ExperienceContext).experiences;
  const navigate = useNavigate();

  const listHtml = experiences.map((experience) => {
    return (
        <div className="p-t-5 p-b-5 admin-list-item" key={experience._id}>
          <div className="row direction-row row-gap-z justify-between">
            <h2>{experience.experienceName}</h2>
            <div className="row direction-row row-gap-10 align-items-center" style={{width: "fit-content"}}>
              <img src={experience.isReviewed ? check : alert} alt="approved" />
              <p className="m-b-z">{experience.isReviewed ? "Publicerad" : "Ej granskad"}</p>
            </div>
          </div>
          <p><span className="bold">Inkommen:</span> {experience.date ? experience.date.toDateString() : "inget datum"}</p>
          <p><span className="bold">Kategori:</span> {experience.category}</p>
          <p><span className="bold">Kommentarer:</span> Inga</p>
          <button className="btn btn-secondary" onClick={() => {navigate(`/upplevelser/${experience._id}`)}}>Granska / redigera</button>
        </div>
  )})
  return (
    <section className="admin-list">
      <div className="popup popup-right p-5">
      <Link to="/" className="close-btn">
        <img src={close} alt="close" className="close" />
      </Link>
        <h1>Upplevelser</h1>
        {listHtml}
      </div>
    </section>
  );
}
