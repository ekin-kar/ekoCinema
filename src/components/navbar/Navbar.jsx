import Link from "next/link";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import Image from "next/image";

const Navbar = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <Image
          src="/logo.png"
          className={styles.logo}
          alt="logo"
          width={60}
          height={60}
        />
        <Link href="/" className={styles.title}>
          EkoCinema
        </Link>
      </div>
      <Links />
      <div className={styles.rightWrapper}>
        <div className={styles.language}>
          <Image
            src="/world.png"
            alt="world"
            width={20}
            height={20}
            className={styles.world}
          />
          <select className={styles.langSelect} name="lang" id="lang">
            <option className={styles.option} value="en">
              EN
            </option>
            <option className={styles.option} value="fr">
              FR
            </option>
          </select>
        </div>
        <button className={styles.button}>Sign Out</button>
      </div>
    </div>
  );
};

export default Navbar;
