import React, { useState } from "react";
import axios from "axios";

function ListUser() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost/api/index.php", inputs)
      .then((response) => {
        console.log("Success:", response.data);
        console.log(inputs);
        alert("User added successfully!");
      
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add user!");
      });
  };

  return (
    <div>
      <h4>List User</h4>
      <form onSubmit={handleSubmit}>
        <table cellPadding="8">
          <tbody>
            <tr>
              <td><label htmlFor="name">Name:</label></td>
              <td>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="email">Email:</label></td>
              <td>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="contact">Contact #:</label></td>
              <td>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={inputs.contact}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="center">
                <button type="submit">Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default ListUser;
