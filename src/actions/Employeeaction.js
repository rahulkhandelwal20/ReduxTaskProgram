export const addEmployee = (newemployee) => {
  return {
    type: "ADD_EMPLOYEE",
    playload: {
      id: new Date().getTime().toString(),
      data: newemployee,
    },
  };
};

export const deleteEmployee = (id) => {
  return {
    type: "DELETE_EMPLOYEE",
    id,
  };
};

export const employeeInfo = (id) => {
  return {
    type: "EMPLOYEE_INFO",
    id,
  };
};

export const updateEmployee = (updatedata) => {
  return {
    type: "UPDATE_EMPLOYEE",
    payload: {
      id: new Date().getTime().toString(),
      data: updatedata,
    },
  };
};
