import React from 'react';

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
  uid
}) {
  const options = [
    { value: 'none', label: 'None' },
    { value: 'prenanfm85', label: 'Pre Nan FM85' },
    { value: 'humavant6', label: 'Humavant+6' },
    { value: 'HumavantCream', label: 'Humavant Cream' },
    { value: 'nanoptipropowder', label: 'Nan Optipro Powder' },
    { value: 'PeptiJuniorpowder', label: 'Pepti Junior Powder' },
    { value: 'neocate powder', label: 'Neocate Powder' },
    { value: 'beneprotein', label: 'Beneprotein' }
  ];

  const handleAdditiveChange = (value) => {
    if (value === 'none') {
      setAdditive(['none']);
    } else {
      setAdditive((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev.filter((item) => item !== 'none'), value]
      );
    }
  };

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
                onChange={(e) => setMilkType(e.target.value)}>
                <option value="ehm">EHM</option>
                <option value="pdhm">PDHM</option>
                <option value="HMF">HMF</option>
              </select>
            </div>
            <div>
              <label htmlFor={`${uid}-additive`} className="form-label">
                Additive Type
              </label>
            </div>
            <div>
              <div className="mt-1">
                {options.map((option) => (
                  <div key={option.value}>
                    <label className="form-label">
                      <input
                        className="form-check-input"
                        disabled={!isEditing}
                        type="checkbox"
                        value={option.value}
                        checked={additive.includes(option.value)}
                        onChange={() => handleAdditiveChange(option.value)}
                      />
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
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
                onChange={(e) => setStorageType(e.target.value)}>
                <option value="fresh">Fresh</option>
                <option value="frozen">Frozen</option>
                <option value="defrosted">Defrosted</option>
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
            onChange={(e) => setNotes(e.target.value)}></textarea>
        </div>
      </div>
    </>
  );
}
