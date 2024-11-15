import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import axios from 'axios';
import { Navibar } from '../Components/Navibar';
import { AddMilkModal } from '../Components/AddMilkModal';
import { Table } from '../Components/Table';
import { DeleteMilkModal } from '../Components/DeleteMilkModal';
import { Notifications } from '../Components/Notifications';
import { URL } from '../constants';
import { dateTimeToString, unixToDatetimeLocal } from '../Utils/utils';

export { Home };

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteEntry, setDeleteEntry] = useState(null);
  const [notificationData, setNotificationData] = useState(null);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${URL}/notifications`);
      setNotificationData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}/home`);
      if (!response.ok) {
        throw new Error('Having errors fetching milk details');
      }
      const result = await response.json();
      result.forEach((entry) => {
        entry.associated_milks.forEach((milk) => {
          milk.express_time_str = dateTimeToString(unixToDatetimeLocal(milk.express_time));
          milk.expiration_time_str = dateTimeToString(unixToDatetimeLocal(milk.expiration_time));
        });
      });
      setData(result);
      localStorage.setItem('myBabyData', JSON.stringify(result));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedData = localStorage.getItem('myBabyData');
    if (cachedData) {
      setData(JSON.parse(cachedData));
      setLoading(false);
    }
    fetchData();
    fetchNotifications();
  }, []);

  const handleRefreshAfterAdd = (newMilk) => {
    console.log('milk added');
    newMilk.express_time_str = dateTimeToString(unixToDatetimeLocal(newMilk.express_time));
    newMilk.expiration_time_str = dateTimeToString(unixToDatetimeLocal(newMilk.expiration_time));
    const updatedData = data.map((baby) =>
      baby.mrn === newMilk.baby_mrn
        ? { ...baby, associated_milks: [...baby.associated_milks, newMilk] }
        : baby
    );
    setData(updatedData);
    localStorage.setItem('myBabyData', JSON.stringify(updatedData));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleConfirmDelete = (entry) => {
    setConfirmDelete(true);
    setDeleteEntry(entry);
  };

  const handleDeleteMilk = (uid, reason, notes) => {
    let reasonData = {};
    if (reason === 'other') {
      reasonData = { notes };
    } else {
      reasonData = { reason };
    }

    axios
      .delete(`${URL}/delete_milk_entry?uid=${uid}`, { data: reasonData })
      .then(() => {
        const updatedData = data.map((entry) => ({
          ...entry,
          associated_milks: entry.associated_milks.filter((milk) => milk.uid !== uid)
        }));
        setData(updatedData);
        localStorage.setItem('myBabyData', JSON.stringify(updatedData));
        setConfirmDelete(false);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <>
      <section id="Home">
        <Navibar />
        <div className="home-container d-flex flex-row p-5 justify-content-between">
          <div className="page-container">
            <h1 className="page-title">List of Babies</h1>
            <p className="py-2 fs-5 subtitle-2">Total Number of Babies: {data.length}</p>
            <Table
              deleteMilk={handleConfirmDelete}
              displayData={data}
              setDisplayData={setData}
              setOpenModal={setOpenModal}
              viewType="viewBaby"
            />
          </div>
          {openModal && (
            <AddMilkModal
              addMilk={handleRefreshAfterAdd}
              closeModal={setOpenModal}
              version="addMilk1"
            />
          )}
          {confirmDelete && (
            <DeleteMilkModal
              entry={deleteEntry}
              closeModal={setConfirmDelete}
              deleteMilk={handleDeleteMilk}
            />
          )}
          {notificationData && (
            <Notifications
              notifData={notificationData}
              confirmDelete={handleConfirmDelete}></Notifications>
          )}
        </div>
      </section>
    </>
  );
}
