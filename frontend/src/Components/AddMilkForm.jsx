import React from 'react';
import Form from 'react-bootstrap/Form';
import { addDaysToDateTime, getCurrentDateTime } from '../Utils/utils';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

export { AddMilkForm };

function AddMilkForm({ babyMrn, motherData, milkForm, setMilkForm }) {
  const handleChange = (e, name) => {
    const value = e.target.value;
    setMilkForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="form-container w-100 mt-2">
      <div className="form-mother-detail align-self-start">
        <h5>Patient Details</h5>
        <p className="m-0">
          Baby of Mother: {motherData.first_name} {motherData.last_name}
        </p>
        <p className="m-0">Baby MRN: {babyMrn}</p>
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
                  value={milkForm.milk_type}
                  onChange={(e) => handleChange(e, 'milk_type')}>
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
                  value={milkForm.additives}
                  onChange={(e) => {
                    handleChange(e, 'additives');
                  }}>
                  <option value="none">None</option>
                  <option value="prenanfm85">Pre Nan FM85</option>
                  <option value="humavant6">Humavant+6</option>
                  <option value="HumavantCream">Humavant Cream</option>
                  <option value="nanoptipropowder">Nan Optipro Powder</option>
                  <option value="PeptiJuniorpowder">Pepti Junior powder</option>
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
                  value={milkForm.storage_type}
                  onChange={(e) => {
                    handleChange(e, 'storage_type');
                  }}>
                  <option value="fresh">Fresh</option>
                  <option value="frozen">Frozen</option>
                  <option value="defrosted">Defrosted</option>
                </Form.Select>
              </div>
              <div className="col"></div>
              <div className="col">
                <Form.Label htmlFor="express-date" className="form-label">
                  Express Date*
                </Form.Label>
                <input
                  value={milkForm.express_time}
                  min={getCurrentDateTime()}
                  onChange={(e) => {
                    handleChange(e, 'express_time');
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
                  value={milkForm.expiration_time}
                  min={
                    milkForm.express_time
                      ? addDaysToDateTime(milkForm.express_time, 1)
                      : getCurrentDateTime()
                  }
                  onChange={(e) => {
                    handleChange(e, 'expiration_time');
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
            value={milkForm.notes}
            onChange={(e) => handleChange(e, 'extra_notes')}></textarea>
        </div>
      </Form>
    </div>
  );
}
