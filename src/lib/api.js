import { connectToDb } from "./connectDb";
import { City } from "./models";

export const getCities = async () => {
  const cities = await fetch("http://localhost:3000/api/cities", {
    next: { revalidate: 1 },
  });
  return cities.json();
};

export const getCity = async (id) => {
  const city = await fetch(`http://localhost:3000/api/cities/${id}`, {
    next: { revalidate: 1 },
  });
  return city.json();
};

export const getCityByName = async (name) => {
  try {
    connectToDb();
    const city = await City.findOne({
      name: { $regex: new RegExp("^" + name + "$", "i") },
    });
    return city;
  } catch (error) {
    console.error("Error while searching city by name:", error);
    throw error;
  }
};

export const getCinemas = async () => {
  const cinemas = await fetch("http://localhost:3000/api/cinemas", {
    next: { revalidate: 1 },
  });
  return cinemas.json();
};

export const getCinema = async (id) => {
  const cinema = await fetch(`http://localhost:3000/api/cinemas/${id}`, {
    next: { revalidate: 1 },
  });
  return cinema.json();
};

export const getMovies = async () => {
  const movies = await fetch("http://localhost:3000/api/movies", {
    next: { revalidate: 1 },
  });
  return movies.json();
};

export const getMovie = async (id) => {
  const movie = await fetch(`http://localhost:3000/api/movies/${id}`, {
    next: { revalidate: 1 },
  });
  return movie.json();
};

export const getBookings = async () => {
  const bookings = await fetch("http://localhost:3000/api/bookings", {
    next: { revalidate: 1 },
  });
  return bookings.json();
};

export const getBooking = async (id) => {
  const booking = await fetch(`http://localhost:3000/api/bookings/${id}`, {
    next: { revalidate: 1 },
  });
  return booking.json();
};

export const getSalons = async () => {
  const salons = await fetch("http://localhost:3000/api/salons", {
    next: { revalidate: 1 },
  });
  return salons.json();
};

export const getSalon = async (id) => {
  const salon = await fetch(`http://localhost:3000/api/salons/${id}`, {
    next: { revalidate: 1 },
  });
  return salon.json();
};
