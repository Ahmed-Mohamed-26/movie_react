import React, { useEffect, useState } from "react";
import MyCard from "../componants/card";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

const Details = () => {
     const translation = useSelector((state) => state.language.translate);

    const params = useParams()  
    console.log(params.id)
    const [movie, setmovie] = useState({})
  

    useEffect(() => {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${params.id}?api_key=3b81a2f804f13886d671ff7875dd6f42`
          )
          .then((res) => {
            setmovie(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
    }, [params.id])

    return (
      <>
        <div class="container py-5">
          <div class="row py-5">
            <div class="col-md-3 mt-2">
              <img
                class="w-100"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
            </div>
            <div class="col-md-9">
              <h2 class="fw-bolder">
                <span className="text-primary">{translation.movie_Name}</span>
                {movie.original_title}
              </h2>
              <h2 class="fw-bolder">
                <span className="text-primary">
                  {translation.movie_overview}
                </span>
                {movie.overview}
              </h2>
              <p class="text-muted p-2">{movie.release_date}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
export default Details;
