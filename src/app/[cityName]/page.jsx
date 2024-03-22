import { getCinema, getCityByName } from "@/lib/api";
import styles from "./city.module.css";
import CinemaCard from "@/components/cinemaCard/CinemaCard";
import { getAvaliableMovies } from "@/lib/getters";
import MovieCard from "@/components/movieCard/MovieCard";

const City = async ({ params }) => {
  const { cityName } = params;
  const city = await getCityByName(cityName);
  const cinemas = [];
  for (let cinemaId of city.cinemas) {
    const cinema = await getCinema(cinemaId);
    cinemas.push(cinema);
  }
  const movies = await getAvaliableMovies(cinemas);
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h2>Cinemas in {city.name}</h2>
        <div>
          <ul className={styles.cinemas}>
            {cinemas.map((cinema) => (
              <CinemaCard cinema={cinema} key={cinema._id} />
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.innerContainer}>
        <h2>Movies</h2>
        <div>
          <ul className={styles.movies}>
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie._id} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default City;
