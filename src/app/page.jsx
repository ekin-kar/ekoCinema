import CityCard from "@/components/cityCard/CityCard";
import { getCities } from "@/lib/api";
import styles from "./page.module.css";

const page = async () => {
  const cities = await getCities();
  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <h2 className={styles.title}>Welcome to EkoCinema!</h2>
        <p className={styles.text}>Start by selecting your city</p>
        <div className={styles.cityContainer}>
          {cities.map((city, index) => (
            <CityCard city={city} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default page;
