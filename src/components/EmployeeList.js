import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Button } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { deleteEmployee } from "../actions/Employeeaction";
import { useHistory } from "react-router-dom";
const EmployeeList = () => {
  const addEmployeeData = useSelector(
    (state) => state.EmployeeReducers.addEmployeeData
  );
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <section className="showemployeeList">
        <Container>
          <table>
            <thead>
              <th> No </th>
              <th> ID </th>
              <th> FullName </th>
              <th> Email </th>
              <th> Gender </th>
              <th> Technology </th>
              <th> Action </th>
            </thead>
            <tbody>
              {addEmployeeData.length > 0
                ? addEmployeeData &&
                  addEmployeeData.map((ele, index) => {
                    console.log(ele.data);
                    return (
                      <tr key={index}>
                        <th scope="row"> {index + 1} </th>
                        <td> {ele.id}</td>
                        <td> {ele.data.fullName} </td>
                        <td> {ele.data.emailID} </td>
                        <td> {ele.data.gender} </td>
                        <td> {ele.data.technology} </td>
                        <td>
                          <Button
                            className="icon"
                            onClick={() =>
                              history.push(`/employeelistupdate/${ele.id}`)
                            }
                          >
                            <Edit />
                          </Button>
                          <Button
                            className="icon"
                            onClick={() => dispatch(deleteEmployee(ele.id))}
                          >
                            <Delete />
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                : "No data found"}
            </tbody>
          </table>
          <div className="backButton" style={{ margin: "15px 0" }}>
            <Button onClick={() => history.push("/")}>Go to Home Page</Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default EmployeeList;
