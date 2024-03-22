import { connectToDb } from "@/lib/connectDb";
import { Booking } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    connectToDb();
    const booking = await Booking.findOne({ _id: id });
    return NextResponse.json(booking);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    connectToDb();
    await Booking.deleteOne({ _id: id });
    return NextResponse.json("Booking deleted");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete booking!", error);
  }
};
