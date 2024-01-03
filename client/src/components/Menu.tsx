import { Link } from "react-router-dom";

export default function Menu(){
  return (
    <nav className="menu row direction-row align-items-center">
     <Link to="/">Utforska</Link>
     <Link to="/about">Om äventyrskartan</Link>
     <Link to="/contact">Kontakt</Link>
     <Link to="/" className="btn btn-primary">Tipsa om äventyr</Link>
    </nav>
  )
}