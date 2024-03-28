import { getCinema, getCities, getMovie, getSalon } from "./api";
import { connectToDb } from "./connectDb";
import { Cinema, City } from "./models";

export const getAvaliableMovies = async (cinemas) => {
  const salons = [];
  const cinemasArray = Array.isArray(cinemas) ? cinemas : [cinemas];
  for (let cinema of cinemasArray) {
    for (let salonId of cinema.salons) {
      const salon = await getSalon(salonId);
      salons.push(salon);
    }
  }
  const schedules = [];
  for (let salon of salons) {
    for (let schedule of salon.schedule) {
      schedules.push(schedule);
    }
  }
  const movieIds = [];
  const movies = [];
  for (let schedule of schedules) {
    const movieId = schedule.movieId;
    if (!movieIds.includes(movieId)) {
      movieIds.push(movieId);
      const movie = await getMovie(movieId);
      movies.push(movie);
    }
  }
  return movies;
};

export const getCinamasInCity = async (city) => {
  const cinemas = [];
  for (let cinemaId of city.cinemas) {
    const cinema = await getCinema(cinemaId);
    cinemas.push(cinema);
  }
  return cinemas;
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

export const getCinemaByName = async (name) => {
  try {
    connectToDb();
    const modifiedName = name.replace(/-/g, " ").toLowerCase();
    const cinema = await Cinema.findOne({
      name: { $regex: new RegExp("^" + modifiedName + "$", "i") },
    });
    return cinema;
  } catch (error) {
    console.error("Error while searching cinema by name:", error);
    throw error;
  }
};
