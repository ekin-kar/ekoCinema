import { getCinema, getCityByName } from "@/lib/api";
import styles from "./city.module.css";
import CinemaCard from "@/components/cinemaCard/CinemaCard";
import { getAvaliableMovies } from "@/lib/getters";
import MovieCard from "@/components/movieCard/MovieCard";
import MoviesSection from "@/components/moviesSection/MoviesSection";

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
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <h2 className={styles.header}>Cinemas in {city.name}</h2>
          <div>
            <ul className={styles.cinemas}>
              {cinemas.map((cinema) => (
                <CinemaCard
                  cinema={cinema}
                  cityName={city.name}
                  key={cinema._id}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.innerContainer}>
          <h2 className={styles.header}>Movies</h2>
          <div>
            <div className={styles.moviesWrapper}>
              <MoviesSection cityName={city.name} otherMovies={movies} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default City;
