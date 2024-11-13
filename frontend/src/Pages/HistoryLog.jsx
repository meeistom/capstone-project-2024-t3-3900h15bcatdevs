import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navibar } from '../Components/Navibar';

export { HistoryLog };

function HistoryLog() {
  // const [milkEntries, setMilkEntries] = useState([]);

  // // Fetch milk entries from the server
  // useEffect(() => {
  //   const url = `http://localhost:5001/milk_entries`;
  //   axios.get(url)
  //     .then(response => {
  //       console.log(response.data);
  //       if (Array.isArray(response.data)) {
  //         setMilkEntries(response.data);
  //         return response.data;
  //       }
  //       return [];
  //     })
  //     .then(entries => {
  //       entries.forEach(entry => {
  //         const motherUrl = `http://localhost:5001/mothers?mrn=${entry.owner_mrn}`;
  //         axios.get(motherUrl)
  //           .then(motherResponse => {
  //             // Append mother data to each milk entry
  //             entry.mother = motherResponse.data;
  //             setMilkEntries(currentEntries => {
  //               // Find the current entry and update it with mother data
  //               const updatedEntries = currentEntries.map(e =>
  //                 e.uid === entry.uid ? {...e, mother: motherResponse.data} : e
  //               );
  //               return updatedEntries;
  //             });
  //           })
  //           .catch(error => {
  //             console.error(`Error fetching mother details for MRN ${entry.owner_mrn}:`, error);
  //           });
  //       });
  //     })
  //     .catch(error => {
  //       console.error('Error fetching milk entries:', error);
  //     });
  // }, []);

  return (
    <>
      <section id="Home">
        <Navibar />
        log
        {/* <div>
          <h2>Milk Entries Log</h2>
          {milkEntries.length > 0 ? (
            <ul>
              {milkEntries.map((entry, index) => (
                <li key={index}>
                  MilkID: {entry.uid}, Baby of Mother:{" "}
                  {entry.mother
                    ? `${entry.mother.first_name} ${entry.mother.last_name}`
                    : "Loading..."}
                  , Storage Location: {entry.storage_location}, Storage Type:{" "}
                  {entry.storage_type}, Expiry Time: {entry.expiration_date},
                  Notes: {entry.extra_notes}
                </li>
              ))}
            </ul>
          ) : (
            <p>No milks in the system.</p>
          )}
        </div> */}
      </section>
    </>
  );
}
