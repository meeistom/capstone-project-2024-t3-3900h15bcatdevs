import React from 'react';

export { DeleteMilkModal };
function DeleteMilkModal({ closeModal, entry, deleteMilk }) {

  return (
    <>
      <div
        id={`${entry.uid}-deletion-modal`}
        className="modal-background position-fixed d-flex justify-content-center align-items-center w-100 h-100"
      >
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Deletion Confirmation</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => closeModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this milk entry?</p>
                UID: {entry.uid} <br />
                belongs to {entry.baby_name}, baby of {entry.mother_name}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => closeModal(false)}>Close</button>
                <button type="button" className="btn btn-danger" onClick={() => deleteMilk(entry.uid)} >Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}