import React, { useState } from "react";
import api from "./axios";
import RegisterForm from "./register";
import { useUser } from "./App";
import Logout from "./logOut";

const Table = (props) => {
  const { title, lable, count } = props;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { currentUser } = useUser();

  const getData = async () => {
    setLoading(true);
    const response = await api.post("/get/users", {'name': 'asmpleName'});
    const responseValue = await response.data;
    setLoading(false);

    setData(responseValue);
  };

  const edit = (item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          border: "2px solid red",
        }}
      >
        {title}
        {currentUser && `By ${currentUser.fullName}`}
      </div>
      <h1>Table Content</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button onClick={() => getData()}>Get Data</button>
        <button onClick={() => setData([])}>Reset Data</button>
        <Logout />
      </div>
      <br />
      <br />
      {loading && <h1>Loading...</h1>}
      {!loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{item.fullName}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>{item.password}</td>
                      <td>
                        <button onClick={() => edit(item)}>Edit</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "600px",
          height: "100%",
          backgroundColor: "white",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
          padding: "20px",
          zIndex: 1000,
        }}
      >
        <button onClick={closeDrawer} style={{ float: "right" }}>
          Close
        </button>
        <h2>Edit User</h2>
        {selectedItem && (
          <>
            <div>
              <p>Name: {selectedItem.fullName}</p>
              <p>Email: {selectedItem.email}</p>
              <p>Phone: {selectedItem.mobile}</p>
            </div>
            <RegisterForm
              buttonLabel="Edit"
              defaultValue={selectedItem}
              closeDrawer={closeDrawer}
              setData={setData}
            />
          </>
        )}
      </div>
      {drawerOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={closeDrawer}
        />
      )}
    </>
  );
};

export default Table;
