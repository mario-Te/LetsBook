import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faShoppingCart } from "@fortawesome/fontawesome-free-solid";
import CommentSection from "../comments/Comment";
const Show = () => {
  let { id } = useParams();
  const [show, setShows] = useState([]);
  const [commentdata, setcommentdata] = useState([]);
  var [loading, setloading] = useState(true);
  const fetchComment = () => {
    axios
      .get("http://localhost:3001/comments/getone", {
        params: {
          IDD: id,
        },
      })
      .then((response) => {
        setcommentdata(response.data);
        setloading(false);
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

  const fetchDataShows = () => {
    axios
      .get("http://localhost:3001/shows/getone", {
        params: {
          IDD: id,
        },
      })
      .then((response) => {
        console.log(response);
        var json = JSON.stringify(response.data);
        setShows({
          ids: response.data.id,
          title: response.data.title,
          img: response.data.imgUrl,
          price: response.data.price,
        });
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
    fetchDataShows();
    fetchComment();
  }, []);
  return (
    <section className="p-3 m-3 justify-content-center text-center ShowComment">
      <div id="container">
        <div className="product-details">
          <h1>{show.title}</h1>
          <span className="hint-star star">
            {Array.apply(null, { length: show.ids + 2 }).map((e, i) => (
              <FontAwesomeIcon icon={faStar} key={i} />
            ))}
          </span>

          <p className="information">
            " Let's spread the joy , here is Christmas , the most awaited day of
            the year.Christmas Tree is what one need the most. Here is the
            correct tree which will enhance your Christmas .
          </p>

          <div className="control">
            <button className="btn">
              <span className="price">{show.price}</span>
              <span className="shopping-cart whitehover">
                <FontAwesomeIcon icon={faShoppingCart} />
              </span>
              <span className="buy">Get now </span>
            </button>
          </div>
        </div>

        <div className="product-image d-flex">
          <img src={show.img} alt="" />
        </div>
      </div>

      {!loading && (
        <CommentSection
          cards={commentdata}
          statechanger={fetchComment}
          ShowId={show.ids}
          length={commentdata.length}
        />
      )}
    </section>
  );
};

export default Show;
