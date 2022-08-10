import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import {
  faCalendarAlt,
  faPoundSign,
  faMapMarker,
  faClock,
} from "@fortawesome/fontawesome-free-solid";
const Card = (props) => (
  <div className="card">
    <img src={props.imgUrl} alt={props.alt || "Image"} />
    <div className="card-content">
      <h2 className="nunito-bold font-sm p-3">{props.title}</h2>
      <p className="nunito-bold text-nowrap">{props.Genre}</p>
      <div className="text-left">
        <p className="icon-list nunito-bold text-left">
          <FontAwesomeIcon icon={faMapMarker} /> {props.Location}
        </p>
        <p className="icon-list nunito-bold text-left">
          <FontAwesomeIcon icon={faCalendarAlt} />
          {moment(props.Date).utc().format("YYYY-MM-DD")}
        </p>
        <p className="icon-list nunito-bold text-left">
          <FontAwesomeIcon icon={faClock} />
          {moment(props.Date).utc().format("HH:MM ")}
        </p>
        <p className="icon-list nunito-bold text-left">
          <FontAwesomeIcon icon={faPoundSign} /> {props.price}
        </p>
      </div>
      <button className="bg-dark rounded text-white p-2 border-0 nunito-bold">
        <Link
          className="text-white text-decoration-none"
          to={`/book/${props.id}`}
        >
          {props.btntext}
        </Link>
      </button>
    </div>
  </div>
);
const CardContainer = (props) => (
  <section className="Card-field mt-5">
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      breakpoints={{
        // when window width is >= 640px
        2: {
          slidesPerView: 1,
        },
        // when window width is >= 768px
        1280: {
          slidesPerView: 3,
        },
      }}
      spaceBetween={20}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {props.cards.map((card) => (
        <SwiperSlide key={card.id}>
          <Card {...card} btntext={props.btntext} />
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);
export default CardContainer;
