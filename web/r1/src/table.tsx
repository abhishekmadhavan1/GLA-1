import { useContext, useEffect, useState } from "react";
import { TitleContext } from "./home";

const Table = (props) => {
  // const title = props['title'];
  // const title = props.title;
  // const lable = props.lable;
  // const count = props.count;
  const { title, lable, count } = props;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const responseValue = await response.json();
    setLoading(false);

    setData(responseValue);
  };

  useEffect(() => {
    const person = {
      name: "Alice",
      age: 30,
      address: {
        city: "New York",
        zipcode: "10001",
      },
    };
    const jsonString = JSON.stringify(person);
    console.log(jsonString);
  }, []);

  const deleteRow = (indexToRemove) => {
    const filteredData = [];
    data.map((item, idx) => {
      if (idx != indexToRemove) {
        filteredData.push(item);
      }
    });
    setData(filteredData);
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
      </div>
      <h1>Table Content</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button onClick={() => getData()}>Get Data</button>

        <button onClick={() => setData([])}>Reset Data</button>
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
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
              {data.map((item, idx) => {
                return (
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <button
                        onClick={() => {
                          deleteRow(idx);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default Table;
