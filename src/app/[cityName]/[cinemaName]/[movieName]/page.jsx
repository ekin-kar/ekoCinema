import { getMovieByTitle, getMovies, getSalons } from "@/lib/api";
import MoviePage from "@/components/moviePage/MoviePage";
import { getCinemaByName } from "@/lib/getters";
const findScheduleForMovie = (allSalons, cinemaId, movieId) => {
  for (let salon of allSalons) {
    if (salon.cinemaId === cinemaId) {
      for (let schedule of salon.schedule) {
        if (schedule.movieId === movieId) {
          return schedule;
        }
      }
      break;
    }
  }
  return null;
};
const Movie = async ({ params }) => {
  const { movieName, cityName, cinemaName } = params;
  const movie = await getMovieByTitle(movieName);
  const movies = await getMovies();
  const otherMovies = movies.filter((m) => m.title !== movie.title);
  const parameters = params;
  const allSalons = await getSalons();
  const cinema = await getCinemaByName(cinemaName);
  const schedule = findScheduleForMovie(allSalons, cinema.id, movie.id);

  return (
    <MoviePage
      parameters={parameters}
      movie={JSON.parse(JSON.stringify(movie))}
      cityName={cityName}
      cinemaName={cinemaName}
      schedule={schedule}
      otherMovies={JSON.parse(JSON.stringify(otherMovies))}
    />
  );
};
export default Movie;
