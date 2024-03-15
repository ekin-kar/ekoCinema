import { connectToDb } from "@/lib/connectDb";
import { City } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    connectToDb();
    const cities = await City.findOne({ id });
    return NextResponse.json(cities);
  } catch (error) {
    throw new Error("Error getting the city!", error);
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    connectToDb();
    await City.deleteOne({ id });
    return NextResponse.json("City deleted");
  } catch (error) {
    throw new Error("Failed to delete city!", error);
  }
};
