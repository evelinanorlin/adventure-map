import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ExperienceContext } from "../contexts/ExperienceContext";
import DOMPurify from 'dompurify';

export default function Experience() {
  const { id } = useParams();
  const experiencesCont = useContext(ExperienceContext);
  const experiences = experiencesCont.experiences;
  const experience = experiences?.find((experience) => experience._id === id);
  
  if (experience) {
    const cleanDescription = { __html: DOMPurify.sanitize(experience.description) };
      return (
      <section className="popup popup-right">
        <h1>{experience.experienceName}</h1>
        {experience.imageURL && experience.imageURL.length > 0 ? <img src={experience?.imageURL} alt={experience?.experienceName} /> : null}
        <div dangerouslySetInnerHTML={cleanDescription}></div>
        <p><span className="bold">Pris:</span> {experience.price}</p>
        {experience.link && experience.link.length > 0 ? <p><span className="bold">Läs mer här:</span> <a href={experience.link} target="_blank" rel="noreferrer">{experience.link}</a></p> : null}
        <p><span className="bold">Plats:</span> {experience.location.display_name}</p>
        <p><span className="bold">Tipsare:</span>{experience.userLink ? <a href={experience.userLink} target="_blank">{experience.userName}</a> : experience.userName}</p>
      </section>
      )
    } else {
      return <h1>Experience not found</h1>
    } 
  }