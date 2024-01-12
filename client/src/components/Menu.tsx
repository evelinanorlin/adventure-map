import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension())
    }
    window.addEventListener('resize', updateDimension);
    
    return(() => {
        window.removeEventListener('resize', updateDimension);
        if(screenSize.width > 992){
          setShowMenu(true)
        } else {
          setShowMenu(false)
        }
    })
  }, [screenSize])

  function getCurrentDimension(){
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
}
console.log(getCurrentDimension());
  return (
    <>
    <nav className="menu row direction-row align-items-center" style={showMenu ? {display: "block"} : {display: "none"}}>
      <Link to="/">Utforska</Link>
      <Link to="/om-aventyrskartan">Om äventyrskartan</Link>
      <Link to="/contact">Kontakt</Link>
      <Link to="/lagg-till-upplevelse" className="btn btn-primary">
        Tipsa om äventyr
      </Link>
    </nav>
    <div className="burger" onClick={() => setShowMenu(!showMenu)}>
      <span></span>
      <span></span>
      <span></span>
    </div>
    </>
  );
}
