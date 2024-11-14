import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navibar } from '../Components/Navibar';
import { Table } from '../Components/Table';
import { URL } from '../constants';

export { ViewBabies };

function ViewBabies() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}/babies`);
      if (!response.ok) {
        throw new Error('Having errors fetching baby details');
      }
      const result = await response.json();
      setData(result);
      localStorage.setItem('myBabyData', JSON.stringify(result));
    } catch (error) {
      setError(error);
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <section id="viewBaby">
        <Navibar />
        <div className="babies d-flex flex-row p-5 justify-content-center">
          <div className="page-container">
            <h1 className="page-title">Babies</h1>
            <p className="py-2 fs-5 subtitle-2">Total number of babies: {data.length}</p>
            <Table
              delete={null}
              displayData={data}
              setDisplayData={setData}
              setOpenModal={null}
              viewType="viewBaby"
            />
          </div>
        </div>
      </section>
    </>
  );
}
