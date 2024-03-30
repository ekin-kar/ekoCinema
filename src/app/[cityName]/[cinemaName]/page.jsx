import { getAvailableMovies, getCinemaByName } from "@/lib/getters";
import styles from "./salon.module.css";
import MoviesSection from "@/components/moviesSection/MoviesSection";

const Salon = async ({ params }) => {
  const { cinemaName, cityName } = params;
  const cinema = await getCinemaByName(cinemaName);
  const movies = await getAvailableMovies(cinema.id);
  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <h2 className={styles.title}>Films On Vision</h2>
          <div className={styles.moviesWrapper}>
            <MoviesSection
              cityName={cityName}
              cinemaName={cinemaName}
              otherMovies={JSON.parse(JSON.stringify(movies))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Salon;
