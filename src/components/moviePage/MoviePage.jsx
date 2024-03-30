"use client";
import React, { useState } from "react";
import Image from "next/image";
import MoviesSection from "../moviesSection/MoviesSection";
import styles from "./movie.module.css";
import TicketModal from "../ticketModal/TicketModal";

const MoviePage = ({
  movie,
  otherMovies,
  cinemaName,
  cityName,
  parameters,
  schedules,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [takenSeats, setTakenSeats] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(schedules[0]);

  const handleClick = (schedule) => {
    setTakenSeats(schedule.takenSeats);
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const groupedSchedules = schedules.reduce((acc, schedule) => {
    const key = `${new Date(schedule.date).toISOString().split("T")[0]}-${
      schedule.salon
    }`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(schedule);
    return acc;
  }, {});

  const mergedSchedules = Object.values(groupedSchedules).map((group) => {
    return group.reduce((acc, schedule) => {
      if (!acc.date) {
        acc.date = schedule.date;
        acc.salon = schedule.salon;
        acc.hours = [];
      }
      acc.hours.push(schedule);
      return acc;
    }, {});
  });

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <Image
            src={movie.poster}
            alt={movie.title}
            className={styles.poster}
            width={380}
            height={300}
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
        </div>
        <div className={styles.schedulesWrapper}>
          <h2 className={styles.header}>Showtimes</h2>
          <div className={styles.scheduleWrapper}>
            {mergedSchedules.map((schedule, index) => (
              <div key={index} className={styles.schedule}>
                <div className={styles.cinemaWrapper}>
                  <div className={styles.inlineSchedule}>
                    <Image
                      src={"/placeholder.png"}
                      alt="placeholder"
                      width={20}
                      height={20}
                      className={styles.icon}
                    />
                    <p className={styles.date}>{schedule.salon}</p>
                  </div>
                  <div className={styles.inlineSchedule}>
                    <Image
                      src={"/calendar.png"}
                      alt="calendar"
                      width={20}
                      height={20}
                      className={styles.icon}
                    />
                    <h3 className={styles.date}>
                      {new Date(schedule.date).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </h3>
                  </div>
                </div>
                <div className={styles.hours}>
                  <p className={styles.smallText}>Available hours</p>
                  {schedule.hours.map((hourSchedule, index) => (
                    <div key={index}>
                      <button
                        className={styles.hourButton}
                        onClick={() => handleClick(hourSchedule)}
                      >
                        {new Date(hourSchedule.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className={styles.header}>Other Movies on Vision</h2>
          <div className={styles.moviesWrapper}>
            <MoviesSection
              cityName={cityName}
              otherMovies={otherMovies}
              cinemaName={cinemaName}
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <TicketModal
          parameters={parameters}
          takenSeats={takenSeats}
          closeModal={closeModal}
          schedule={selectedSchedule}
        />
      )}
    </div>
  );
};
export default MoviePage;
