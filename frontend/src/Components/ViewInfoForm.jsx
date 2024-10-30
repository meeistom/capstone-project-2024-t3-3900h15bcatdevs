import React, { useEffect, useState } from 'react'


export { ViewInfoForm };

function ViewInfoForm({ info, version }) {
  const [body, setBody] = useState(null);
  useEffect(() => {
    switch (version) {
      case "viewMilk":
        const express_time = new Date( info.express_time * 1000 ).toISOString().slice(0, 16);
        const expiration_time = new Date( info.expiration_time * 1000 ).toISOString().slice(0, 16);
        const create_time = new Date( info.created_at * 1000 ).toISOString().slice(0, 16);
        setBody(<>
          <div className="container text-center">
            <span>Created by {create_time}</span>
            <h5>Patient Details</h5>
            <div className="row row-cols-2">
              <div className="col"><strong>Baby</strong></div>
              <div className="col">{info.baby_name}<br/>{info.baby_mrn}</div>
              <div className="col"><strong>Mother</strong></div>
              <div className="col">{info.mother_name}<br/>{info.mother_mrn}</div>
            </div>
            <h5>Milk Details</h5>
            <div className="row row-cols-2">
              <div className="col">Expressed time</div>
              <input type="datetime-local" readOnly value={`${express_time}`}/>
              <div className="col">Expiration time</div>
              <input type="datetime-local" readOnly value={`${expiration_time}`}/>
            </div>
            <div className="row row-cols-2">
              <div>
                <label htmlFor={`${info.uid}-milk-type`} className="form-label">
                  Milk Type
                </label>
              </div>
              <div>
                <select
                  id={`${info.uid}-milk-type`}
                  disabled
                  className="form-select form-select-sm"
                  defaultValue={`${info.milk_type}`}
                >
                  <option value="ehm">EHM</option>
                  <option value="pdhm">PDHM</option>
                  <option value="humavant6">Humavant 6</option>
                  <option value="Cream">Cream</option>
                  <option value="HMF">HMF</option>
                </select>
              </div>
              <div>
                <label htmlFor={`${info.uid}-storage-type`} className="form-label">
                  Storage Type
                </label>
              </div>
              <div>
                <select
                  id={`${info.uid}-storage-type`}
                  disabled
                  className="form-select form-select-sm"
                  defaultValue={`${info.storage_type}`}
                >
                  <option value="fridge">Fridge</option>
                  <option value="fresh">Fresh</option>
                  <option value="defrost">Defrost</option>
                </select>
              </div>
            </div>
          </div>
        </>)
        break;
      case "viewMother":
        setBody(<>
          hi mom
        </>)
        break;
    }
  }, [version]);

  return (<>{body}</>)
}