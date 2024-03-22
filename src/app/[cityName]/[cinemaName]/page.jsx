import MovieCard from "@/components/movieCard/MovieCard";
import { getCinemaByName } from "@/lib/api";
import { getAvaliableMovies } from "@/lib/getters";
import styles from "./salon.module.css";

const Salon = async ({ params }) => {
  const { cinemaName, cityName } = params;
  const cinema = await getCinemaByName(cinemaName);
  const movies = await getAvaliableMovies(cinema);
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h2 className={styles.title}>Films Now Showing</h2>
        <div>
          <ul className={styles.movies}>
            {movies.map((movie) => (
              <MovieCard movie={movie} cityName={cityName} key={movie._id} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Salon;
