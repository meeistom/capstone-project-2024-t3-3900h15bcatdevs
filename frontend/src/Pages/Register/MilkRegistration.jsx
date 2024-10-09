import React, { useState } from "react";
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
        <div className="form-milk-detail" class="mb-3">
          <div class="container">
            <div class="row row-cols-2">
              <div class="col">
                <label htmlFor="milk-type" class="form-label">
                  Milk Type*
                </label>
                <select
                  id="milk-type"
                  class="form-select form-select-sm"
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
              <div class="col">
                <label htmlFor="milk-storage" class="form-label">
                  Storage Type*
                </label>
                <select
                  id="milk-storage"
                  class="form-select form-select-sm"
                  value={storageType}
                  onChange={(e) => setStorageType(e.target.value)}
                >
                  <option value="fridge">Fridge</option>
                  <option value="fresh">Fresh</option>
                  <option value="defrost">Defrost</option>
                </select>
              </div>
              <div class="col">
                <label htmlFor="express-date" class="form-label">
                  Expressed Date*
                </label>
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
                <label htmlFor="expiry-date" class="form-label">
                  Expiry Date*
                </label>
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
          <label htmlFor="milk-notes" class="form-label">
            Notes
          </label>
          <textarea
            class="form-control"
            id="milk-notes"
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
      </div>
    </>
  );
}
