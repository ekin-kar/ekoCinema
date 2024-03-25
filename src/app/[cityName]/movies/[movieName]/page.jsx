import { getMovieByTitle, getMovies } from "@/lib/api";
import styles from "./movie.module.css";
import Image from "next/image";
import MoviesSection from "@/components/moviesSection/MoviesSection";

const Movie = async ({ params }) => {
  const movie = await getMovieByTitle(params.movieName);
  const movies = await getMovies();
  const otherMovies = movies.filter((m) => m.title !== movie.title);

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <Image
            src={movie.poster}
            alt={movie.title}
            width={280}
            height={450}
            className={styles.poster}
          />
          <div className={styles.details}>
            <h2 className={styles.header2}>Showing Now</h2>
            <h1 className={styles.title}>{movie.title}</h1>
            <div className={styles.smallDetails}>
              <div className={styles.badges}>
                <div className={styles.badgeOutline}>HD</div>
                <div className={styles.badgeOutline}>{movie.language}</div>
              </div>
              <p className={styles.smallText}>
                {movie.genre
                  .split(",")
                  .map(
                    (word) =>
                      word.trim().charAt(0).toUpperCase() + word.trim().slice(1)
                  )
                  .join(" ")}
              </p>
              <div className={styles.inlineWrapper}>
                <Image
                  src={"/clock.png"}
                  alt="clock"
                  width={20}
                  height={20}
                  className={styles.icon}
                />
                <p className={styles.smallText}>{movie.duration} mins</p>
              </div>
              <div className={styles.inlineWrapper}>
                <Image
                  src={"/calendar.png"}
                  alt="calendar"
                  width={20}
                  height={20}
                  className={styles.icon}
                />
                <p className={styles.smallText}>
                  {new Date(movie.releaseDate).toLocaleString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className={styles.inlineWrapper}>
                <Image
                  src={"/star.png"}
                  alt="star"
                  width={20}
                  height={20}
                  className={styles.icon}
                />
                <p className={styles.smallText}>{movie.rating}</p>
              </div>
            </div>
            <p className={styles.description}>{movie.description}</p>
            <p className={styles.actors}>Actors: {movie.actors}</p>
          </div>
          <div className={styles.ticketWrapper}>
            <button className={styles.ticket}>Buy Ticket</button>
          </div>
        </div>
        <div>
          <h2 className={styles.header}>Other Movies on Vision</h2>
          <div className={styles.moviesWrapper}>
            <MoviesSection
              cityName={params.cityName}
              otherMovies={otherMovies}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Movie;
