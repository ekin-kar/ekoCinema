import { connectToDb } from "@/lib/connectDb";
import { Movie } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    connectToDb();
    const movies = await Movie.findOne({ _id: id });
    return NextResponse.json(movies);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    connectToDb();
    await Movie.deleteOne({ _id: id });
    return NextResponse.json("Movie deleted");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete movie!", error);
  }
};
