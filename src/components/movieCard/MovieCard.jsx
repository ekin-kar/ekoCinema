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
        <p className={styles.movieName}>{movie.title}</p>
      </div>
    </div>
  );
};
export default MovieCard;
