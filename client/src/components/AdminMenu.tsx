import { IExperience } from "./interfaces/IExperience";
import adminMenu from "/icons/adminMenu.svg";

interface IAdminMenuProps {
  setShowAdminMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showAdminMenu: boolean;
  unreviewedExperiences: IExperience[];
  className?: string;
  setHideOnClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminMenu({setShowAdminMenu, showAdminMenu, unreviewedExperiences, className, setHideOnClick}: IAdminMenuProps) {

  return(
    <div className={"admin-menu-container" + " " + className}>
    <button>
      <img
        src={adminMenu}
        alt="admin menu"
        className="admin-menu"
        onClick={() => {setShowAdminMenu(!showAdminMenu); setHideOnClick(!showAdminMenu)}}
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
  )
}