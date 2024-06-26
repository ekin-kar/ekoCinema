"use client";
import Slider from "react-slick";
import MovieCard from "../movieCard/MovieCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MoviesSection = ({ cityName, cinemaName, otherMovies }) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    waitForAnimate: false,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 864,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {otherMovies.map((otherMovie) => (
        <MovieCard
          cityName={cityName}
          cinemaName={cinemaName}
          movie={otherMovie}
          key={otherMovie.title}
        >
          {otherMovie.title}
        </MovieCard>
      ))}
    </Slider>
  );
};
export default MoviesSection;
