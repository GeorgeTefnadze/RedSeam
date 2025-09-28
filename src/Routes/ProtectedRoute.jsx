import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");

  if (!user) {
    // if user is not logged in protect other routes and bring user to login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
