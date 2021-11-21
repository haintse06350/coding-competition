import React from "react";
const PrivateRoute = ({ children }) => {
  const authed = true;

  return authed ? children : <Navigate to="/" />;
};
