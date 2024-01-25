import { ChangeEvent, useContext, useEffect, useState } from "react";
import { ExperienceContext } from "../contexts/ExperienceContext";
import alert from "/icons/alert.svg";
import check from "/icons/check.svg";
import close from "/icons/close.svg";
import { Link, useNavigate } from "react-router-dom";
import { IExperienceId } from "./interfaces/IExperience";
import search from "/icons/search.svg";
import { filterList } from "../functions/filterFunction";

export default function AdminList() {
  const experiences = useContext(ExperienceContext).experiences;
  const [visibleExperiences, setVisibleExperiences] =
    useState<IExperienceId[]>(experiences);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("admin");

  useEffect(() => {
    const sortedExperiences = [...experiences];
    sortedExperiences.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setVisibleExperiences(sortedExperiences);
  }, [experiences]);

  const filterOnReview = (e: ChangeEvent<HTMLInputElement>) => {
    const checked: boolean = e.target.checked;
    setIsChecked(checked);
    const filtered = filterList(experiences, searchText, checked);
    setVisibleExperiences(filtered);
  };

  const filterOnText = (e: ChangeEvent<HTMLInputElement>) => {
    const search: string = e.target.value;
    setSearchText(search);
    const filtered = filterList(experiences, search, isChecked);
    setVisibleExperiences(filtered);
  };

  const listHtml = visibleExperiences.map((experience) => {
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
        {isAdmin ?
        <>
        <h1>Upplevelser</h1>
        <label>
          <p className="bold">Sök upplevelse</p>
          <input
            type="text"
            className="search-field search-field-admin-list"
            onChange={filterOnText}
          />
          <button className="search-btn">
            <img src={search} alt="search" className="search-icon" />
          </button>
        </label>
        <br></br>
        <label className="row direction-row align-items-center m-t-3">
          <p className="strong m-z">Visa bara ogranskade upplevelser</p>
          <input
            type="checkbox"
            style={{ width: "15px" }}
            onChange={filterOnReview}
          />
        </label>
        {listHtml}
        </> : <h1>Du har inte behörighet att visa denna sida</h1>}
      </div>
    </section>
  );
}
