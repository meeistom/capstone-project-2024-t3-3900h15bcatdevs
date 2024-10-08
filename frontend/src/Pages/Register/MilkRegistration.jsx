import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
// import { Form } from "../../Components/Form";

export { MilkRegistration };

function MilkRegistration() {
  const [expiryDate, setExpiryDate] = useState("");
  const [expressDate, setExpressDate] = useState("");
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
                  defaultValue="option-ehm"
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
                  defaultValue="option-fidge"
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
          <textarea class="form-control" id="milk-notes" rows="3"></textarea>
        </div>
      </div>
    </>
  );
}
