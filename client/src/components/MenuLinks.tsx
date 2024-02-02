import { Link } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import { IExperience } from "./interfaces/IExperience";

interface IMenuLinksProps {
  closeMenu: () => void;
  admin: string | null;
  showAdminMenu: boolean;
  setShowAdminMenu: React.Dispatch<React.SetStateAction<boolean>>;
  unreviewed: IExperience[];
  setHideOnClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuLinks({
  closeMenu,
  admin,
  showAdminMenu,
  setShowAdminMenu,
  unreviewed,
  setHideOnClick,
}: IMenuLinksProps) {
  return (
    <>
      <Link to="/om-aventyrskartan" onClick={closeMenu}>
        Om Äventyrskartan
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
    </>
  );
}
