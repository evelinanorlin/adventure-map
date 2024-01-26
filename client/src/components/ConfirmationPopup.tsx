import React from "react";

interface IConfirmationProps {
  experience: string;
  action: string;
  setConfirmed: React.Dispatch<React.SetStateAction<boolean | null>>;
  setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ConfirmationPopup({
  experience,
  action,
  setConfirmed,
  setShowConfirmation,
}: IConfirmationProps) {
  const confirm = () => {
    setConfirmed(true);
  };
  const goBack = () => {
    setShowConfirmation(false);
  };
  return (
    <>
      <div className="dark-bg" onClick={goBack}></div>
      <div className="popup confirmation-popup p-5">
        <p>
          Är du säker på att du vill {action} {experience}?
        </p>
        <button className="btn btn-primary m-r-4" onClick={confirm}>
          {action === "lägga till" ? "Ja, lägg till" : `Ja, ${action}`}
        </button>
        <button className="btn" onClick={goBack}>
          Nej, gå tillbaka
        </button>
      </div>
    </>
  );
}
