"use client";
import { useRouter } from "next/navigation";
import styles from "./moviecard.module.css";
import Image from "next/image";
const MovieCard = ({ movie, cityName }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(
      `/${cityName.toLowerCase()}/movies/${movie.title
        .toLowerCase()
        .replace(/\s/g, "-")}`
    );
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <Image src={movie.poster} alt={movie.title} width={250} height={340} />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.titleWrapper}>
          <p className={styles.movieName}>{movie.title}</p>
          <p className={styles.movieYear}>{movie.releaseDate.slice(0, 4)}</p>
        </div>
        <div className={styles.detailsWrapper}>
          <p className={styles.movieDuration}>{movie.duration} min</p>
          <div className={styles.rating}>
            <p>Rating: </p>
            <p className={styles.movieRating}>{movie.rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
