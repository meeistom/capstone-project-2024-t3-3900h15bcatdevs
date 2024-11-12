import React from "react";

export { ViewInfoForm };

function ViewInfoForm({
  babyMRN,
  babyName,
  created,
  expressDate,
  setExpressDate,
  expiryDate,
  setExpiryDate,
  notes,
  setNotes,
  milkType,
  setMilkType,
  storageType,
  setStorageType,
  storageLocation,
  setStorageLocation,
  additive,
  setAdditive,
  isEditing,
  uid,
}) {
  return (
    <>
      <div className="container text-center">
        <span>Created at {created}</span>
        <div className="container text-start">
          <h5 className="mt-4 mb-2">Patient Details</h5>
          <div className="row row-cols-2 info-section">
            <div className="col">Baby name:</div>
            <div className="col">
              {babyName}
              <br />
            </div>
            <div className="col">Baby MRN:</div>
            <div className="col">
              {babyMRN}
              <br />
            </div>
          </div>
          <h5 className="mt-4 mb-2">Milk Details</h5>
          <div className="row row-cols-2 info-section">
            <div className="col">Expressed time</div>
            <div>
              <input
                readOnly={!isEditing}
                value={expressDate}
                onChange={(e) => setExpressDate(e.target.value)}
                className="form-control"
                type="datetime-local"
              />
            </div>
            <div className="col">Expiration time</div>
            <div>
              <input
                readOnly={!isEditing}
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="form-control"
                type="datetime-local"
              />
            </div>
          </div>
          <div className="row row-cols-2 info-section">
            <div>
              <label htmlFor={`${uid}-milk-type`} className="form-label">
                Milk Type
              </label>
            </div>
            <div>
              <select
                disabled={!isEditing}
                className="form-select form-select-sm"
                value={milkType}
                onChange={(e) => setMilkType(e.target.value)}
              >
                <option value="ehm">EHM</option>
                <option value="pdhm">PDHM</option>
                <option value="humavant6">Humavant 6</option>
                <option value="Cream">Cream</option>
                <option value="HMF">HMF</option>
              </select>
            </div>
            <div>
              <label htmlFor={`${uid}-additive`} className="form-label">
                Additive Type
              </label>
            </div>
            <div>
              <select
                disabled={!isEditing}
                className="form-select form-select-sm"
                value={additive}
                onChange={(e) => setAdditive(e.target.value)}
              >
                <option value="none">None</option>
                <option value="humavant6">Humavant+6</option>
                <option value="prenanfm85">Pre Nan FM85</option>
                <option value="nanoptipropowder">Nan Optipro Powder</option>
                <option value="neocate powder">Neocate Powder</option>
                <option value="beneprotein">Beneprotein</option>
              </select>
            </div>
            <div>
              <label htmlFor={`${uid}-storage-type`} className="form-label">
                Storage Type
              </label>
            </div>
            <div>
              <select
                disabled={!isEditing}
                className="form-select form-select-sm"
                value={storageType}
                onChange={(e) => setStorageType(e.target.value)}
              >
                <option value="fridge">Fridge</option>
                <option value="fresh">Fresh</option>
                <option value="defrost">Defrost</option>
              </select>
            </div>
            <div className="col">Storage Location</div>
            <div className="col">
              {isEditing ? (
                <input
                  type="text"
                  value={storageLocation}
                  className="form-control"
                  onChange={(e) => setStorageLocation(e.target.value)}
                />
              ) : (
                <>{storageLocation}</>
              )}
            </div>
          </div>
          <label htmlFor="milk-notes" className="form-label">
            <h5 className="mt-4 mb-2">Additional Notes</h5>
          </label>
          <textarea
            className="form-control"
            rows="3"
            value={notes}
            disabled={!isEditing}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
      </div>
    </>
  );
}
