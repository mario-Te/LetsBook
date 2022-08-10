import React from "react";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { CurrentUser } from "../Pages/App";
function SingleReply(props) {
  const [sessionuser, setSessionUser] = useContext(CurrentUser);
  const [Visible, setVisible] = useState(true);
  const DeleteReply = (replyID) => {
    axios
      .post("http://localhost:3001/replies/deletereply", {
        ID: replyID,
      })
      .then(() => {
        setVisible(false);
      });
  };
  return (
    Visible && (
      <div className="card m-3 p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="user d-flex flex-row align-items-center">
            {props.Img ? (
              <img
                src={process.env.PUBLIC_URL + `/images/users/${props.Img}`}
                width="30"
                className="user-img rounded-circle mr-2"
              />
            ) : (
              <img
                src="https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8="
                width="30"
                className="user-img rounded-circle mr-2"
              />
            )}
            <span>
              <small className="font-weight-bold text-primary px-2">
                {props.Username}
              </small>{" "}
            </span>
            <small className="nunito-bold"> {props.Text}</small>
          </div>
          {props.UID === sessionuser.id && (
            <div>
              <span onClick={() => DeleteReply(props.replyID)}>Remove</span>
            </div>
          )}
        </div>
      </div>
    )
  );
}
function CardReply(props) {
  const [reply, setReplyData] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [sessionuser, setSessionUser] = useContext(CurrentUser);
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setReplyText(value);
  };
  const sendReply = () => {
    console.log("replytext: " + replyText);
    axios
      .post("http://localhost:3001/replies/addReply", {
        ShowID: props.id,
        Text: replyText,
        UserID: sessionuser.id,
      })
      .then(() => {
        fetchReplies();
        setReplyText("");
      });
  };

  const fetchReplies = () => {
    axios
      .post("http://localhost:3001/replies/getone", {
        IDD: props.id,
      })
      .then((response) => {
        console.log(response);
        setReplyData(response.data);
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
  useEffect(() => {
    fetchReplies();
  }, []);
  return (
    <section>
      {/* for loop apply*/}
      {Array.apply(null, { length: reply.length }).map((e, i) => (
        <SingleReply
          key={i}
          UID={reply[i].User.id}
          Text={reply[i].text}
          Username={reply[i].User.Username}
          Img={reply[i].User.ImgUrl}
          replyID={reply[i].id}
        />
      ))}
      <div className="card card2 my-2 col-10 offset-1">
        <input
          type="text"
          id="Reply"
          className="form__input p-1 "
          onChange={(e) => handleInputChange(e)}
          placeholder="Add your Reply"
          value={replyText}
        />

        <button onClick={() => sendReply()} type="submit" className="btn col-1">
          {" "}
          Reply
        </button>
      </div>
    </section>
  );
}
export default CardReply;
