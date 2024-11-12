import React from "react";
import Form from "react-bootstrap/Form";

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

export { AddMilkForm };

function AddMilkForm({
  babyData,
  motherData,
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
  setAdditive,
}) {
  return (
    <div className="form-container w-100">
      <div className="form-mother-detail align-self-start">
        <h5>Patient Details</h5>
        <p className="m-0">
          Baby of Mother: {motherData.first_name} {motherData.last_name}
        </p>
        <p className="m-0">Baby MRN: {babyData.mrn}</p>
      </div>
      <Form name="add-milk-form">
        <div className="form-milk-detail mb-3">
          <div className="container mt-1 p-0">
            <div className="row row-cols-2">
              <div className="col">
                <Form.Label htmlFor="milk-type" className="form-label">
                  Milk Type*
                </Form.Label>
                <Form.Select
                  id="milk-type"
                  className="form-select form-select-sm"
                  onChange={(e) => setMilkType(e.target.value)}
                  value={milkType}
                  defaultValue="ehm"
                >
                  <option value="ehm">EHM</option>
                  <option value="pdhm">PDHM</option>
                  <option value="formula">Formula</option>
                </Form.Select>
              </div>
              <div className="col">
                <Form.Label htmlFor="additive-type" className="form-label">
                  Additive Type
                </Form.Label>
                <Form.Select
                  id="additive-type"
                  className="form-select form-select-sm"
                  defaultValue="none"
                  onChange={(e) => {console.log("Selected Additive:", e.target.value);
                    setAdditive(e.target.value);}}
                >
                  <option value="none">None</option>
                  <option value="humavant6">Humavant+6</option>
                  <option value="prenanfm85">Pre Nan FM85</option>
                  <option value="nanoptipropowder">Nan Optipro Powder</option>
                  <option value="neocate powder">Neocate Powder</option>
                  <option value="beneprotein">Beneprotein</option>
                </Form.Select>
              </div>
              <div className="col">
                <Form.Label htmlFor="milk-storage" className="form-label">
                  Storage Type*
                </Form.Label>
                <Form.Select
                  id="milk-storage"
                  className="form-select form-select-sm"
                  defaultValue="fridge"
                  onChange={(e) => setStorageType(e.target.value)}
                  value={storageType}
                >
                  <option value="fridge">Fridge</option>
                  <option value="fresh">Fresh</option>
                  <option value="defrost">Defrost</option>
                </Form.Select>
              </div>
              <div className="col"></div>
              <div className="col">
                <Form.Label htmlFor="express-date" className="form-label">
                  Express Date*
                </Form.Label>
                <input
                  value={expressDate}
                  onChange={(e) => {
                    setExpressDate(e.target.value);
                  }}
                  className="form-control"
                  id="express-date"
                  type="datetime-local"
                />
              </div>
              <div className="col">
                <Form.Label htmlFor="expiry-date" className="form-label">
                  Expiry Date*
                </Form.Label>
                <input
                  value={expiryDate}
                  onChange={(e) => {
                    setExpiryDate(e.target.value);
                  }}
                  className="form-control"
                  id="expiry-date"
                  type="datetime-local"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <Form.Label htmlFor="milk-notes" className="form-label">
            Notes
          </Form.Label>
          <textarea
            className="form-control"
            id="milk-notes"
            rows="3"
            placeholder={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
      </Form>
    </div>
  );
}
