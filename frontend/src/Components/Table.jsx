import React from 'react'

export {Table};

function Table() {
  let fake_data = [
    {
      mrn: 346363,
      name: "Larkin",
      type: "fresh",
      action: "DELETE"      
    },
    {
      mrn: 346363,
      name: "Larkin",
      type: "fresh",
      action: "EDIT"      
    },
    {
      mrn: 346363,
      name: "Larkin",
      type: "fresh",
      action: "ADD"      
    }
  ]
  return (
    <div className="table-container">
      <table className="table table-striped">
      <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Baby Name</th>
        <th scope="col">Type</th>
        <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {fake_data.length > 0 ? (
          fake_data.map((item) => (
            <tr>
              <th scope="row">{item.mrn}</th>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.action}</td>
              <td className="table-btn"><button>bye</button><button>hi</button></td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">Loading...</td>
          </tr>
        )}
      </tbody>
      </table>
    </div>
  )
}

