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
  setNotes,
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
                  defaultValue="option-ehm"
                >
                  <option value="ehm">EHM</option>
                  <option value="pdhm">PDHM</option>
                  <option value="humavant6">Humavant 6</option>
                  <option value="Cream">Cream</option>
                  <option value="HMF">HMF</option>
                </Form.Select>
              </div>
              <div className="col">
                <Form.Label htmlFor="milk-storage" className="form-label">
                  Storage Type*
                </Form.Label>
                <Form.Select
                  id="milk-storage"
                  className="form-select form-select-sm"
                  defaultValue="option-fridge"
                >
                  <option value="fridge">Fridge</option>
                  <option value="fresh">Fresh</option>
                  <option value="defrost">Defrost</option>
                </Form.Select>
              </div>
              <div className="col">
                <Form.Label htmlFor="express-date" className="form-label">
                  Expressed Date*
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
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
      </Form>
    </div>
  );
}
