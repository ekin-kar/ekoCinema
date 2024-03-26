import React, { useRef, useEffect } from "react";
import styles from "./cinemaModal.module.css";
import CinemaCard from "../cinemaCard/CinemaCard";

const CinemaModal = ({ selectedCity, cinemas, closeModal }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div className={styles.modal}>
      <div ref={modalRef} className={styles.modalContent}>
        <div className={styles.headerWrapper}>
          <h3 className={styles.header}>Cinemas in {selectedCity.name}</h3>
          <div className={styles.closeButton} onClick={closeModal}>
            X
          </div>
        </div>
        <ul className={styles.cinemas}>
          {cinemas.map((cinema, index) => (
            <CinemaCard
              cinema={cinema}
              cityName={selectedCity.name}
              key={index}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default CinemaModal;
