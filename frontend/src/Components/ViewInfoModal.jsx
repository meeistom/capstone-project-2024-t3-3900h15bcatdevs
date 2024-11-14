import React, { useState } from 'react';
import { ViewInfoForm } from './ViewInfoForm';
import { Modal } from './Modal';
import Button from 'react-bootstrap/Button';
import { URL } from '../constants';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { toUnix, dateTimeToString, unixToDatetimeLocal } from '../Utils/utils';

export { ViewInfoModal };

function ViewInfoModal({ info, closeModal, displayData, setDisplayData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [expressDate, setExpressDate] = useState(unixToDatetimeLocal(info.express_time));
  const [expiryDate, setExpiryDate] = useState(unixToDatetimeLocal(info.expiration_time));
  const [notes, setNotes] = useState(info.extra_notes);
  const [milkType, setMilkType] = useState(info.milk_type);
  const [storageType, setStorageType] = useState(info.storage_type);
  const [storageLocation, setStorageLocation] = useState(info.storage_location);
  const [additive, setAdditive] = useState(info.additives);

  const handleSave = async () => {
    const updatedInfo = {
      milk_uid: info.uid,
      baby_mrn: info.baby_mrn,
      express_time: toUnix(expressDate),
      expiration_time: toUnix(expiryDate),
      extra_notes: notes,
      milk_type: milkType,
      storage_type: storageType,
      storage_location: storageLocation,
      additives: [additive],
      volume_ml: info.volume_ml
    };

    console.log(`before change: ${displayData}`);
    axios
      .post(`${URL}/edit?milk_uid=${info.uid}`, updatedInfo)
      .then((response) => {
        console.log(`Milk Entry updated:`, response.data);
        console.log(info);
        displayData.map((baby) => {
          if (baby.mrn === updatedInfo.baby_mrn) {
            const milks = baby.associated_milks;
            milks.map((milk) => {
              if (milk.uid === updatedInfo.milk_uid) {
                console.log("milk updated");
                milk.milk_type = updatedInfo.milk_type;
                milk.storage_type = updatedInfo.storage_type;
                milk.storage_location = updatedInfo.storage_location;
                milk.express_time = updatedInfo.express_time;
                milk.expiration_time = updatedInfo.expiration_time;
                milk.extra_notes = updatedInfo.extra_notes;
              }
            }) 
          }
        })
        setIsEditing(false);
      })
      .catch((error) => {
        console.log('Error editing milk entry:', error);
      });
  };

  return (
    <Modal
      id={info.uid || info.mrn}
      title={isEditing ? 'Edit Milk Entry' : `Milk ID #${info.uid}`}
      body={
        <ViewInfoForm
          created={dateTimeToString(unixToDatetimeLocal(info.created_at))}
          babyMRN={info.baby_mrn}
          babyName={info.baby_name}
          expressDate={expressDate}
          setExpressDate={setExpressDate}
          expiryDate={expiryDate}
          setExpiryDate={setExpiryDate}
          notes={notes}
          setNotes={setNotes}
          milkType={milkType}
          setMilkType={setMilkType}
          storageType={storageType}
          setStorageType={setStorageType}
          storageLocation={storageLocation}
          setStorageLocation={setStorageLocation}
          additive={additive}
          setAdditive={setAdditive}
          isEditing={isEditing}
          uid={info.uid}
        />
      }
      footer={
        <div id="btn-group" className="m-4">
          <Button onClick={() => closeModal(false)} variant="outline-primary">
            Close
          </Button>
          <Button onClick={() => (isEditing ? handleSave() : setIsEditing(true))} variant="primary">
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </div>
      }
      size={'large'}
      closeModal={closeModal}
    />
  );
}
