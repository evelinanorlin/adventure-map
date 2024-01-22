import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <p>Administratör? <Link to="/logga-in">Logga in här</Link></p>
    </footer>
  );
}
