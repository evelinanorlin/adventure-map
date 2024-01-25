import { Link } from "react-router-dom";
import Menu from "./Menu";
import logotype from "/icons/logotype.svg";

export default function Header() {
  return (
    <header className="header bg-beige p-t-1 p-b-1">
      <div className="content-wide">
        <div className="row direction-row justify-between align-items-center">
          <Link to="/" className="logotype p-t-1">
            <img src={logotype} />
          </Link>
          <Menu />
        </div>
      </div>
    </header>
  );
}
