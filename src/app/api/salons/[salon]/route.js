import { connectToDb } from "@/lib/connectDb";
import { CinemaSalon } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    connectToDb();
    const salon = await CinemaSalon.findOne({ id });
    return NextResponse.json(salon);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    connectToDb();
    await CinemaSalon.deleteOne({ id });
    return NextResponse.json("Salon deleted");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete salon!", error);
  }
};
