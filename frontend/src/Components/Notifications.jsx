import React, { useState, useEffect } from 'react';
import { DeleteConfirmation } from './DeleteConfirmation';

export {Notifications};

function Notifications({ data, setOpenModal }) {

  const [openConfirmationPopup, setOpenConfirmationPopup] = useState(false);
  const [confirmationInfo, setConfirmationInfo] = useState(null);

  const handleOpenConfirmation = (milkID) => {
    // setOpenConfirmationPopup(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationInfo(null);
    setOpenConfirmationPopup(false);
  };


    return (
      <div className="notifications-outer-container">
        {/* <DeleteConfirmation barcode={1234} closeConfirmation={handleCloseConfirmation} /> */}
      <div className="title-box">
        Notifications
        <div className="subtitle-1">
          (5)
          {/* {getNotifications()} */}
        </div>
      </div>
      <div className="subtitle-2">
        Last updated Wed 30 Oct 2:20am
      </div>
      <div className="notifications-inner-container">
          <div className="notification">
          <div className="content">
              Milk 000000 for baby Jeff will expire in 2 hours and 15 minutes 
              <br></br>
              <p className="discard-btn" onClick={handleOpenConfirmation(2)}>discard</p>
          </div>
          <div className="near-expiry-status"></div>
          </div>
          <div className="notification">
          <div className="content">
              Milk 000001 for baby Jeff expired 4 hours ago
          </div>
          <div className="expired-status"></div>
          </div>
          <div className="notification">
          <div className="content">
              Milk 000001 for baby Jeff expired 4 hours ago
          </div>
          <div className="expired-status"></div>
          </div>
          <div className="notification">
          <div className="content">
              Milk 000001 for baby Jeff expired 4 hours ago
          </div>
          <div className="expired-status"></div>
          </div>
          <div className="notification">
          <div className="content">
              Milk 000001 for baby Jeff expired 4 hours ago
          </div>
          <div className="expired-status"></div>
          </div>
          <div className="notification">
          <div className="content">
              Milk 000001 for baby Jeff expired 4 hours ago
          </div>
          <div className="expired-status"></div>
          </div>
          <div className="notification">
          <div className="content">
              Milk 000001 for baby Jeff expired 4 hours ago
          </div>
          <div className="expired-status"></div>
          </div>
          <div className="notification">
          <div className="content">
              Milk 000001 for baby Jeff expired 4 hours ago
          </div>
          <div className="expired-status"></div>
          </div>
      </div>
    </div>
  )  
}

