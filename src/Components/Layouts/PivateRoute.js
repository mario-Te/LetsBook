import Login from "../Pages/Login";
import { Navigate } from "react-router-dom";
import RegisterPage from "../Pages/RegisterPage";
import Show from "../Pages/Show";
import Profile from "../Pages/Profile";

export const LoginRoute = (props) => {
  const auth = props.Index;
  return auth ? <Navigate to={`/profile/${auth}`} /> : <Login />;
};
export const RegisterRoute = (props) => {
  const auth = props.Index;
  return auth ? <Navigate to={`/profile/${auth}`} /> : <RegisterPage />;
};
export const DashboardRoute = (props) => {
  const auth = props.Index;
  return !auth ? <Navigate to="/login" /> : <Profile />;
};
export const BookRoute = (props) => {
  const auth = props.Index;
  return !auth ? <Navigate to="/login" /> : <Show />;
};
