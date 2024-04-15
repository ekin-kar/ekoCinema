"use client";
import { useEffect, useState } from "react";
import CityCard from "../cityCard/CityCard";
import styles from "./mainPage.module.css";
import CinemaModal from "../cinemaModal/CinemaModal";

const MainPage = ({ cities }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cinemas, setCinemas] = useState([]);

  const handleClick = (city) => {
    setSelectedCity(city);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cinemas");
        if (!response.ok) {
          throw new Error("Failed to fetch cinemas");
        }
        const cinemasData = await response.json();
        if (!selectedCity) {
          return;
        }
        const selectedCityCinemas = cinemasData.filter(
          (cinema) => cinema.cityId === selectedCity._id
        );
        setCinemas(selectedCityCinemas);
        setIsModalOpen(true);
      } catch (error) {
        console.error("Error fetching cinemas:", error);
      }
    };
    fetchCinemas();
  }, [selectedCity]);

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <h2 className={styles.title}>Welcome to EkoCinema!</h2>
        <p className={styles.text}>Start by selecting your city!</p>
        <div className={styles.cityContainer}>
          {cities.map((city, index) => (
            <CityCard city={city} key={index} onClick={handleClick} />
          ))}
        </div>
        {isModalOpen && (
          <CinemaModal
            selectedCity={selectedCity}
            cinemas={cinemas}
            closeModal={closeModal}
          />
        )}
      </div>
    </div>
  );
};
export default MainPage;
