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
});

const cinemaSalonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
  movies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie",
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
});

const seatSchema = new Schema({
  number: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  cinemaSalon: {
    type: Schema.Types.ObjectId,
    ref: "CinemaSalon",
    required: true,
  },
});

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  cinemaSalon: {
    type: Schema.Types.ObjectId,
    ref: "CinemaSalon",
    required: true,
  },
  seats: [
    {
      type: Schema.Types.ObjectId,
      ref: "Seat",
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
export const CinemaSalon =
  mongoose.models.CinemaSalon ||
  mongoose.model("CinemaSalon", cinemaSalonSchema);
export const Movie =
  mongoose.models.Movie || mongoose.model("Movie", movieSchema);
export const Seat = mongoose.models.Seat || mongoose.model("Seat", seatSchema);
export const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
