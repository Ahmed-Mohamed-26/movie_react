import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../redux/action/fav.js";

import "./style/mycard.css";
const MyCard = (props) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  const toggleFavorite = () => {
    if (favorites.find((fav) => fav.id === props.id)) {
      dispatch(removeFromFavorites(props.id));
    } else {
      dispatch(addToFavorites(props));
    }
  };

  return (
    <>
      <div className="card">
        <div className="image">
          <img
            className="card-img-top"
            src={`https://image.tmdb.org/t/p/w500${props.image}`}
            alt="Card image cap"
          />
        </div>
        <div className="card-body">
          <h4 className="card-title"> {props.name}</h4>
          {props.release_date && (
            <p className="card-text mt-2 ">{props.release_date}</p>
          )}
         

          {props.url && (
            <Link to={props.url} className="btn btn-primary">
              {props.btnName}
            </Link>
          )}

          <button
            onClick={toggleFavorite}
            style={{ background: "none", border: "none" }}
          >
            <i
              className={`fa${
                favorites.find((fav) => fav.id === props.id) ? "s" : "r"
              } fa-star`}
              style={{
                color: favorites.find((fav) => fav.id === props.id)
                  ? "yellow"
                  : "gray",
                fontSize: "24px",
              }}
            ></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default MyCard;
