import close from "./icons/close.svg";

import adventurer from "/public/adventurer.webp";

export default function WelcomePopup() {
  return (
    <div className="popup welcome-popup">
      <button aria-label="Close" className="close-btn"><img src={close} alt="Close" /></button>
      <div className="row direction-row">
        <img src={adventurer} alt="En man med ryggsäck på toppen av ett berg"/>
        <div className="cont">
          <div className="text-content">
            <h1 className="text-block-sm color-orange">Välkommen till ÄventyrsKartan, din guide till naturen</h1>
            <p>Of single-origin mug kale 3-moon farm-to-table forage jomo. Crucifix they taiyaki v hella. Cornhole fit plaid hot artisan taiyaki banjo kombucha readymade iceland. Snackwave live-edge ascot gochujang cloud scenester vibecession praxis yuccie. Ethical franzen sustainable snackwave charcoal celiac skateboard braid tbh taiyaki. Cray mug photo bag scenester big bottle coloring mlkshk xoxo. Woke blue vice craft marfa salvia. Pitchfork mood biodiesel mi vegan distillery +1 tumeric raw. Vaporware shabby sold thundercats tilde book squid synth probably heard.</p>
            <div className="row direction-row m-t-5">
              <button className="btn btn-secondary">Utforska</button>
              <button className="btn btn-tertiary">Om Äventyrskartan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}