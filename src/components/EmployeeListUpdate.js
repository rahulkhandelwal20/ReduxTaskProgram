import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
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
import { connect } from "react-redux";
import { employeeInfo, updateEmployee } from "../actions/Employeeaction";
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
const EmployeeListUpdate = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const addEmployeeData = useSelector(
    (state) => state.EmployeeReducers.addEmployeeData
  );
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const [basicdetails, setBasicDetails] = useState({
    fullName: "",
    gender: "",
    technology: "",
    movie: false,
  });

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

  useEffect(() => {
    props.getEmployeeDetail(props.match.params.id);
    const userdata = addEmployeeData?.filter(
      (getEmployeeData) => getEmployeeData.id === props.match.params.id
    );
    console.log("ddddddddddd111111", userdata[0].data);
    const { fullName, gender, technology, movie } = userdata[0].data;
    setBasicDetails({
      fullName: fullName,
      gender: gender,
      technology: technology,
      movie: movie,
    });
  }, []);

  const onhandlerUpdateList = () => {
    const userdata = addEmployeeData?.filter(
      (getEmployeeData) => getEmployeeData.id === props.match.params.id
    );
    userdata[0].data.fullName = basicdetails.fullName;
    userdata[0].data.gender = basicdetails.gender;
    userdata[0].data.technology = basicdetails.technology;
    userdata[0].data.movie = basicdetails.movie;
    dispatch(updateEmployee(addEmployeeData));
    debugger;
    alert("Update SuccessFully Your Accounts");
  };

  console.log("dddddddddddd", addEmployeeData);
  return (
    <>
      <Toolbar></Toolbar>
      <section className={classes.addBookForm}>
        <Container>
          <Typography variant="h3" className={classes.formTitle}>
            Update Data Form
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
                value={basicdetails.fullName || ""}
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
              value={basicdetails.gender || ""}
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
                  checked={basicdetails.movie || ""}
                  onChange={onhandlerchangeCheckbox}
                />
              }
              label="Movie"
              style={{ float: "left", width: "100%", margin: "0 0 10px" }}
            />

            <div className={classes.submitButton}>
              <Button onClick={() => onhandlerUpdateList()}>Update</Button>

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

const mapStateToProps = (state) => {
  return {
    myEmployees: state.EmployeeReducers.addEmployeeData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployeeDetail: (id) => {
      dispatch(employeeInfo(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeListUpdate);
