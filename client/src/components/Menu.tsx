import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExperienceContext } from "../contexts/ExperienceContext";
import AdminMenu from "./AdminMenu";

export default function Menu() {
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [showAdminMenu, setShowAdminMenu] = useState<boolean>(false);
  const [hideOnClick, setHideOnClick] = useState<boolean>(false);
  const admin = localStorage.getItem("admin");
  const { experiences } = useContext(ExperienceContext);
  const [unreviewed, setUnreviewed] = useState(
    experiences.filter((experience) => {
      return experience.isReviewed === false;
    }),
  );

  useEffect(() => {
    console.log("runs");
    setUnreviewed(
      experiences.filter((experience) => {
        return experience.isReviewed === false;
      }),
    );
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

  function closeMenu() {
    if (screenSize.width < 992) {
      setShowMenu(false);
      setHideOnClick(false);
    }
  }

  const logOut = () => {
    localStorage.removeItem("admin");
    setShowAdminMenu(false);
    window.location.reload();
  };

  return (
    <>
      <div
        className="hide-on-click"
        onClick={() => {
          setShowAdminMenu(false);
          setHideOnClick(false);
          closeMenu;
        }}
        style={hideOnClick ? { display: "block" } : { display: "none" }}
      ></div>
      <nav
        className="menu"
        style={showMenu ? { display: "flex" } : { display: "none" }}
      >
        <Link to="/" onClick={closeMenu}>
          Utforska
        </Link>
        <Link to="/om-aventyrskartan" onClick={closeMenu}>
          Om upplevelseskartan
        </Link>
        <Link
          to="/lagg-till-upplevelse"
          className="btn btn-primary"
          onClick={closeMenu}
        >
          Tipsa om upplevelse
        </Link>
        {admin ? (
          <AdminMenu
            setShowAdminMenu={setShowAdminMenu}
            showAdminMenu={showAdminMenu}
            unreviewedExperiences={unreviewed}
            setHideOnClick={setHideOnClick}
          />
        ) : null}
      </nav>
      {admin ? (
        <AdminMenu
          setShowAdminMenu={setShowAdminMenu}
          showAdminMenu={showAdminMenu}
          unreviewedExperiences={unreviewed}
          className={"admin-tablet"}
          setHideOnClick={setHideOnClick}
        />
      ) : null}
      <div
        className="admin-menu-container p-4 bg-white"
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
      <div
        className="burger"
        onClick={() => {
          setShowMenu(!showMenu);
          setHideOnClick(!hideOnClick);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
}
