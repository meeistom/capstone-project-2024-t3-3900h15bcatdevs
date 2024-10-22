import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";

export { MilkRegistration };

function MilkRegistration({
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
}) {
  return (
    <>
      <div className="register-details-container">
        <div className="title">
          <h2>{"Milk Details"}</h2>
        </div>
        <Form>
          <div className="form-milk-detail" class="mb-3">
            <div class="container">
              <div class="row row-cols-2">
                <div class="col">
                  <Form.Label htmlFor="milk-type" className="form-label">
                    Milk Type*
                  </Form.Label>
                  <Form.Select
                    id="milk-type"
                    className="form-select form-select-sm"
                    value={milkType}
                    onChange={(e) => setMilkType(e.target.value)}
                  >
                    <option value="ehm">EHM</option>
                    <option value="pdhm">PDHM</option>
                    <option value="humavant6">Humavant 6</option>
                    <option value="Cream">Cream</option>
                    <option value="HMF">HMF</option>
                  </Form.Select>
                </div>
                <div class="col">
                  <Form.Label
                    htmlFor="milk-storage"
                    className="register-form-label"
                  >
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
                <div class="col">
                  <Form.Label
                    htmlFor="express-date"
                    className="register-form-label"
                  >
                    Expressed Date*
                  </Form.Label>
                  <input
                    value={expressDate}
                    onChange={(e) => {
                      setExpressDate(e.target.value);
                    }}
                    class="form-control"
                    id="express-date"
                    type="datetime-local"
                  />
                </div>
                <div class="col">
                  <Form.Label
                    htmlFor="expiry-date"
                    className="register-form-label"
                  >
                    Expiry Date*
                  </Form.Label>
                  <input
                    value={expiryDate}
                    onChange={(e) => {
                      setExpiryDate(e.target.value);
                    }}
                    class="form-control"
                    id="expiry-date"
                    type="datetime-local"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <Form.Label htmlFor="milk-notes" className="register-form-label">
              Notes
            </Form.Label>
            <textarea
              class="form-control"
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
