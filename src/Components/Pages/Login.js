import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { CurrentUser } from "./App";
import md5 from "md5";
const Login = () => {
  const [sessionuser, setSessionUser] = useContext(CurrentUser);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "userName") {
      setUserName(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:3001/auth/login", {
        username: userName,
        password: password,
      })
      .then((response) => {
        console.log(response);
        setSessionUser({
          id: response.data.ID,
          name: userName,
        });
      })
      .catch((error) => {
        // Error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the
          // browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
  return (
    <div>
      <div className="row col-12 d-flex mt-5 text-white">
        <div className="form col-12 col-md-6 ">
          <h1 className="nunito-bold text-white text-center  ">LetsBook Now</h1>
          <div className="form-body col-md-8 offset-2">
            <div className="username text-center ">
              <label className="form__label" htmlFor="firstName">
                UserName
              </label>
              <input
                className="form__input p-1"
                onChange={(e) => handleInputChange(e)}
                type="text"
                id="userName"
                placeholder="UserName"
              />
            </div>
            <div className="password text-center ">
              <label className="form__label" htmlFor="password">
                Password{" "}
              </label>
              <input
                className="form__input p-1"
                type="password"
                id="password"
                onChange={(e) => handleInputChange(e)}
                placeholder="Password"
              />
            </div>
          </div>
          <div className="footer text-center ">
            <button
              onClick={() => handleSubmit()}
              type="submit"
              className="btn  "
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
