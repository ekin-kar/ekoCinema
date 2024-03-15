import { connectToDb } from "@/lib/connectDb";
import { Movie } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectToDb();
    const movies = await Movie.find();
    return NextResponse.json(movies);
  } catch (error) {
    throw new Error("Error getting movies!", error);
  }
};

export const POST = async (req) => {
  try {
    const data = await req.json();
    connectToDb();
    const newMovie = new Movie(data);
    await newMovie.save();
    return NextResponse.json({
      message: "Movie created successfully",
      newMovie,
    });
  } catch (error) {
    throw new Error("Error creating a movie!", error);
  }
};

export const DELETE = async () => {
  try {
    connectToDb();
    await Movie.deleteMany();
    return NextResponse.json("All movies deleted");
  } catch (error) {
    throw new Error("Failed to delete all movies!", error);
  }
};
