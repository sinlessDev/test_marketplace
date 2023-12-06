import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

const PrivateRoutes = () => {
  const { user } = useAuth();
  console.log(user);

  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
