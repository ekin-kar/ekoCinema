"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "./ticketModal.module.css";
import Seat from "../seat/Seat";

const TicketModal = ({ closeModal, parameters }) => {
  const modalRef = useRef(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const takenSeats = ["A1", "B2"];
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

  const handleSeatClick = (seat) => {
    if (takenSeats.includes(seat)) {
      return;
    }
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat)) {
        return prevSelectedSeats.filter(
          (selectedSeat) => selectedSeat !== seat
        );
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  };

  const numRows = 8;
  const numSeatsPerRow = 10;
  const seats = [];
  for (let row = 1; row <= numRows; row++) {
    for (let seatNum = 1; seatNum <= numSeatsPerRow; seatNum++) {
      seats.push(`${String.fromCharCode(64 + row)}${seatNum}`);
    }
  }

  return (
    <div className={styles.modal}>
      <div ref={modalRef} className={styles.modalContent}>
        <div className={styles.headerWrapper}>
          <h3 className={styles.header}>
            Buy your ticket for{" "}
            {parameters.movieName
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h3>
          <div className={styles.closeButton} onClick={closeModal}>
            X
          </div>
        </div>
        <div className={styles.selectedSeatsWrapper}>
          {selectedSeats.length > 0 && (
            <p className={styles.smallText}>
              Selected Seats: {selectedSeats.join(", ")}
            </p>
          )}
        </div>
        <div className={styles.screen}>Screen</div>
        <div className={styles.seatsWrapper}>
          <div className={styles.seats}>
            {seats.map((seat, index) => (
              <Seat
                key={index}
                seat={seat}
                takenseats={takenSeats}
                isSelected={selectedSeats.includes(seat)}
                onClick={() => handleSeatClick(seat)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TicketModal;
