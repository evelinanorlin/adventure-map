import { Link } from "react-router-dom";

import close from "/icons/close.svg";
import outdoors from "/outdoor.jpeg";

export default function About() {
  return (
    <section className="popup about-popup">
      <Link to="/" className="close-btn">
        <img src={close} alt="close" className="close" />
      </Link>
      <div className="flex">
        <div className="img-div">
          <img
            src={outdoors}
            alt="Två personer utanför ett tält i solnedgången"
            className="adventurer"
            height="300"
            width="100"
          />
        </div>
        <div className="content-container">
          <div className="content">
            <h1>Om Äventyrskartan</h1>
            <p>
              Äventyrskartan är verktyget för alla äventyrsentusiaster. Appen är
              en interaktiv karta där du enkelt kan hitta och dela spännande
              utomhusaktiviteter. Oavsett om du letar efter klättring, cykling
              eller bara mysiga promenader, kan Äventyrskartan hjälpa dig. Den
              smidiga designen gör navigeringen till en lek, och varje aktivitet
              är tydligt markerad för att enkelt hitta det du söker.
            </p>
            <p>
              Men det är inte bara en karta – det är en social plattform där du
              kan dela dina egna tips och inspireras av andras upplevelser. Så,
              låt Äventyrskartan vara din guide till en värld av spännande
              utomhusäventyr! ⛰️ 🥾
            </p>
            <p>
              Äventyrskartan är utvecklad av{" "}
              <a href="https://evelinanorlin.com" target="_blank">
                Evelina Norlin
              </a>
              , som ett examensarbete inom YH-utbildningen Front-end developer.
              Är du intresserad av koden hittar du github-repo{" "}
              <a
                href="https://github.com/evelinanorlin/adventure-map"
                target="_blank"
              >
                här
              </a>
              .
            </p>
            <button className="btn btn-primary m-r-5">
              <Link to="/">Utforska</Link>
            </button>
            <button className="btn btn-tertiary">
              <Link to="/lagg-till-upplevelse">Tipsa om upplevelse</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
