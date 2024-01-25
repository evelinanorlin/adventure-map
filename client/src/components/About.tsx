import { Link } from "react-router-dom";
import close from "/icons/close.svg";
import adventurer from "/adventurer.webp";

export default function About() {
  return <section className="popup about-popup">
    <Link to="/" className="close-btn">
      <img src={close} alt="close" className="close" />
    </Link>
    <div className="row">
      <div className="img-div">
        <img src={adventurer} alt="adventurer" className="adventurer" />
      </div>
      <div className="content">
      <h1 className="m-t-5">Om Äventyrskartan</h1>
      <p className="m-b-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida arcu ac tortor. Consectetur adipiscing elit pellentesque habitant. Amet tellus cras adipiscing enim. Et malesuada fames ac turpis egestas sed tempus urna et. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Suspendisse in est ante in nibh. Consectetur purus ut faucibus pulvinar elementum integer enim. Eu nisl nunc mi ipsum faucibus. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Vestibulum mattis ullamcorper velit sed ullamcorper morbi. Sodales ut eu sem integer vitae justo eget. In nibh mauris cursus mattis molestie a. Adipiscing bibendum est ultricies integer quis auctor. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Dignissim convallis aenean et tortor at risus viverra adipiscing. Neque volutpat ac tincidunt vitae semper. Eget sit amet tellus cras adipiscing enim.</p>
      <button className="btn btn-primary m-r-5"><Link to="/">Utforska</Link></button>
      <button className="btn btn-tertiary"><Link to="/lagg-till-upplevelse">Tipsa om upplevelse</Link></button>
      </div>
    </div>
  </section>;
}
