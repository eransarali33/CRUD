import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [showTable, setShowTable] = useState(false);

  // Get Method
  const getData = () => {
    axios
      .get("http://localhost:3300/comments")
      .then((res) => {
        setData(res.data);
        setShowTable(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // Post Method
  const postData = () => {
    axios
      .post("http://localhost:3300/comments", { id, name, address })
      .then((response) => {
        setData(response.data);
        setId("");
        setName("");
        setAddress("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete Method
  const deleteData = (id) => {
    axios
      .delete(`http://localhost:3300/comments/${id}`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Put Method
  const updateData = (id) => {
    axios
      .put(`http://localhost:3300/comments/${id}`, { id, name, address })
      .then((result) => {
        setData(result.data);
        setId("");
        setName("");
        setAddress("");
        setIsEditing(false);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to update
  const handleEdit = (id, name, address) => {
    setId(id);
    setName(name);
    setAddress(address);
    setIsEditing(true);
    setEditId(id);
  };

  const toggleTable = () => {
    setShowTable(!showTable);
  };
  return (
    <>
      <form>
        <h2>CRUD Operations</h2>
        {showTable ? (
          <button type="button" onClick={toggleTable}>
            Hide Data
          </button>
        ) : (
          <button type="button" onClick={getData}>
            Get Data
          </button>
        )}
        <br />
        <input
          type="number"
          placeholder="Enter Your Id"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Enter Your Address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <br />
        {isEditing ? (
          <button type="button" onClick={() => updateData(editId)}>
            Update
          </button>
        ) : (
          <button type="button" onClick={postData}>
            Submit
          </button>
        )}
      </form>
      {showTable && (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Address</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((elem, index) => (
              <tr key={index}>
                <td>{elem.id}</td>
                <td>{elem.name}</td>
                <td>{elem.address}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleEdit(elem.id, elem.name, elem.address)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteData(elem.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
