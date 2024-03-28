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
  schedule,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  console.log(schedule);

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
            {schedule.dates.map((date, index) => (
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
                    <p className={styles.date}>
                      {cinemaName
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </p>
                  </div>
                  <div className={styles.inlineSchedule}>
                    <Image
                      src={"/calendar.png"}
                      alt="calendar"
                      width={20}
                      height={20}
                      className={styles.icon}
                    />
                    <h3 className={styles.date}>{date.day}</h3>
                  </div>
                </div>
                <div className={styles.hours}>
                  <p className={styles.smallText}>Avaliable hours</p>
                  {date.hours.map((hour, index) => (
                    <div key={index}>
                      <button
                        className={styles.hourButton}
                        onClick={handleClick}
                      >
                        {hour}
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
        <TicketModal parameters={parameters} closeModal={closeModal} />
      )}
    </div>
  );
};
export default MoviePage;
