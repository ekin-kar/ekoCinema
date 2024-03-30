import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const citySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  cinemas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cinema",
    },
  ],
});

const cinemaSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  cityId: {
    type: Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
  schedules: [
    {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
    },
  ],
});

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  trailerUrl: String,
  duration: {
    type: Number,
    required: true,
  },
  poster: String,
  genre: String,
  director: String,
  actors: String,
  releaseDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  rating: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
});

const bookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  scheduleId: {
    type: Schema.Types.ObjectId,
    ref: "Schedule",
    required: true,
  },
  seats: [
    {
      type: String,
      required: true,
    },
  ],
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

const scheduleSchema = new Schema({
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  cinemaId: {
    type: Schema.Types.ObjectId,
    ref: "Cinema",
    required: true,
  },
  salon: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  takenSeats: [
    {
      type: String,
      required: true,
    },
  ],
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const City = mongoose.models.City || mongoose.model("City", citySchema);
export const Cinema =
  mongoose.models.Cinema || mongoose.model("Cinema", cinemaSchema);
export const Movie =
  mongoose.models.Movie || mongoose.model("Movie", movieSchema);
export const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
export const Schedule =
  mongoose.models.Schedule || mongoose.model("Schedule", scheduleSchema);
