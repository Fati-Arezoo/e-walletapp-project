import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { addNewCard } from "./cardSlice";
import Card from "./Card";

function AddCard() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.cards.newCard[0].name);

  const [number, setNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [vendor, setVendor] = useState("");
  const [error, setError] = useState("");

  let history = useHistory();
  const handleAddCard = (e) => {
    e.preventDefault();

    if (number.length < 19) {
      setError("Card number must be 16 numbers");
      return;
    }

    if (vendor.length === 0) {
      setError("Pleas, choose a option");
      return;
    }

    if (year < 21 || year > 28) {
      setError("Pleas, wirte correct year");
      return;
    }

    if (month < 1 || month > 12) {
      setError("Pleas, write correct month");
      return;
    }

    let card = {
      number: number,
      name: userName,
      month: month,
      year: year,
      cvc: cvc,
      vendor: vendor,
    };

    if (month.length === 1) {
      card.month = "0" + month;
      setMonth(card.month);
    }
    dispatch(addNewCard(card));
    history.push("/");
  };

  return (
    <div className="add-card">
      <div className="form-box">
        <div className="form-container">
          <div className="error-text">
            {error.length > 0 && <p className="error">{error}</p>}
          </div>
          <form onSubmit={handleAddCard}>
            <div className="number">
              <br />
              <input
                required
                type="tel"
                className="cart-number"
                maxLength="19"
                placeholder="Card number"
                value={number}
                onChange={(e) => {
                  setNumber(
                    e.target.value
                      .replace(/[^\d]/g, "")
                      .replace(/(.{4})/g, "$1 ")
                      .trim()
                  );
                }}
              />
            </div>

            <div className="name">
              <input
                required
                className="cart-name"
                type="text"
                placeholder="Name"
                disabled
                value={userName}
              />
            </div>

            <div className="input-two">
              <div>
                <div className="date-box">
                  <input
                    required
                    className="inputtwo month"
                    maxLength="2"
                    placeholder="MM"
                    value={month}
                    onChange={(e) => {
                      setMonth(e.target.value.replace(/[^\d]/g, ""));
                    }}
                  />
                  <h4 className="slash">/</h4>
                  <input
                    required
                    minLength="2"
                    maxLength="2"
                    className="inputtwo year"
                    type="text"
                    placeholder="YY"
                    value={year}
                    onChange={(e) => {
                      setYear(e.target.value.replace(/[^\d]/g, ""));
                    }}
                  />
                </div>
              </div>

              <div className="cvc">
                <input
                  required
                  className="inputtwo"
                  placeholder="CVC"
                  value={cvc}
                  minLength="3"
                  maxLength="3"
                  onChange={(e) => setCvc(e.target.value.replace(/[^\d]/g, ""))}
                />
              </div>
            </div>
            <div className=" vendor">
              <select
                name="vendor"
                value={vendor}
                className="cart-number"
                onChange={(e) => {
                  setVendor(e.target.value);
                }}
              >
                <option value="">---options---</option>
                <option value="mastercard">Mastercard</option>
                <option value="visacard">Visacard</option>
                <option value="express">Express</option>
              </select>
            </div>

            <div className="btn">
              <button className="form-btn" type="submit">
                ADD CARD
              </button>

              <Link to="/">
                <button className="form-btn">MY CARDS</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="card-comp">
        <Card
          name={userName}
          number={number}
          month={month}
          year={year}
          cvc={cvc}
          vendor={vendor}
        />
      </div>
    </div>
  );
}

export default AddCard;
