import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ExperienceContext } from "../contexts/ExperienceContext";
import DOMPurify from "dompurify";
import close from "/icons/close.svg";
import ConfirmationPopup from "./ConfirmationPopup";
import {
  publish,
  remove,
} from "../functions/handleExperiences";
import { IExperience } from "./interfaces/IExperience";

export default function Experience() {
  const { id } = useParams();
  const {experiences, setExperiences} = useContext(ExperienceContext);
  const experience = experiences?.find((experience) => experience._id === id);
  const isAdmin = localStorage.getItem("admin");
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean | null>(false);
  const [action, setAction] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Experience component rendered');
  }, [experiences]);

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

    if(response !== "error") {

      if (response === undefined) return;

      const newExperienceArr: IExperience[] = response;
      console.log(newExperienceArr)

      setExperiences(prevExperiences => [...prevExperiences, ...newExperienceArr]);

     navigate("/upplevelser-lista");
  }
}

  const publishExp = async () => {
    const response = await publish(id, experiences);
    console.log(response);
    if (response !== "error") {
      response ? setExperiences(response) : console.log("something went wrong");
      setShowConfirmation(false);
      navigate("/upplevelser-lista");
    } else {
      console.log("error");
    }
  };

  if (experience) {
    const cleanDescription = {
      __html: DOMPurify.sanitize(experience.description),
    };

    return (
      <section className="popup popup-right p-t-4">
        <div>
          <Link to="/" className="close-btn">
            <img src={close} alt="close" className="close" />
          </Link>
          <h1>{experience.experienceName}</h1>
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
          {isAdmin ? (
            <div>
              {experience.isReviewed ? (
                ""
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setAction("publicera");
                    setShowConfirmation(true);
                  }}
                >
                  Publicera
                </button>
              )}
              <button
                className="m-l-5 btn"
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

