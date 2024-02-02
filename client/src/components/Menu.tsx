import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExperienceContext } from "../contexts/ExperienceContext";
import AdminMenu from "./AdminMenu";
import MenuLinks from "./MenuLinks";

export default function Menu() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  //const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [showAdminMenu, setShowAdminMenu] = useState<boolean>(false);
  const [hideOnClick, setHideOnClick] = useState<boolean>(false);
  const admin = localStorage.getItem("admin");
  const { experiences } = useContext(ExperienceContext);
  const [unreviewed, setUnreviewed] = useState(
    experiences.filter((experience) => !experience.isReviewed),
  );

  useEffect(() => {
    setUnreviewed(
      experiences.filter((experience) => {
        return experience.isReviewed === false;
      }),
    );
  }, [experiences]);

  // useEffect(() => {
  //   const updateDimension = () => {
  //     setScreenSize(getCurrentDimension());
  //   };
  //   window.addEventListener("resize", updateDimension);

  //   if (screenSize.width > 992) {
  //     setShowMenu(false);
  //   } else {
  //     setShowMenu(true);
  //   }
  // }, [screenSize]);

  // function getCurrentDimension() {
  //   return {
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //   };
  // }

  function closeMenu() {
    // if (screenSize.width < 992) {
    setShowMenu(false);
    setHideOnClick(false);
    // }
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
          setShowMenu(false);
          setHideOnClick(false);
          closeMenu;
        }}
        style={hideOnClick ? { display: "block" } : { display: "none" }}
      ></div>
      <nav
        className="menu"
      >
        <div className="desktop-menu">
        <MenuLinks closeMenu={closeMenu} admin={admin} showAdminMenu={showAdminMenu} setShowAdminMenu={setShowAdminMenu} unreviewed={unreviewed} setHideOnClick={setHideOnClick}/>
        </div>
        <div className={showMenu ? "mobile-menu show" : "mobile-menu"}>
        <MenuLinks closeMenu={closeMenu} admin={admin} showAdminMenu={showAdminMenu} setShowAdminMenu={setShowAdminMenu} unreviewed={unreviewed} setHideOnClick={setHideOnClick}/>
        </div>
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
          showMenu ? setHideOnClick(false) : setHideOnClick(true);
          console.log("click");
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
}
