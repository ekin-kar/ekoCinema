import { connectToDb } from "@/lib/connectDb";
import { Cinema } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    connectToDb();
    const cinema = await Cinema.findOne({ id });
    return NextResponse.json(cinema);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    connectToDb();
    await Cinema.deleteOne({ id });
    return NextResponse.json("Cinema deleted");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete cinema!", error);
  }
};
