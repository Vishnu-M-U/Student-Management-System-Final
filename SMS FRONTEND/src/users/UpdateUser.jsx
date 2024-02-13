import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateUser() {
  let navigate = useNavigate();

  //Acecess the parameters in the URL
  const { id } = useParams();

  const [student, setStudent] = useState({
    id: "",
    name: "",
    maths: "",
    physics: "",
    chemistry: "",
    biology: "",
    english: "",
  });

  const onInputChange = (e) => {
    setStudent({ ...student, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/demo/update/${id}`, student);
    navigate("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/demo/get/${id}`);
    setStudent(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Update Student</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                Id
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter your Id"
                id="id"
                value={student.id}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Name"
                id="name"
                value={student.name}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Subject" className="form-label">
                Maths
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter marks in Maths"
                id="maths"
                value={student.maths}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Subject" className="form-label">
                Physics
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter marks in Physics"
                id="physics"
                value={student.physics}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Subject" className="form-label">
                Chemistry
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter marks in Chemistry"
                id="chemistry"
                value={student.chemistry}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Subject" className="form-label">
                Biology
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter marks in Biology"
                id="biology"
                value={student.biology}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Subject" className="form-label">
                English
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter marks in English"
                id="english"
                value={student.english}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="m-3 text-center">
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-outline-danger mx-2"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
