import { React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";

export { ConfirmDetails };

function ConfirmDetails({
  momMRN,
  momFirstName,
  momLastName,
  babyMRN,
  babyFirstName,
  babyLastName,
  expiryDate,
  expressDate,
  notes,
  milkType,
  storageType,
  checked,
}) {
  return (
    <>
      <div className="register-details-container confirm-details">
        <div className="title">
          <h2>{"Confirm Details"}</h2>
        </div>
        <div className="body d-flex flex-column text-start fs-5">
          {checked.momPage && (
            <div className="mother-details ">
              <div className="sub-title fw-bold">Mother Details</div>
              <div className="top-layer">MRN: {momMRN}</div>
              <div className="bottom-layer">
                <div>First Name: {momFirstName}</div>
                <div>Last Name: {momLastName}</div>
              </div>
            </div>
          )}
          {checked.babyPage && (
            <div className="baby-details">
              <div className="sub-title fw-bold">Baby Details</div>
              <div className="top-layer">MRN: {babyMRN}</div>
              <div className="bottom-layer">
                <div>First Name: {babyFirstName}</div>
                <div>Last Name: {babyLastName}</div>
              </div>
            </div>
          )}
          {checked.milkPage && (
            <div className="milk-details">
              <div className="sub-title fw-bold">Milk Details</div>
              <div className="top-layer">
                <div>Express Date: {expressDate}</div>
                <div>Expiry Date: {expiryDate}</div>
              </div>
              <div className="bottom-layer">
                <div>Milk Type: {milkType.toUpperCase()}</div>
                <div>Storage Type: {storageType.toUpperCase()}</div>
                {notes !== "" && <div className="notes">Notes: {notes}</div>}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
