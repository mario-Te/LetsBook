import CardContainer from "../Layouts/CardContainer";
import { useState } from "react";
import { useEffect, useMemo, useRef, useContext } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CurrentUser } from "./App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/fontawesome-free-solid";
import moment from "moment";
function Dashboard(props) {
  const options = useMemo(() => countryList().getData(), []);
  const [sessionuser, setSessionUser] = useContext(CurrentUser);
  const [cardsData, setCardsData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [Country, setCountry] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd_n1, setPwdN1] = useState("");
  const [pwd_n2, setPWDN2] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const hiddenFileInput = useRef(null);
  const [Loading, setLoading] = useState(true);
  let { uid } = useParams();
  const [active1, setActive1] = useState(true);
  const [active2, setActive2] = useState(false);
  const [pwdchg, setPwdChg] = useState(false);
  const fetchDataUser = () => {
    axios
      .get("http://localhost:3001/auth/GetUserID", {
        params: {
          IDD: uid,
        },
      })
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // Error
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  }; // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleGeneralinfo = () => {
    axios
      .post("http://localhost:3001/auth/updateinfo", {
        IDD: uid,
        Email: userData.Email,
        FirstName: userData.FirstName,
        LastName: userData.LastName,
        Country: Country.label,
        Birthdate: userData.Birthdate,
        Mobile: userData.Mobile,
        NewPassword: pwd_n1,
      })
      .then(() => {
        fetchDataUser();
      })
      .catch((error) => {
        // Error
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
  const changePassword = () => {
    if (pwd_n2 === pwd_n1) {
      axios
        .post("http://localhost:3001/auth/changepwd", {
          IDD: uid,
          OldPassword: pwd,
          NewPassword: pwd_n1,
        })
        .then(() => {
          setPwdChg(true);
        })
        .catch((error) => {
          // Error
          if (error.response) {
            console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "fname") {
      setUserData((prevState) => ({
        ...prevState,
        FirstName: value,
      }));
    }
    if (id === "lname") {
      setUserData((prevState) => ({
        ...prevState,
        LastName: value,
      }));
    }
    if (id === "birthdate") {
      setUserData((prevState) => ({
        ...prevState,
        Birthdate: value,
      }));
    }
    if (id === "mobile") {
      setUserData((prevState) => ({
        ...prevState,
        Mobile: value,
      }));
    }
    if (id === "mail") {
      setUserData((prevState) => ({
        ...prevState,
        Email: value,
      }));
    }
    if (id === "pwd") {
      setPwd(value);
    }
    if (id === "pwd_n1") {
      setPwdN1(value);
    }
    if (id === "pwd_n2") {
      setPWDN2(value);
    }
  };
  const changeCountryHandler = (e) => {
    setCountry(e);
  };
  const SubmitImg = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("ID", uid);
    try {
      const res = await axios.post(
        "http://localhost:3001/images/upload",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };
  const fetchDataShows = () => {
    fetch("http://localhost:3001/shows/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCardsData(data);
      });
  };
  useEffect(() => {
    fetchDataShows();
    fetchDataUser();
  }, []);
  return (
    !Loading &&
    ((sessionuser.id === userData.id && (
      <section className="Profile-Section">
        <div className="container bootstrap snippets bootdey my-3 col-12 offset-md-2 col-md-8 justify-content-center">
          <div className="row">
            <div className="profile-nav col-12 col-md-3">
              <div className="panel">
                <div className="user-heading round">
                  <a href="#">
                    {file ? (
                      <img src={URL.createObjectURL(file)} />
                    ) : (
                      (userData.ImgUrl && (
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            `/images/users/${userData.ImgUrl}`
                          }
                        />
                      )) ||
                      (!userData.ImgUrl && (
                        <img src="https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=" />
                      ))
                    )}
                  </a>
                  <h1 className="p-3 nunito-bold">{userData.Username}</h1>
                  <p className="p-1 nunito-bold">{userData.Email}</p>
                  <div className="">
                    {!file && (
                      <button
                        onClick={handleClick}
                        className="btn bg-light nunito-bold"
                      >
                        Upload new image
                      </button>
                    )}
                    {file && (
                      <div className="row">
                        <button
                          onClick={SubmitImg}
                          className="btn bg-success text-white nunito-bold offset-1 col-5"
                          type="submit"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setFile(null);
                          }}
                          className="btn bg-danger text-white nunito-bold text-center offset-1 col-5"
                        >
                          Undo
                        </button>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={hiddenFileInput}
                      onChange={handleChange}
                      className="d-none"
                      accept="image/png, image/gif, image/jpeg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-body bio-graph-info col-12 col-md-8 ">
              <h1 className="nunito-bold font-lb">User's Information</h1>
              <div className="tab">
                <button
                  className={
                    active1
                      ? "bg-dark rounded text-white border-0 nunito-bold"
                      : "tablink-active nunito-bold"
                  }
                  onClick={() => {
                    setActive1((act) => !act);
                    setActive2((act) => !act);
                  }}
                >
                  General Info
                </button>
                <button
                  className={
                    active2
                      ? "bg-dark rounded text-white  border-0 nunito-bold"
                      : "tablink-active nunito-bold"
                  }
                  onClick={() => {
                    setActive1((act) => !act);
                    setActive2((act) => !act);
                  }}
                >
                  Security
                </button>
              </div>

              {(active1 && (
                <div className="row p-3 border rounded row-nogutter">
                  <div className=" col-12 col-md-6 w-100-tab">
                    <div className="bio-row">
                      <p>
                        <span>First Name </span>
                        <input
                          type="text"
                          id="fname"
                          className="form__input p-1 "
                          onChange={(e) => handleInputChange(e)}
                          value={userData.FirstName}
                        />
                      </p>
                    </div>
                    <div className="bio-row">
                      <p>
                        <span>Last Name </span>
                        <input
                          type="text"
                          id="lname"
                          className="form__input p-1 "
                          onChange={(e) => handleInputChange(e)}
                          value={userData.LastName}
                        />
                      </p>
                    </div>
                    <div className="bio-row">
                      <p>
                        <span className="col-3 mb-1">Country </span>
                        <Select
                          options={options}
                          defaultValue={{ label: userData.Country, value: "" }}
                          onChange={changeCountryHandler}
                          className="form__input"
                        />
                      </p>
                    </div>
                  </div>
                  <div className=" col-12 col-md-6">
                    <div className="bio-row">
                      <p>
                        <span>Birthday</span>
                        <input
                          type="date"
                          id="birthdate"
                          className="form__input p-1 "
                          onChange={(e) => handleInputChange(e)}
                          value={moment(userData.Birthdate)
                            .utc()
                            .format("YYYY-MM-DD")}
                        />
                      </p>
                    </div>

                    <div className="bio-row">
                      <p>
                        <span>Email </span>
                        <input
                          type="text"
                          id="mail"
                          className="form__input p-1 "
                          onChange={(e) => handleInputChange(e)}
                          value={userData.Email}
                        />
                      </p>
                    </div>
                    <div className="bio-row">
                      <p>
                        <span>Mobile </span>
                        <input
                          type="text"
                          id="mobile"
                          className="form__input p-1 "
                          onChange={(e) => handleInputChange(e)}
                          value={userData.Mobile}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              )) ||
                (!active1 && (
                  <div className="row p-3 border rounded row-nogutter justify-content-center text-center">
                    {pwdchg && (
                      <div className="alert alert-success" role="alert">
                        <FontAwesomeIcon icon={faCheckCircle} /> Password
                        Changed
                      </div>
                    )}
                    <div className="bio-row ">
                      <p>
                        <span>Password </span>
                        <input
                          type="password"
                          id="pwd"
                          className="form__input p-1  offset-2"
                          onChange={(e) => handleInputChange(e)}
                          value={pwd}
                        />
                      </p>
                    </div>
                    <div className="bio-row">
                      <p>
                        <span>New Password </span>
                        <input
                          type="password"
                          id="pwd_n1"
                          className="form__input p-1  offset-2"
                          onChange={(e) => handleInputChange(e)}
                          value={pwd_n1}
                        />
                      </p>
                    </div>
                    <div className="bio-row">
                      <p>
                        <span>New Confirmed Password </span>
                        <input
                          type="password"
                          id="pwd_n2"
                          className="form__input p-1 offset-2"
                          onChange={(e) => handleInputChange(e)}
                          value={pwd_n2}
                        />
                      </p>
                    </div>
                  </div>
                ))}
              {active1 ? (
                <div className="text-end my-3">
                  <button
                    onClick={() => handleGeneralinfo()}
                    className="bg-dark rounded text-white p-2 border-0 nunito-bold"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="text-end my-3">
                  <button
                    onClick={() => changePassword()}
                    className="bg-dark rounded text-white p-2 border-0 nunito-bold"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="App App-Profile">
            <CardContainer cards={cardsData} btntext="Liked" />
          </div>
        </div>
      </section>
    )) ||
      (sessionuser.id !== userData.id && (
        <section className="Profile-Section text-center">
          <div className="container d-flex justify-content-center">
            <div className="row">
              <div className="profile-nav col-12 col-md-3">
                <div className="panel">
                  <div className="user-heading round">
                    <a href="#">
                      {(userData.ImgUrl && (
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            `/images/users/${userData.ImgUrl}`
                          }
                        />
                      )) ||
                        (!userData.ImgUrl && (
                          <img src="https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=" />
                        ))}
                    </a>
                    <h1 className="p-3 nunito-bold">{userData.Username}</h1>
                    <p className="p-1 nunito-bold">{userData.Email}</p>
                    {userData.FirstName && (
                      <div className="d-flex p-1 ">
                        {" "}
                        <p className="nunito-bold p-1 mx-1">
                          <span className="mx-3">FirstName </span>{" "}
                          {userData.FirstName}
                        </p>
                      </div>
                    )}
                    {userData.LastName && (
                      <div className="d-flex p-1 ">
                        {" "}
                        <p className="nunito-bold p-1 mx-1">
                          <span className="mx-3">LastName </span>{" "}
                          {userData.LastName}
                        </p>
                      </div>
                    )}
                    {userData.Country && (
                      <div className="d-flex p-1 ">
                        {" "}
                        <p className="nunito-bold p-1 mx-1">
                          <span className="mx-3">Country </span>{" "}
                          {userData.Country}
                        </p>
                      </div>
                    )}
                    {userData.Mobile && (
                      <div className="d-flex p-1 ">
                        {" "}
                        <p className="nunito-bold p-1 mx-1">
                          <span className="mx-3">Mobile </span>{" "}
                          {userData.Mobile}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )))
  );
}
export default Dashboard;
