const initialState = {
  addEmployeeData: [],
  editEmployee: [],
};

const EmployeeReducers = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return {
        ...state,
        addEmployeeData: [...state.addEmployeeData, action.playload],
      };

    case "DELETE_EMPLOYEE":
      const deleteEmployee = state.addEmployeeData.filter(
        (deleteEmployeeData) => deleteEmployeeData.id !== action.id
      );
      debugger;
      return {
        ...state,
        addEmployeeData: deleteEmployee,
      };

    case "EMPLOYEE_INFO":
      const employeedetails = state.addEmployeeData?.filter(
        (getEmployeeData) => getEmployeeData.id === action.id
      );
      console.log("actionid", action.id);
      return {
        ...state,
        editEmployee: employeedetails,
      };

    case "UPDATE_EMPLOYEE":
      debugger;
      return {
        ...state,
        addEmployeeData: state.addEmployeeData.map((content) =>
          content.id === action.payload.id
            ? {
                ...content,
                fullName: action.payload.fullName,
                gender: action.payload.gender,
                technology: action.payload.technology,
                movie: action.payload.movie,
              }
            : content
        ),
      };

    default:
      return state;
  }
};

export default EmployeeReducers;
