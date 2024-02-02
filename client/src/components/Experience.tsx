import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import close from "/icons/close.svg";
import goback from "/icons/goback.svg";
import { ExperienceContext } from "../contexts/ExperienceContext";
import ConfirmationPopup from "./ConfirmationPopup";
import { publish, remove } from "../functions/handleExperiences";
import { IExperience } from "./interfaces/IExperience";

export default function Experience() {
  const { id } = useParams();
  const { experiences, setExperiences } = useContext(ExperienceContext);
  const experience = experiences?.find((exp) => exp._id === id);
  const isAdmin = localStorage.getItem("admin");
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean | null>(false);
  const [action, setAction] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (confirmed) {
      if (action === "publicera") {
        publishExp();
      } else if (action === "ta bort") {
        removeExp();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmed]);

  const removeExp = async () => {
    if (!experience || id === undefined) return;

    const response = await remove(id, experience, experiences);

    if (response !== "error") {
      if (response === undefined) return;
      const newExperienceArr: IExperience[] = response;

      setExperiences([...newExperienceArr]);

      navigate("/upplevelser-lista");
    } else {
      console.log("error");
    }
  };

  const publishExp = async () => {
    const response = await publish(id, experiences);

    if (response !== "error") {
      if (response === undefined) return;

      const newExperienceArr: IExperience[] = response;

      setExperiences([...newExperienceArr]);

      navigate("/upplevelser-lista");
    } else {
      console.log("error");
    }
  };

  // make sure no sketchy html is injected
  if (experience) {
    const cleanDescription = {
      __html: DOMPurify.sanitize(experience.description),
    };

    return (
      <section className="popup popup-right">
        <div>
          <Link to="/" className="close-btn">
            <img src={close} alt="close" className="close" />
          </Link>
          {isAdmin ? (
            <Link to="/upplevelser-lista" className="back-btn">
              <img src={goback} alt="go back to list" className="go-back" />
            </Link>
          ) : (
            ""
          )}
          <h1 className="m-t-5">{experience.experienceName}</h1>
          {experience.imageURL && experience.imageURL.length > 0 ? (
            <img
              src={experience?.imageURL}
              alt={experience?.experienceName}
              className="m-b-5 exp-img"
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
          {isAdmin ? (
            <div className="m-t-5">
              {experience.isReviewed ? (
                ""
              ) : (
                <button
                  className="btn btn-primary m-r-5 "
                  onClick={() => {
                    setAction("publicera");
                    setShowConfirmation(true);
                  }}
                >
                  Publicera
                </button>
              )}
              <button
                className="btn btn-tertiary btn-remove"
                onClick={() => {
                  setAction("ta bort");
                  setShowConfirmation(true);
                }}
              >
                Ta bort
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        {showConfirmation ? (
          <ConfirmationPopup
            experience={experience.experienceName}
            action={action}
            setConfirmed={setConfirmed}
            setShowConfirmation={setShowConfirmation}
          />
        ) : (
          ""
        )}
      </section>
    );
  } else {
    return <h1>Experience not found</h1>;
  }
}
