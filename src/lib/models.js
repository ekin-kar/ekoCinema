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
  salons: [
    {
      type: Schema.Types.ObjectId,
      ref: "CinemaSalon",
    },
  ],
});

const cinemaSalonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cinemaId: {
    type: Schema.Types.ObjectId,
    ref: "Cinema",
    required: true,
  },
  schedule: [
    {
      movieId: {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
        required: true,
      },
      takenSeats: {
        type: [String],
        default: [],
      },
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
    ref: "CinemaSalon.schedule",
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

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const City = mongoose.models.City || mongoose.model("City", citySchema);
export const Cinema =
  mongoose.models.Cinema || mongoose.model("Cinema", cinemaSchema);
export const CinemaSalon =
  mongoose.models.CinemaSalon ||
  mongoose.model("CinemaSalon", cinemaSalonSchema);
export const Movie =
  mongoose.models.Movie || mongoose.model("Movie", movieSchema);
export const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
