import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";

export { MilkRegistration };

function MilkRegistration({
  babyChecked,
  babyMRN,
  setBabyMRN,
  expiryDate,
  setExpiryDate,
  expressDate,
  setExpressDate,
  notes,
  setNotes,
  milkType,
  setMilkType,
  storageType,
  setStorageType,
  additive,
  setAdditive,
}) {
  return (
    <>
      <div className="register-details-container d-flex flex-column">
        <div className="title align-self-center">
          <h2>{"Milk Details"}</h2>
        </div>
        <Form>
          <div className="form-milk-detail mb-3">
            <div className="container">
              <div className="row row-cols-2">
                <div className="col">
                  <Form.Label htmlFor="milk-type" className="register-form-label">
                    Milk Type*
                  </Form.Label>
                  <Form.Select
                    id="milk-type"
                    className="form-select form-select-sm"
                    value={milkType}
                    onChange={(e) => setMilkType(e.target.value)}
                  >
                    <option value="ehm">HII</option>
                    <option value="pdhm">PDHM</option>
                    <option value="formula">Formula</option>
                  </Form.Select>
                </div>
                <div className="col">
                  <Form.Label htmlFor="additive-type" className="register-form-label">
                    Additive Type
                  </Form.Label>
                  <Form.Select
                    id="additive-type"
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
                  </Form.Select>
                </div>
                <div className="col">
                  <Form.Label htmlFor="milk-storage" className="register-form-label">
                    Storage Type*
                  </Form.Label>
                  <Form.Select
                    id="milk-storage"
                    className="form-select form-select-sm"
                    value={storageType}
                    onChange={(e) => setStorageType(e.target.value)}
                  >
                    <option value="fridge">Fridge</option>
                    <option value="fresh">Fresh</option>
                    <option value="defrost">Defrost</option>
                  </Form.Select>
                </div>
                <div className="col"></div>
                <div className="col">
                  <Form.Label htmlFor="express-date" className="register-form-label">
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
                  <Form.Label htmlFor="expiry-date" className="register-form-label">
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
                {!babyChecked && (
                  <>
                    <div className="col">
                      <div className="register-form-label">Baby MRN</div>
                      <Form.Control
                        id="baby-mrn"
                        type="number"
                        name="baby-mrn"
                        placeholder="Enter MRN"
                        value={babyMRN}
                        maxLength={4}
                        onChange={(e) => setBabyMRN(e.target.value)}
                      />
                      <Form.Text className="text-muted"></Form.Text>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="milk-notes" className="register-form-label">
              Notes
            </Form.Label>
            <textarea
              className="form-control"
              id="milk-notes"
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
        </Form>
      </div>
    </>
  );
}
