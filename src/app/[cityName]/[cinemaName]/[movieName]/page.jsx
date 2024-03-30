import { getMovieByTitle, getMovies, getSalons } from "@/lib/api";
import MoviePage from "@/components/moviePage/MoviePage";
import { getCinemaByName, getSchedulesForMovie } from "@/lib/getters";

const Movie = async ({ params }) => {
  const { movieName, cityName, cinemaName } = params;
  const movie = await getMovieByTitle(movieName);
  const movies = await getMovies();
  const otherMovies = movies.filter((m) => m.title !== movie.title);
  const parameters = params;
  const cinema = await getCinemaByName(cinemaName);
  const schedules = await getSchedulesForMovie(cinema.id, movie.id);

  return (
    <MoviePage
      parameters={parameters}
      movie={JSON.parse(JSON.stringify(movie))}
      cityName={cityName}
      cinemaName={cinemaName}
      schedules={JSON.parse(JSON.stringify(schedules))}
      otherMovies={JSON.parse(JSON.stringify(otherMovies))}
    />
  );
};
export default Movie;
