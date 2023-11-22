import cross from "../Images/close.png";
import "../Styles/Error.css";

export default function Error({ errorMsg, handleCloseClick }) {
  return (
    <>
      {errorMsg && (
        <div className="errorContainer">
          {errorMsg}
          <div className="closeDiv">
            <img src={cross} alt="closeImg" onClick={handleCloseClick}></img>
          </div>
        </div>
      )}
    </>
  );
}
