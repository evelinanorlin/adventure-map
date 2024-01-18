import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adminMenu from "/icons/adminMenu.svg";
import { ExperienceContext } from "../contexts/ExperienceContext";
import { UnreviewedExperiencesContext } from "../contexts/ReviewedExperiences";

export default function Menu() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [showAdminMenu, setShowAdminMenu] = useState<boolean>(false);
  const admin = localStorage.getItem("admin");
  const experiences = useContext(ExperienceContext).experiences;
  const unreviewedExperiences = useContext(
    UnreviewedExperiencesContext,
  ).unreviewedExperiences;
  const setUnreviewedExperiences = useContext(
    UnreviewedExperiencesContext,
  ).setUnreviewedExperiences;

  useEffect(() => {
    if (experiences.length > 0) {
      const unreviewed = experiences.filter((experience) => {
        return experience.isReviewed === false;
      });
      setUnreviewedExperiences(unreviewed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experiences]);

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
      if (screenSize.width > 992) {
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }
    };
  }, [screenSize]);

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  const logOut = () => {
    localStorage.removeItem("admin");
    setShowAdminMenu(false);
    window.location.reload();
  };

  return (
    <>
      <nav
        className="menu"
        style={showMenu ? { display: "flex" } : { display: "none" }}
      >
        <Link to="/">Utforska</Link>
        <Link to="/om-aventyrskartan">Om upplevelseskartan</Link>
        <Link to="/contact">Kontakt</Link>
        <Link to="/lagg-till-upplevelse" className="btn btn-primary">
          Tipsa om upplevelse
        </Link>
        {admin ? (
          <div className="admin-menu-container">
            <button>
              <img
                src={adminMenu}
                alt="admin menu"
                className="admin-menu"
                onClick={() => setShowAdminMenu(!showAdminMenu)}
              />
            </button>
            <div
              className="admin-alerts"
              style={
                unreviewedExperiences.length > 0
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <p>{unreviewedExperiences.length}</p>
            </div>
          </div>
        ) : null}
      </nav>
      <div
        className="admin-menu-container p-4 bg-beige"
        style={showAdminMenu ? { display: "flex" } : { display: "none" }}
      >
        <Link to="/upplevelser-lista" onClick={() => setShowAdminMenu(false)}>
          Alla upplevelser
        </Link>
        <Link to="/">
          <button className="btn btn-secondary" onClick={logOut}>
            Logga ut
          </button>
        </Link>
      </div>
      <div className="burger" onClick={() => setShowMenu(!showMenu)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
}
