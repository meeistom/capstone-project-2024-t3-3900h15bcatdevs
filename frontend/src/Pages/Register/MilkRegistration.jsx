import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { addDaysToDateTime, getCurrentDateTime } from '../../Utils/utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import { additiveOptions } from '../../constants';

export { MilkRegistration };

function MilkRegistration({
  babyChecked,
  babyForm,
  setBabyForm,
  milkForm,
  setMilkForm,
  setValidForm
}) {
  const handleChange = (e, name) => {
    const value = e.target.value;
    setMilkForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBabyChange = (e) => {
    const value = e.target.value;
    setBabyForm((prev) => ({
      ...prev,
      mrn: value
    }));
  };

  const handleAdditiveChange = (value) => {
    setMilkForm((prev) => {
      const currentAdditives = prev.additives || [];
      let updatedAdditives;

      if (value === 'none') {
        updatedAdditives = ['none'];
      } else {
        updatedAdditives = currentAdditives.includes(value)
          ? currentAdditives.filter((item) => item !== value)
          : [...currentAdditives.filter((item) => item !== 'none'), value];
      }
      return {
        ...prev,
        additives: updatedAdditives
      };
    });
  };

  useEffect(() => {
    const isValid = babyForm.mrn?.length === 4 && milkForm.express_time && milkForm.expiration_time;
    setValidForm(isValid);
  }, [milkForm, babyForm]);

  return (
    <>
      <div className="register-details-container d-flex flex-column">
        <div className="title align-self-center">
          <h2>{'Milk Details'}</h2>
        </div>
        <Form noValidate>
          <div className="form-milk-detail mb-3">
            <div className="container">
              <div className="row row-cols-2">
                <div className="col">
                  <Form.Group className="d-flex flex-column">
                    <Form.Label htmlFor="milk-type" className="register-form-label">
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
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group className="d-flex flex-column">
                    <Form.Label htmlFor="additive-type" className="register-form-label">
                      Additive Type
                    </Form.Label>
                    <div className="mt-1 register-additives" id="additive-types">
                      {additiveOptions.map((option) => (
                        <div key={option.value}>
                          <label htmlFor={option.value} className="form-label">
                            <input
                              className="form-check-input"
                              id={option.value}
                              type="checkbox"
                              value={option.value}
                              checked={milkForm.additives.includes(option.value)}
                              onChange={() => handleAdditiveChange(option.value)}
                            />
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group className="d-flex flex-column">
                    <Form.Label htmlFor="milk-storage" className="register-form-label">
                      Storage Type*
                    </Form.Label>
                    <Form.Select
                      id="milk-storage"
                      className="form-select form-select-sm"
                      value={milkForm.storage_type}
                      onChange={(e) => handleChange(e, 'storage_type')}>
                      <option value="fresh">Fresh</option>
                      <option value="frozen">Frozen</option>
                      <option value="defrosted">Defrosted</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col"></div>
                <div className="col">
                  <Form.Group className="d-flex flex-column">
                    <Form.Label htmlFor="express-date" className="register-form-label">
                      Expressed Date*
                    </Form.Label>
                    <input
                      value={milkForm.express_time}
                      onChange={(e) => {
                        handleChange(e, 'express_time');
                      }}
                      className="form-control"
                      id="express-date"
                      type="datetime-local"
                      min={getCurrentDateTime()}
                    />
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group className="d-flex flex-column">
                    <Form.Label htmlFor="expiry-date" className="register-form-label">
                      Expiry Date*
                    </Form.Label>
                    <input
                      value={milkForm.expiration_time}
                      onChange={(e) => {
                        handleChange(e, 'expiration_time');
                      }}
                      className="form-control"
                      id="expiry-date"
                      type="datetime-local"
                      min={
                        milkForm.express_time
                          ? addDaysToDateTime(milkForm.express_time, 1)
                          : getCurrentDateTime()
                      }
                    />
                  </Form.Group>
                </div>
                {!babyChecked && (
                  <>
                    <div className="col">
                      <Form.Group className="d-flex flex-column">
                        <div className="register-form-label">Baby MRN</div>
                        <Form.Control
                          id="baby-mrn"
                          type="number"
                          name="baby-mrn"
                          placeholder="Enter MRN"
                          value={babyForm.mrn}
                          maxLength={4}
                          onChange={(e) => handleBabyChange(e)}
                          isInvalid={babyForm.mrn?.length !== 4}
                        />
                        {babyForm.mrn?.length !== 4 && (
                          <Form.Control.Feedback type="invalid" className="fs-6 mt-1 feedback">
                            MRN must be exactly 4 digits.
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="mb-3">
            <Form.Group className="d-flex flex-column">
              <Form.Label htmlFor="milk-notes" className="register-form-label">
                Notes
              </Form.Label>
              <textarea
                className="form-control"
                id="milk-notes"
                rows="3"
                value={milkForm.notes}
                onChange={(e) => handleChange(e, 'extra_notes')}></textarea>
            </Form.Group>
          </div>
        </Form>
      </div>
    </>
  );
}
