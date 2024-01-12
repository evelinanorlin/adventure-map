import { Link } from "react-router-dom";
import close from "/icons/close.svg";
import ExperienceForm from "./ExperienceForm";
import { useContext } from "react";
import { ClickableMapContext } from "../contexts/ClickableMapContext";

export default function AddExperience() {
  const clickableCont = useContext(ClickableMapContext);
  const clickableMap = clickableCont.clickable;

  return (
    <section>
      <div
        className={
          clickableMap
            ? "popup popup-right experience-form p-5 slide"
            : "popup popup-right experience-form p-5"
        }
      >
        <Link to="/" className="close-btn">
          <img src={close} alt="close" className="close" />
        </Link>
        <h1>Tipsa om upplevelse</h1>
        <p>
          Hipster ipsum tattooed brunch I'm baby. Intelligentsia vaporware
          pour-over bushwick kickstarter post-ironic taiyaki affogato. Mood
          polaroid poutine keytar adaptogen they. Cornhole trust authentic green
          chambray flannel beer small fashion artisan. Live-edge irony cardigan
          tilde slow-carb yolo heard cleanse.
        </p>
        <ExperienceForm />
      </div>
    </section>
  );
}
