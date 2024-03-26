import { getCinema, getMovie, getSalon } from "./api";

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
