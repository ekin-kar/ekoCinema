import { getAvailableMovies, getCinemaByName } from "@/lib/getters";
import styles from "./salon.module.css";
import MoviesSection from "@/components/moviesSection/MoviesSection";
import Image from "next/image";

const Salon = async ({ params }) => {
  const { cinemaName, cityName } = params;
  const cinema = await getCinemaByName(cinemaName);
  const movies = await getAvailableMovies(cinema.id);
  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <div className={styles.innerWrapper}>
            <h1 className={styles.header}> {cinema.name}</h1>
            <p className={styles.address}>
              Schönhauser Allee 36 10435 - Berlin
            </p>
          </div>
          <div className={styles.innerWrapper}>
            <button className={styles.button}>Show on Map</button>
          </div>
        </div>
        <div className={styles.innerContainer}>
          <h1 className={styles.header}>Coming Soon</h1>
          <div className={styles.comingSoonWrapper}>
            <div className={styles.detailsWrapper}>
              <h2 className={styles.title}>
                The Hunger Games: The Ballad of Songbirds & Snakes
              </h2>
              <p className={styles.description}>
                The story of Coriolanus Snow, years before he would become the
                tyrannical President of Panem. He is young, very determined and
                though the Snow family has fallen on hard times, Coriolanus sees
                a chance for a change in his fortunes when he is chosen to be a
                mentor for the 10th Hunger Games only to have his elation dashed
                when he is assigned to mentor a girl tribute named Lucy Gray
                Baird from the impoverished District 12.
              </p>

              <p className={styles.date}>
                Release Date:{" "}
                <span className={styles.dateYellow}> 03.04.2024 </span>
              </p>
            </div>
            <Image
              src="/hunger.jpg"
              alt="hungerGames"
              width={700}
              height={300}
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles.innerContainer}>
          <h2 className={styles.title}>Films On Vision</h2>
          <div className={styles.moviesWrapper}>
            <MoviesSection
              cityName={cityName}
              cinemaName={cinemaName}
              otherMovies={JSON.parse(JSON.stringify(movies))}
            />
          </div>
        </div>
        <div className={styles.offersContainer}>
          <h2 className={styles.title}>Special Offers</h2>
          <div className={styles.offersWrapper}>
            <div className={styles.offer}>
              <h3 className={styles.offerTitle}>Student Discount</h3>
              <Image
                src="/student.jpg"
                alt="student"
                width={400}
                height={200}
                className={styles.offerImage}
              />
              <p className={styles.offerDescription}>&#x2022; With Valid ID</p>
              <p className={styles.offerDescription}>&#x2022; 1 Popcorn</p>
              <button className={styles.offerPrice}>Get for $10</button>
            </div>
            <div className={styles.offer}>
              <h3 className={styles.offerTitle}>Date Night</h3>
              <Image
                src="/heart.png"
                alt="date"
                width={400}
                height={200}
                className={styles.offerImage}
              />
              <p className={styles.offerDescription}>&#x2022; 2 Tickets</p>
              <p className={styles.offerDescription}>&#x2022; 2 Popcorns</p>
              <button className={styles.offerPrice}>Get for $30</button>
            </div>
            <div className={styles.offer}>
              <h3 className={styles.offerTitle}>Family Pack</h3>
              <Image
                src="/family.jpg"
                alt="family"
                width={400}
                height={200}
                className={styles.offerImage}
              />
              <p className={styles.offerDescription}>&#x2022; 4 Tickets</p>
              <p className={styles.offerDescription}>&#x2022; 4 Popcorns</p>
              <button className={styles.offerPrice}>Get for $55</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Salon;
