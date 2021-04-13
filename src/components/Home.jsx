import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeCard } from "./cardSlice";
import Card from "./Card";

function Home() {
  const card = useSelector((state) => state.cards.newCard);
  const dispatch = useDispatch();

  return (
    <div className="home-page">
      <div className="active">
        {card.map((card, i) => {
          if (card.activeCard) {
            return <Card key={i} {...card} zIndex={i} />;
          }
          return null;
        })}
      </div>

      <div className="notactive-card">
        {card.map((card, i) => {
          if (!card.activeCard) {
            return (
              <div>
                <i
                  class="fas fa-times-circle"
                  onClick={() => {
                    dispatch(
                      removeCard({ cvc: card.cvc, number: card.number })
                    );
                  }}
                ></i>
                <Card key={i} {...card} />
              </div>
            );
          }
        })}
      </div>

      <div className="bttn">
        {card.length >= 4 ? (
          <div className="add-btn-home form-btn  disable">
            You can not add more card
          </div>
        ) : (
          <Link to="/addcard" className="add-btn-home form-btn">
            ADD NEW CARD
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
