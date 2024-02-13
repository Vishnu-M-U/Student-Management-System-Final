import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight, faArrowLeft ,faFastBackward,faFastForward} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState([]);
  const [pageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.ceil(totalCount / pageSize);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const searchName = () => {
    const requestData = {
      name: searchTerm,
    };

    axios
      .post(`http://localhost:8080/demo/post/search`, requestData)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => console.error("error", error));
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async () => {
    try {
      const countResponse = await axios.get(`http://localhost:8080/demo/count`);
      const totalStudents = countResponse.data;
      // const totalStudents = await axios.get(`http://localhost:8080/demo/count`);

      const response = await axios.get(
        `http://localhost:8080/demo/get?page=${page}`
      );
      setStudents(response.data);
      setTotalCount(totalStudents);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNextPage = () => {
    setPage((currentPage) => currentPage + 1);
  };
  const handlePreviousPage = () => {
    setPage((currentPage) => currentPage - 1);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/demo/delete/${id}`);
    loadUsers();
  };

  const sortName = async () => {
    const result = await axios.get(
      "http://localhost:8080/demo/get/sortascending"
    );
    setStudents(result.data);
    document.getElementById("asc").classList.add("hiding");
    document.getElementById("desc").classList.remove("hiding");
  };

  const sortNames = async () => {
    const result = await axios.get(
      "http://localhost:8080/demo/get/sortdescending"
    );
    setStudents(result.data);
    document.getElementById("desc").classList.add("hiding");
    document.getElementById("asc").classList.remove("hiding");
  };

  const totalMarks = (students) => {
    let total =
      students.maths +
      students.physics +
      students.chemistry +
      students.biology +
      students.english;
    return total;
  };
  const Average = (students) => {
    return Math.round(totalMarks(students) / 5 + "");
  };
  const gradeFunction = (students) => {
    if (totalMarks(students) > 450) {
      return "A+";
    } else if (totalMarks(students) > 399 && totalMarks(students) <= 450) {
      return "A";
    } else if (totalMarks(students) > 349 && totalMarks(students) <= 399) {
      return "B+";
    } else if (totalMarks(students) > 299 && totalMarks(students) <= 349) {
      return "B";
    } else {
      return "C+";
    }
  };

  const resetFunction = async () => {
    const response = await axios.get("http://localhost:8080/demo/reset");
    setStudents(response.data);
    setPage((page) => 0);
  };
  const firstPage = () => {
    setPage(0);
  };

  const lastPage = () => {
    setPage(totalPages - 1);
  };

  return (
    <div className="container">
      <div className="py-4 text-center">
        <form className="form-inline d-flex my-2">
          <div className="input-group">
            <input
              type="text"
              className="form-control mx-2 my-2"
              placeholder="Search"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <div className="input-group-append"></div>
          </div>
          <button
            className="btn btn-outline-secondary justify-content-center my-2"
            type="button"
            onClick={searchName}
          >
            Search
          </button>
        </form>
        <table className="table border table-rounded shadow table-striped text-center rounded-top">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col" className="pr-3">
                Name&nbsp;
                <FontAwesomeIcon icon={faArrowUp} id="asc" onClick={sortName} />
                <FontAwesomeIcon
                  icon={faArrowDown}
                  id="desc"
                  onClick={sortNames}
                  className="hiding"
                />
              </th>
              <th scope="col">Maths</th>
              <th scope="col">Physics</th>
              <th scope="col">Chemistry</th>
              <th scope="col">Biology</th>
              <th scope="col">English</th>
              <th scope="col">Total Marks</th>
              <th scope="col">Average</th>
              <th scope="col">Grade</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.maths}</td>
                <td>{student.physics}</td>
                <td>{student.chemistry}</td>
                <td>{student.biology}</td>
                <td>{student.english}</td>
                <td>{totalMarks(student)}</td>
                <td>{Average(student)}</td>
                <td>{gradeFunction(student)}</td>

                <td>
                  <Link
                    className="btn btn-success mx-2"
                    to={`/UpdateUser/${student.id}`}
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={resetFunction}
        >
          Reset
        </button>
        <div className="pagination  p-4 justify-content-center mb-3">
          <button
            type="button"
            className="btn btn-outline-primary m-1"
            onClick={firstPage}
            disabled={page === 0}
          >
            <FontAwesomeIcon icon={faFastBackward} />
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handlePreviousPage}
            disabled={page === 0}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          {pages.slice(page, page + 2).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              className={`btn btn-outline-primary mx-1 ${
                pageNum - 1 === page ? "active" : ""
              }`}
              onClick={() => setPage(pageNum - 1)}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleNextPage}
            disabled={page * pageSize >= totalCount - pageSize}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <button
            type="button"
            className="btn btn-outline-primary m-1"
            onClick={lastPage}
            disabled={page * pageSize >= totalCount - pageSize}
          >
            <FontAwesomeIcon icon={faFastForward} />
          </button>

        </div>
      </div>
    </div>
  );
}
