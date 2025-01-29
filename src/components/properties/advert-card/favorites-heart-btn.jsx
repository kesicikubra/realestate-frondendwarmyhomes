"use client";
import React from "react";
import "./style.scss";
import Heart from "./heart.svg";
import { addFavoriteAdvertActionForAuthFromPropertis } from "@/actions/favorites-action";
import { swalAlert } from "@/helpers/swal";

const FavoritesHeartBtnProperties = ({ advertId, favorited_advert }) => {


  const handleFavorites = async () => {
    try {
      const res = await addFavoriteAdvertActionForAuthFromPropertis(advertId,favorited_advert ? "deleted" : "added");
    } catch (error) {
      console.log(error);
      swalAlert(error.message, "error");
    }
  };

  return (
    <button 
      className="like-button" 
      onClick={handleFavorites}
      >
      <Heart fill={favorited_advert ? "rgb(149,23,99)" : "none"}/>
    </button>
  );
};

export default FavoritesHeartBtnProperties;
