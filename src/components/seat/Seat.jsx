import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./seat.module.css";

const Seat = ({ seat, isSelected, onClick, takenSeats }) => {
  const [isSeatTaken, setIsSeatTaken] = useState(false);

  useEffect(() => {
    setIsSeatTaken(takenSeats.includes(seat));
  }, [takenSeats, seat]);

  return (
    <div
      className={`${styles.seat} ${isSelected ? styles.selected : ""} ${
        isSeatTaken ? styles.unavailable : ""
      }`}
      onClick={onClick}
    >
      <Image src="/seat.png" alt="seat" width={30} height={30} />
    </div>
  );
};

export default Seat;
