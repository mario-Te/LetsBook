import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./Blogs";
import NavBar from "../Layouts/Navbar";
import Homepage from "./Homepage";
import { useState, useEffect, createContext } from "react";
import { LoginRoute, RegisterRoute, BookRoute } from "../Layouts/PivateRoute";
import Profile from "./Profile";
export const CurrentUser = createContext({});
function App() {
  let item_stored = JSON.parse(localStorage.getItem("MY_Current_User"));
  const [user, setUser] = useState({
    ...item_stored,
  });
  useEffect(() => {
    localStorage.setItem("MY_Current_User", JSON.stringify(user));
  }, [user]);
  return (
    <BrowserRouter>
      <CurrentUser.Provider value={[user, setUser]}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="register" element={<RegisterRoute Index={user.id} />} />
          <Route path="book/:id" element={<BookRoute Index={user.id} />} />
          <Route path="login" element={<LoginRoute Index={user.id} />} />
          <Route path="profile/:uid" element={<Profile />} />
          {/*
          <Route
            path="dashboard"
            element={<DashboardRoute Index={user.id} />}
          />*/}
        </Routes>
      </CurrentUser.Provider>
    </BrowserRouter>
  );
}

export default App;
