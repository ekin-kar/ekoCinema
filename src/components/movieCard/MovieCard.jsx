"use client";
import { usePathname, useRouter } from "next/navigation";
import styles from "./moviecard.module.css";
import Image from "next/image";
const MovieCard = ({ movie }) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = () => {
    router.push(`./${pathname}/${movie.title.toLowerCase()}`);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <Image src={movie.poster} alt={movie.name} width={250} height={340} />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.movieName}>{movie.title}</p>
      </div>
    </div>
  );
};
export default MovieCard;
