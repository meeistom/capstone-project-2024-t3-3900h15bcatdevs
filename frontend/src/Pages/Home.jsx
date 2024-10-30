import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navibar } from "../Components/Navibar";
import "../index.css";
import { AddMilkModal } from "../Components/AddMilkModal";
import axios from "axios";
import { Table } from "../Components/Table";
import { Notifications} from "../Components/Notifications"

export { Home };

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notificationData, setNotificationData] = useState(null);
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
      localStorage.setItem('myData', JSON.stringify(result)); 
    } catch (error) {
      setError(error); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    const cachedData = localStorage.getItem('myData');
    if (cachedData) {
      setData(JSON.parse(cachedData));
      setLoading(false);
    }
    fetchData();
    fetchNotifications();
  }, []);

  const handleRefresh = (newMilk) => {
    data.unshift(newMilk);
    localStorage.setItem('myData', JSON.stringify(data)); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <section id="Home">
        <Navibar />
        <div className="home-container">
          <div className="page-container">
            <h1 className="page-title">List of Milk Entries</h1>
            <p>Total Number of Milk Entries: {data.length}</p>
            <Table data={data} setOpenModal = {setOpenModal} viewType="viewMilk"/>
          </div>
          {openModal && (
            <AddMilkModal addMilk={handleRefresh} closeModal={setOpenModal} version="addMilk1" />
          )}
        {notificationData && (
          <Notifications notifData={notificationData} setOpenModal={{setOpenModal}}></Notifications>
        )}
        </div>
      </section>
    </>
  );
}
