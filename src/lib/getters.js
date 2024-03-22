import { getMovie, getSalon } from "./api";

export const getAvaliableMovies = async (cinemas) => {
  const salons = [];
  for (let cinema of cinemas) {
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
