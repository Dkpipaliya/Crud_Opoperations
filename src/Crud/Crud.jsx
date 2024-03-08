import React, { useState } from "react";
import * as Yup from "yup";

function Crud() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [edt, setEdt] = useState(-1);
  const [errors, setErrors] = useState({});

  // Define Yup schema
  const schema = Yup.object().shape({
    id: Yup.number().required("ID is required"),
    // idnum: Yup.number().required("ID is required"),
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const validateForm = async () => {
    try {
      await schema.validate({ id, name, email }, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const errors = {};
      validationErrors.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setErrors(errors);
      return false;
    }
  };

  const AddHandler = async () => {
    const isValid = await validateForm();
    if (isValid) {
      if (edt >= 0) {
        const copydata = [...data];
        copydata.splice(edt, 1, { id: id, name: name, email: email });
        setData(copydata);
        setEdt(-1);
      } else {
        setData([...data, { id: id, name: name, email: email }]);
      }
      setName("");
      setId("");
      setEmail("");
    }
  };

  const DeletHandler = (index) => {
    setData([...data].filter((el, i) => i !== index));
  };

  const EditHandler = (index) => {
    const { id, name, email } = data[index];
    setId(id);
    setName(name);
    setEmail(email);
    setEdt(index);
  };

  return (
    <div className="container">
      <h1 className="display-4 text-center capitalize">
        CRUD Operations with Hooks
      </h1>
      <div className="card shadow p-3">
        <div className="d-flex">
          <div className="col-6">
            <h2>Add user</h2>
            <label htmlFor="id">ID</label>
            <br />
            <input
              type="number"
              className="form-control"
              name="id"
              id="id"
              value={id}
              onChange={(evt) => setId(evt.target.value)}
            />
            {errors.id && <p>{errors.id}</p>}

            <br />
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              value={name}
              onChange={(evt) => setName(evt.target.value)}
            />
            {errors.name && <p>{errors.name}</p>}
            <br />
            <label htmlFor="Email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
            {errors.email && <p>{errors.email}</p>}
            <br />
            <button className="btn btn-primary btn-lg" onClick={AddHandler}>
              Add New User
            </button>
          </div>

          <div className="col-6" style={{ marginLeft: "10px" }}>
            <h2>View users</h2>
            <table className="table table-success table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((el, index) => {
                    return (
                      <tr key={index}>
                        <td>{el.id}</td>
                        <td>{el.name}</td>
                        <td>{el.email}</td>
                        <td>
                          <button onClick={() => DeletHandler(index)}>
                            Delete
                          </button>
                          <button onClick={() => EditHandler(index)}>
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4">No Users</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Crud;
