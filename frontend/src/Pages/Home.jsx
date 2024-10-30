import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import axios from "axios";
import { Navibar } from "../Components/Navibar";
import { AddMilkModal } from "../Components/AddMilkModal";
import axios from "axios";
import { Table } from "../Components/Table";
import { DeleteMilkModal } from "../Components/DeleteMilkModal";
import { Notifications} from "../Components/Notifications"

export { Home };

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = "http://127.0.0.1:5001";

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${URL}/notifications`);
      setNotificationData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}/home`);
      if (!response.ok) {
        throw new Error('Having errors fetching milk details');
      }
      const result = await response.json();
      setData(result);
      localStorage.setItem('myMilkData', JSON.stringify(result)); 
    } catch (error) {
      setError(error); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    const cachedData = localStorage.getItem('myMilkData');
    if (cachedData) {
      setData(JSON.parse(cachedData));
      setLoading(false);
    }
    fetchData();
    fetchNotifications();
  }, []);

  const handleRefresh = (newMilk) => {
    data.unshift(newMilk);
    localStorage.setItem('myMilkData', JSON.stringify(data)); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleConfirmDelete = (entry) => {
    console.log(`deleting ${entry.uid}, pop uppppp`)
    setConfirmDelete(true);
    setDeleteEntry(entry);
  }

  const handleDeleteMilk = (uid) => {
    console.log(uid);
    axios.delete(`${URL}/delete_milk_entry?uid=${uid}`)
      .then(_ => {
        console.log(`Deleted milk with ID ${uid}`);
        const updatedData = data.filter(item => item.uid !== uid);
        setData(updatedData);
        localStorage.setItem('myMilkData', JSON.stringify(updatedData));
        setConfirmDelete(false);
      })
      .catch(error => {
        console.error(error);
        setError(error);
      });
  }

  
  return (
    <>
      <section id="Home">
        <Navibar />
        <div className="page-container">
          <h1 className="page-title">List of Milk Entries</h1>
          <p>Total Number of Milk Entries: {data.length}</p>
          <Table data={data} setOpenModal = {setOpenModal} viewType="viewMilk"/>
        </div>
        {openModal && (
          <AddMilkModal addMilk={handleRefresh} closeModal={setOpenModal} version="addMilk1" />
        )}
      </section>
    </>
  );
}
