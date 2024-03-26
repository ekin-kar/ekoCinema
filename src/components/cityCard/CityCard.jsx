"use client";
import styles from "./citycard.module.css";
const CityCard = ({ city, onClick }) => {
  const handleClick = () => {
    onClick(city);
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      <p className={styles.cityName}>{city.name}</p>
      <div className={styles.countWrapper}>
        <p className={styles.countText}>Discover </p>
        <p className={styles.countText}>{city.cinemas.length}</p>
        <p className={styles.countText}> cinemas!</p>
      </div>
    </div>
  );
};
export default CityCard;
