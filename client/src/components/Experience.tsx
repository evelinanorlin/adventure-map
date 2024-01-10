import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ExperienceContext } from "../contexts/ExperienceContext";

export default function Experience() {
  const { id } = useParams();
  const experiencesCont = useContext(ExperienceContext);
  const experiences = experiencesCont.experiences;
  const experience = experiences?.find((experience) => experience._id === id);
  console.log(experience);
  return (
    <section className="popup popup-right">
      <h1>{experience?.experienceName}</h1>
    </section>
  );
}