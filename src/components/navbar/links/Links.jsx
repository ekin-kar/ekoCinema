"use client";
import { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";

const links = [
  { title: "Home", path: "/" },
  { title: "Movies", path: "/movies" },
  {
    title: "Pricing",
    path: "/pricing",
  },
  {
    title: "Kids",
    path: "/kids",
  },
  {
    title: "About",
    path: "/about",
  },
];

const Links = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink className={styles.link} item={link} key={link.title} />
        ))}
      </div>
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={20}
        height={20}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
