import { useParams } from "react-router-dom";
import { ExperienceContext } from "../contexts/ExperienceContext";
import { useContext } from "react";

export default function AdminReview() {
  const { id } = useParams();
  const experiences = useContext(ExperienceContext).experiences;
  const experience = experiences?.find((experience) => experience._id === id);
  return (
    <section className="admin-review">
      <div className="popup popup-right p-5">
        <h1>{experience?.experienceName}</h1>
      </div>
    </section>
  );
}