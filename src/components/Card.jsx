import React from "react";
import { useDispatch } from "react-redux";
import { activeCard } from "./cardSlice";
// Icons
import { Icon } from "@iconify/react";
import mastercardIcon from "@iconify/icons-logos/mastercard";
import visaIcon from "@iconify/icons-logos/visa";
import expressIcon from "@iconify/icons-logos/express";

function Card(props) {
  const dispatch = useDispatch();
  const handleActive = () => {
    dispatch(activeCard(props.cvc + props.number));
  };

  return (
    <div
      className="card"
      onClick={handleActive}
      style={{ zIndex: props.zIndex }}
    >
      <div
        className={
          (props.activeCard ? "credit-cart" : "notActiv-credit") +
          (props.vendor === "mastercard"
            ? " mastercard"
            : props.vendor === "visa"
            ? " visa"
            : props.vendor === "express"
            ? " express"
            : " visa")
        }
      >
        <div className="card-logo">
          <div className="chip"></div>
          {props.vendor === "mastercard" ? (
            <Icon icon={mastercardIcon} style={{ fontSize: "48px" }} />
          ) : props.vendor === "visacard" ? (
            <Icon icon={visaIcon} style={{ fontSize: "26px" }} />
          ) : props.vendor === "express" ? (
            <Icon icon={expressIcon} style={{ fontSize: "27px" }} />
          ) : (
            <Icon icon={visaIcon} style={{ fontSize: "26px" }} />
          )}
        </div>

        <p className="card-nr" type="tel">
          {props.number ? props.number : "XXXX XXXX XXXX XXXX"}
        </p>

        <div className="card-info">
          <div className="carddholder">
            <label className="holder ">CARDHOLDER NAME</label>
            <input
              className="betal-card-name"
              type="text"
              disabled
              value={props.name ? props.name : "YOUR NAME"}
            />
          </div>

          <div className="expiry-cvc">
            <div className="expiry">
              <label className="name-label">VALID THRU</label>
              <p className="betal-card-date">
                {props.month ? props.month : "MM"}/
                {props.year ? props.year : "YY"}
              </p>
            </div>
            <div className="cvc">
              <label className="name-label">CVC</label>
              <p className="betal-card-cvc" type="text">
                {props.cvc ? props.cvc : "cvc"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
