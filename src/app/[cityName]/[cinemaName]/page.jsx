import { getCinemaByName } from "@/lib/api";
import { getAvaliableMovies } from "@/lib/getters";
import styles from "./salon.module.css";
import MoviesSection from "@/components/moviesSection/MoviesSection";

const Salon = async ({ params }) => {
  const { cinemaName, cityName } = params;
  const cinema = await getCinemaByName(cinemaName);
  const movies = await getAvaliableMovies(cinema);
  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <h2 className={styles.title}>Films On Vision</h2>
          <div className={styles.moviesWrapper}>
            <MoviesSection cityName={cityName} otherMovies={movies} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Salon;
