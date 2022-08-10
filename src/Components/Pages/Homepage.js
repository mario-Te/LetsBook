import CardContainer from "../Layouts/CardContainer";
import { useState } from "react";
import { useEffect } from "react";
const Homepage = () => {
  const [cardsData, setCardsData] = useState([]);
  const fetchData = () => {
    fetch("http://localhost:3001/shows/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCardsData(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <CardContainer cards={cardsData} btntext="Book Now" />
    </div>
  );
};

export default Homepage;
