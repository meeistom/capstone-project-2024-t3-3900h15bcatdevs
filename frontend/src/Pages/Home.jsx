import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import axios from "axios";
import { Navibar } from "../Components/Navibar";
import { AddMilkModal } from "../Components/AddMilkModal";
import { Table } from "../Components/Table";
import { DeleteMilkModal } from "../Components/DeleteMilkModal";
import { Notifications } from "../Components/Notifications";
import { URL } from "../constants";

export { Home };

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(null);
  const [displayData, setDisplayData] = useState(null);
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
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}/home`);
      if (!response.ok) {
        throw new Error("Having errors fetching milk details");
      }
      const result = await response.json();
      setData(result);
      setDisplayData(result);
      localStorage.setItem("myBabyData", JSON.stringify(result));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedData = localStorage.getItem("myBabyData");
    if (cachedData) {
      setData(JSON.parse(cachedData));
      setDisplayData(JSON.parse(cachedData));
      setLoading(false);
    }
    fetchData();
    fetchNotifications();
  }, []);

  const handleRefreshAfterAdd = (newMilk) => {
    const updatedData = data.map((baby) => 
      baby.mrn === newMilk.baby_mrn ? {...baby, associated_milks: [...baby.associated_milks, newMilk]} : baby
    );
    setData(updatedData);
    setDisplayData(updatedData);
    localStorage.setItem("myBabyData", JSON.stringify(updatedData));
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
    console.log(reason, notes);
    axios
      .delete(`${URL}/delete_milk_entry?uid=${uid}`)
      .then((_) => {
        const updatedData = data.filter((item) => item.uid !== uid);
        setData(updatedData);
        setDisplayData(updatedData);
        localStorage.setItem("myBabyData", JSON.stringify(updatedData));
        setConfirmDelete(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  };

  return (
    <>
      <section id="Home">
        <Navibar />
        <div className="home-container">
          <div className="page-container">
            <h1 className="page-title">List of Babies</h1>
            <p>Total Number of Babies: {data.length}</p>
            <Table
              deleteMilk={handleConfirmDelete}
              displayData={displayData}
              setDisplayData={setDisplayData}
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
              confirmDelete={handleConfirmDelete}
            ></Notifications>
          )}
        </div>
      </section>
    </>
  );
}
