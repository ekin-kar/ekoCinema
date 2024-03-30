import { getCinema } from "./api";
import { connectToDb } from "./connectDb";
import { Cinema, City, Movie, Schedule } from "./models";

export const getAvailableMovies = async (cinemaId) => {
  try {
    const schedules = await Schedule.find({ cinemaId });
    const movieIds = schedules.map((schedule) => schedule.movieId);
    const availableMovies = await Movie.find({ _id: { $in: movieIds } });
    return availableMovies;
  } catch (error) {
    console.error("Error fetching available movies:", error);
    throw new Error("Error fetching available movies");
  }
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

export const getSchedulesForMovie = async (cinemaId, movieId) => {
  try {
    const schedules = await Schedule.find({ cinemaId, movieId });
    return schedules;
  } catch (error) {
    console.error("Error while searching schedules for movie:", error);
    throw error;
  }
};
