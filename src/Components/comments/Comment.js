import React from "react";
import { faThumbsUp } from "@fortawesome/fontawesome-free-solid";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useState, useContext, useEffect } from "react";
import { CurrentUser } from "../Pages/App";
import CardReply from "./Replies";
import { Link } from "react-router-dom";
function CardComments(props) {
  const [reply, setReply] = useState(false);
  const [sessionuser, setSessionUser] = useContext(CurrentUser);
  const [exists, setExists] = useState(true);
  const DeleteComment = () => {
    axios
      .post("http://localhost:3001/comments/deletecomment", {
        CommentID: props.id,
      })
      .then(() => {
        setExists(false);
        props.CardLengthChanger((l) => l - 1);
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
  var today = new Date();
  var date = Date.parse(props.createdAt);
  return (
    exists && (
      <div className="card p-3 my-2">
        <div className="d-flex justify-content-between align-items-center">
          <div className="user d-flex flex-row align-items-center">
            {props.User.ImgUrl ? (
              <img
                src={
                  process.env.PUBLIC_URL + `/images/users/${props.User.ImgUrl}`
                }
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
              <Link to={`/profile/${props.User.id}`}>
                {" "}
                <small className="font-weight-bold text-primary px-2">
                  {props.User.Username}
                </small>
              </Link>
              <small className="font-weight-bold px-2">{props.text}</small>
            </span>
          </div>
          <small>{moment(props.updatedAt).fromNow()}</small>
        </div>
        <div className="action d-flex justify-content-between mt-2 align-items-center">
          <div className="reply ">
            {sessionuser.id === props.User.id && (
              <span className="dots" onClick={() => DeleteComment()}>
                <small className="px-2 ">Remove</small>
              </span>
            )}

            <span
              className="dots"
              onClick={() => {
                setReply(!reply);
              }}
            >
              <small className="px-2 ">Reply</small>
            </span>
          </div>
          <div className="icons align-items-center">
            <span className="cursor-pointer" onClick={() => {}}>
              <FontAwesomeIcon
                className="text-secondary px-2 "
                icon={faThumbsUp}
              />
            </span>
            <small className="px-2 ">{props.likes}</small>
          </div>
        </div>
        {reply && (
          <div>
            <CardReply id={props.id} />
          </div>
        )}
      </div>
    )
  );
}

function CardContainer(props) {
  const [checked, setChecked] = React.useState(true);
  const [sessionuser, setSessionUser] = useContext(CurrentUser);
  var [cardlength, setCardLength] = useState(props.length);
  const [commentText, setCommentText] = React.useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "Comment") {
      setCommentText(value);
    }
  };
  const SendComment = () => {
    axios
      .post("http://localhost:3001/comments/addcomment", {
        ShowID: props.ShowId,
        Text: commentText,
        UserID: sessionuser.id,
      })
      .then((response) => {
        setCardLength((l) => l + 1);
        props.statechanger();
        setCommentText("");
      });
  };

  return (
    <section>
      <div className="container mt-5">
        <div className="row  d-flex justify-content-center">
          <div className="col-md-8">
            <div className="headings d-flex justify-content-between align-items-center mb-3">
              <h5>Unread comments({cardlength})</h5>
              <div className="buttons">
                <span className="badge bg-white d-flex flex-row align-items-center">
                  {checked && (
                    <span className="text-primary">Comments "ON"</span>
                  )}
                  {!checked && (
                    <span className="text-primary">Comments "Off"</span>
                  )}
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      defaultChecked={checked}
                      onChange={() => setChecked(!checked)}
                    />
                  </div>
                </span>
              </div>{" "}
            </div>
            {checked && (
              <div>
                {props.cards.map((member, index) => {
                  return (
                    <CardComments
                      {...member}
                      key={index}
                      CardLengthChanger={setCardLength}
                    />
                  );
                })}
              </div>
            )}
            <div className="card card2">
              <input
                type="text"
                id="Comment"
                className="form__input p-1 "
                onChange={(e) => handleInputChange(e)}
                placeholder="Add your Comment"
                value={commentText}
              />

              <button
                onClick={() => SendComment()}
                type="submit"
                className="btn col-1"
              >
                {" "}
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default CardContainer;
