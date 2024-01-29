import { Link } from "react-router-dom";
import close from "/icons/close.svg";
import ExperienceForm from "./ExperienceForm";
import { useContext, useState } from "react";
import { ClickableMapContext } from "../contexts/ClickableMapContext";
import { ShowMarkerContext } from "../contexts/ShowMarkerContext";

export default function AddExperience() {
  const clickableCont = useContext(ClickableMapContext);
  const clickableMap = clickableCont.clickable;
  const setShowMarker = useContext(ShowMarkerContext).setShowMarker;
  const [showMessage, setShowMessage] = useState(false);
  return (
    <section>
      <div
        className={
          clickableMap
            ? "popup popup-right experience-form p-5 slide"
            : "popup popup-right experience-form p-5"
        }
      >
        <Link to="/" className="close-btn" onClick={() => setShowMarker(false)}>
          <img src={close} alt="close" className="close" />
        </Link>
        <h1>Tipsa om upplevelse</h1>
        { showMessage ? <p className="success-message">Tack för ditt tips! 🙏 Vi tittar på det och går det igenom vår kvalitetssäkring visas det på kartan inom kort.  </p> :
        <>
          <p>
            Har du tips på en upplevelse som du vill dela med dig av? Vi på Äventyrskartan är alltid glada över av att få tips på nya upplevelser. 🤸‍♂️ <br />Skicka in ditt tips så tar vi en titt på det och lägger sedan in det på kartan.
          </p>
          <p>PS... Om du vill dela med dig av inspiration genom dina sociala medier, är du välkommen att lämna en länk till dem. På så sätt kan våra besökare ta del av dina äventyr och upplevelser också!</p>
          <ExperienceForm showMessage={showMessage} setShowMessage={setShowMessage}/>
          </>
        }
      </div>
    </section>
  );
}
