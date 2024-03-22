"use client";
import { useRouter } from "next/navigation";
import styles from "./cinemacard.module.css";
import Image from "next/image";
const CinemaCard = ({ cinema }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/${cinema.name.toLowerCase()}`);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <Image src="/cinema.jpg" alt={cinema.name} width={300} height={170} />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.cinemaName}>{cinema.name}</p>
      </div>
    </div>
  );
};
export default CinemaCard;
