import { React } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import { dateTimeToString } from '../../Utils/utils';

export { ConfirmDetails };

function ConfirmDetails({ momForm, babyForm, milkForm, checked }) {
  return (
    <>
      <div className="register-details-container confirm-details d-flex flex-column">
        <div className="title align-self-center mb-3">
          <h2>{'Confirm Details'}</h2>
        </div>
        <div className="body d-flex flex-column text-start fs-5">
          {checked.momPage && (
            <div className="mother-details ">
              <div className="sub-title fw-bold">Mother Details</div>
              <div className="top-layer">MRN: {momForm.mrn}</div>
              <div className="bottom-layer">
                <div>First Name: {momForm.first_name}</div>
                <div>Last Name: {momForm.last_name}</div>
              </div>
            </div>
          )}
          {checked.babyPage && (
            <div className="baby-details">
              <div className="sub-title fw-bold">Baby Details</div>
              <div className="top-layer">MRN: {babyForm.mrn}</div>
              <div className="bottom-layer">
                <div>First Name: {babyForm.first_name}</div>
                <div>Last Name: {babyForm.last_name}</div>
              </div>
            </div>
          )}
          {checked.milkPage && (
            <div className="milk-details">
              <div className="sub-title fw-bold">Milk Details</div>
              <div className="top-layer">
                <div>Express Date: {dateTimeToString(milkForm.express_time)}</div>
                <div>Expiry Date: {dateTimeToString(milkForm.expiration_time)}</div>
              </div>
              <div className="bottom-layer">
                <div>Milk Type: {milkForm.milk_type.toUpperCase()}</div>
                <div>Additive Type: {milkForm.additives.join(', ')}</div>
                <div>Storage Type: {milkForm.storage_type.toUpperCase()}</div>
                {milkForm.extra_notes !== '' && (
                  <div className="notes">Notes: {milkForm.extra_notes}</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
