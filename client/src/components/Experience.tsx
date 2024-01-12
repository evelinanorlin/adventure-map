import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ExperienceContext } from "../contexts/ExperienceContext";
import DOMPurify from "dompurify";
import close from "/icons/close.svg";

export default function Experience() {
  const { id } = useParams();
  const experiencesCont = useContext(ExperienceContext);
  const experiences = experiencesCont.experiences;
  const experience = experiences?.find((experience) => experience._id === id);

  if (experience) {
    const cleanDescription = {
      __html: DOMPurify.sanitize(experience.description),
    };
    return (
      <section className="popup popup-right p-t-5">
        <div className="content-standard">
          <Link to="/" className="close-btn">
            <img src={close} alt="close" className="close" />
          </Link>
          <h1 className="align-center">{experience.experienceName}</h1>
          {experience.imageURL && experience.imageURL.length > 0 ? (
            <img
              src={experience?.imageURL}
              alt={experience?.experienceName}
              className="m-b-5"
            />
          ) : null}
          <div dangerouslySetInnerHTML={cleanDescription}></div>
          <p>
            <span className="bold">Pris:</span> {experience.price}
          </p>
          {experience.link && experience.link.length > 0 ? (
            <p>
              <span className="bold">Läs mer här:</span>{" "}
              <a href={experience.link} target="_blank" rel="noreferrer">
                {experience.link}
              </a>
            </p>
          ) : null}
          <p>
            <span className="bold">Plats:</span>{" "}
            {experience.location.display_name}
          </p>
          <p>
            <span className="bold">Tipsare:</span>{" "}
            {experience.userLink ? (
              <a href={experience.userLink} target="_blank">
                {experience.userName}
              </a>
            ) : (
              experience.userName
            )}
          </p>
        </div>
      </section>
    );
  } else {
    return <h1>Experience not found</h1>;
  }
}
