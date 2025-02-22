import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

export { Notifications };

function Notifications({ notifData, confirmDelete }) {
  const getExpiryMessage = (expired, days_expired, hours_expired) => {
    let message = '';

    // Add days
    if (days_expired === 1) {
      message += '1 day';
    } else if (days_expired > 1) {
      message += `${days_expired} days`;
    }

    if (days_expired !== 0 && hours_expired !== 0) {
      message += ' and ';
    }

    // Add hours
    if (hours_expired === 1) {
      message += '1 hour';
    } else if (hours_expired > 1) {
      message += `${hours_expired} hours`;
    }

    if (hours_expired === 0) {
      message += "less than an hour"
    }

    if (expired === true) {
      message += ' ago';
    }

    return <>{message}</>;
  };

  return (
    <div className="notifications-outer-container">
      <h1 className="m-0">Notifications</h1>
      <div className="subtitle-2">
        <p className="py-2 fs-5 m-0"> Total Notifications: {notifData.length}</p>
      </div>
      <div className="notifications-inner-container">
        {notifData.map((notif) => (
          <div className="notification" key={`${notif.uid}-notif-id`}>
            <div className="content">
              Milk {notif.uid} for baby {notif.baby_name}
              {notif.expired == false ? ' will expire in ' : ' expired '}
              {getExpiryMessage(
                notif.expired,
                Math.abs(notif.days_expiry),
                Math.abs(notif.hours_expiry)
              )}
              <br />
              {notif.expired && (
                <p className="discard-btn" onClick={() => confirmDelete(notif)}>
                  Discard
                </p>
              )}
            </div>
            <div className={notif.expired == false ? 'near-expiry-status' : 'expired-status'}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
