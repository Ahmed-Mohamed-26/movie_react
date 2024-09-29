import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "../redux/action/fav.js";
import MyCard from "../componants/card.js";


const Favorites = () => {
       const translation = useSelector((state) => state.language.translate);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <div className="container">
      <h2>{translation.Favorites}</h2>
      <div className="row">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <div
              key={movie.id}
              className="col-md-4"
              style={{ marginBottom: "20px" }}
            >
              <MyCard
                id={movie.id}
                image={movie.image}
                name={movie.title}
                release_date={movie.release_date}
                url={movie.url}
                btnName="Remove"
                onFavoriteClick={() => dispatch(removeFromFavorites(movie.id))}
              />
            </div>
          ))
        ) : (
          <p>{translation.No_favorite_movies}</p>
        )}
      </div>
    </div>
  );
  
};

export default Favorites;
