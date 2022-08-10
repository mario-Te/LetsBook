import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUser } from "./App";
import md5 from "md5";
import axios from "axios";
const Register = () => {
  const [sessionuser, setSessionUser] = useContext(CurrentUser);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [msg, setMsg] = useState("");
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "userName") {
      setUserName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password" && value.length > 7) {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = () => {
    if (confirmPassword === password && re.test(email)) {
      axios
        .post("http://localhost:3001/auth/register", {
          username: userName,
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response);
          setMsg(response.data.Message);
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
    } else setMsg("Check your Crenditial ");
  };
  return (
    <div>
      <div className="row col-12 d-fle mt-5 text-white">
        <div className="form col-12 col-md-8 ">
          <h1 className="nunito-bold text-white text-center  ">
            Get Started with LetsBook
          </h1>
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

            <div className="email text-center ">
              <label className="form__label" htmlFor="email">
                Email{" "}
              </label>
              <input
                type="email"
                id="email"
                className="form__input p-1"
                onChange={(e) => handleInputChange(e)}
                placeholder="Email"
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
            <div className="confirm-password text-center ">
              <label className="form__label" htmlFor="confirmPassword">
                Confirm Password{" "}
              </label>
              <input
                className="form__input p-1"
                type="password"
                id="confirmPassword"
                onChange={(e) => handleInputChange(e)}
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div className="footer text-center ">
            <button
              onClick={() => handleSubmit()}
              type="submit"
              className="btn  "
            >
              Register
            </button>

            {msg && (
              <div className="alert alert-danger alert-dismissible fade show offset-md-4 col-md-4 my-3">
                <strong>{msg}</strong>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  onClick={() => setMsg("")}
                ></button>
              </div>
            )}
            <div className="p-2 font-ls nunito-bold">
              Already have an account
              <Link to="/login"> LetsLogin</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
