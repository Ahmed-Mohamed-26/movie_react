import { Route, Redirect } from "react-router-dom";

// Create a PrivateRoute component
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("isActive") === "true" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/register" />
        )
      }
    />
  );
};

export default PrivateRoute;
