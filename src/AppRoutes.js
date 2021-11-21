import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import Room from "./components/Room";
import LoginScreen from "./components/LoginScreen";

export default function AppRoutes() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route exact path={"/"} element={<LoginScreen />} />
          <Route exact path={"/create-room"} element={<Room />} />
        </Routes>
      </Fragment>
    </Router>
  );
}
