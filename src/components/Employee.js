import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TextField,
  Toolbar,
  Container,
  Typography,
  makeStyles,
  Button,
  MenuItem,
  Select,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { addEmployee } from "../actions/Employeeaction";
const useStyles = makeStyles((theme) => ({
  addBookForm: {
    textAlign: "center",
    margin: "0 0 50px",
  },
  formTitle: {
    margin: "30px 0",
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "500",
    lineHeight: "35px",
    color: "orange",
  },
  inputTextFields: {
    margin: "0 0 15px",
    textAlign: "center",
  },
  inputWidth: {
    width: "100%",
    margin: "0 0 15px",
  },

  submitButton: {
    textAlign: "center",
    margin: "0 0 10px",
  },
  formSection: {
    border: "2px solid #111",
    padding: "30px",
    display: "inline-block",
    boxShadow: "3px 5px 5px 3px rgba(0,0,0,0.5)",
    width: "500px",
    [theme.breakpoints.down("xs")]: {
      width: "auto",
    },
  },
  SignInLinks: {
    color: "orange",
    fontSize: "15px",
    fontWeight: "600",
    lineHeight: "20px",
    textDecoration: "none",
  },
}));
const Employee = () => {
  const classes = useStyles();
  const history = useHistory();
  const addEmployeeData = useSelector(
    (state) => state.EmployeeReducers.addEmployeeData
  );
  const [open, setOpen] = useState(false);

  const [basicdetails, setBasicDetails] = useState({
    fullName: "",
    gender: "",
    technology: "",
    emailID: "",
    movie: false,
  });

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onhandlerChange = (e) => {
    const { name, value } = e.target;
    setBasicDetails({ ...basicdetails, [name]: value });
  };

  const onhandlerchangeCheckbox = (e) => {
    const { name, checked } = e.target;
    setBasicDetails({ ...basicdetails, [name]: checked });
  };

  const onSubmitButton = async () => {
    const isExist = await findUnique(basicdetails.emailID);
    if (isExist) {
      alert("EmailID is Already Exit! Please Enter New EmailID");
    } else {
      dispatch(
        addEmployee(basicdetails),
        setBasicDetails({
          fullName: "",
          gender: "",
          technology: "",
          movie: "",
          emailID: "",
        })
      );
    }
  };

  const findUnique = (userEmail) => {
    const isEmailExist = addEmployeeData.some((ele) => {
      return ele.data.emailID === userEmail;
    });
    return isEmailExist;
  };

  return (
    <>
      <Toolbar></Toolbar>
      <section className={classes.addBookForm}>
        <Container>
          <Typography variant="h3" className={classes.formTitle}>
            Add Basic Data Form
          </Typography>
          <form className={classes.formSection}>
            <InputLabel id="demo-controlled-open-select-label">
              Please Select Menu
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              name="technology"
              onClose={handleClose}
              onOpen={handleOpen}
              value={basicdetails.technology}
              onChange={onhandlerChange}
              className={classes.inputWidth}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"ReactJs"}> ReactJs </MenuItem>
              <MenuItem value={"AngulerJs"}>AngulerJs</MenuItem>
              <MenuItem value={"Mobile Application"}>
                Mobile Application
              </MenuItem>
            </Select>

            <div className={classes.inputTextFields}>
              <TextField
                label="FullName"
                name="fullName"
                variant="outlined"
                type="name"
                value={basicdetails.fullName}
                autoComplete="off"
                onChange={onhandlerChange}
                className={classes.inputWidth}
                required
              />
            </div>

            <div className={classes.inputTextFields}>
              <TextField
                label="EmailID"
                name="emailID"
                variant="outlined"
                type="email"
                value={basicdetails.emailID}
                autoComplete="off"
                onChange={onhandlerChange}
                className={classes.inputWidth}
                required
              />
            </div>

            <FormLabel
              component="legend"
              style={{ margin: "10px 0", textAlign: "left" }}
            >
              Gender
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={basicdetails.gender}
              onChange={onhandlerChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            <FormLabel
              component="legend"
              style={{ margin: "10px 0", textAlign: "left" }}
            >
              Hobbies
            </FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  name="movie"
                  checked={basicdetails.movie}
                  onChange={onhandlerchangeCheckbox}
                />
              }
              label="Movie"
              style={{ float: "left", width: "100%", margin: "0 0 10px" }}
            />

            <div className={classes.submitButton}>
              <Button onClick={onSubmitButton}> Submit </Button>
              <Button onClick={() => history.push("/employeelist")}>
                EmployeeList
              </Button>
            </div>
          </form>
        </Container>
      </section>
    </>
  );
};

export default Employee;
