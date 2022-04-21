import "./App.css";
import { Switch, Route } from "react-router-dom";
import Employee from "./components/Employee";
import EmployeeList from "./components/EmployeeList";
import EmployeeListUpdate from "./components/EmployeeListUpdate";
import EnhancedTable from "./components/EnhancedTable";
import SortingEmployeeList from "./components/SortingEmployeeList";
import ReactTableHook from "./components/ReactTableHook";
function App() {
  return (
    <Switch>
      <Route exact path="/" component={Employee}></Route>
      <Route exact path="/employeelist" component={EmployeeList}></Route>
      <Route
        exact
        path="/employeelistupdate/:id"
        component={EmployeeListUpdate}
      ></Route>
      <Route exact path="/enchancedtable" component={EnhancedTable}></Route>
      <Route exact path="/reacthooktable" component={ReactTableHook}></Route>
      <Route exact path="/sortingtable" component={SortingEmployeeList}></Route>
    </Switch>
  );
}

export default App;
