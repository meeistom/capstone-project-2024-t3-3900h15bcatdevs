import React, { useState, useEffect } from 'react';

export {Notifications};

function Notifications({ data, setOpenModal }) {

    const [openEntryModal, setOpenEntryModal] = useState(false);
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

    const openModal = (entry) => {
        setInfo(entry);
        setOpenEntryModal(true);
        console.log(entry);
    }

    const closeModal = () => {
    setInfo(null);
    setOpenEntryModal(false);
    }

    const openConfirmation = (milkID) => {

    }


    return (
        <div className="notifications-outer-container">
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
                <p className="discard-btn" onclick={openConfirmation()}>discard</p>
            </div>
            <div className="near-expiry-status"></div>
            </div>
            <div className="notification">
            <div className="text">
                Milk 000001 for baby Jeff expired 4 hours ago
            </div>
            <div className="expired-status"></div>
            </div>
            <div className="notification">
            <div className="text">
                Milk 000001 for baby Jeff expired 4 hours ago
            </div>
            <div className="expired-status"></div>
            </div>
            <div className="notification">
            <div className="text">
                Milk 000001 for baby Jeff expired 4 hours ago
            </div>
            <div className="expired-status"></div>
            </div>
            <div className="notification">
            <div className="text">
                Milk 000001 for baby Jeff expired 4 hours ago
            </div>
            <div className="expired-status"></div>
            </div>
            <div className="notification">
            <div className="text">
                Milk 000001 for baby Jeff expired 4 hours ago
            </div>
            <div className="expired-status"></div>
            </div>
            <div className="notification">
            <div className="text">
                Milk 000001 for baby Jeff expired 4 hours ago
            </div>
            <div className="expired-status"></div>
            </div>
            <div className="notification">
            <div className="text">
                Milk 000001 for baby Jeff expired 4 hours ago
            </div>
            <div className="expired-status"></div>
            </div>
            <div className="notification">
            <div className="text">
                Milk 000001 for baby Jeff expired 4 hours ago
            </div>
            <div className="expired-status"></div>
            </div>
            <div className="notification">
            <div className="text">
                Milk 000001 for baby Jeff expired 4 hours ago
            </div>
            <div className="expired-status"></div>
            </div>
        </div>
      </div>
    )
    

}

