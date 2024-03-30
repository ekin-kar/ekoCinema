import { connectToDb } from "@/lib/connectDb";
import { Schedule } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    connectToDb();
    const schedule = await Schedule.findOne({ _id: id });
    return NextResponse.json(schedule);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    connectToDb();
    await Schedule.deleteOne({ _id: id });
    return NextResponse.json("Schedule deleted");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete schedule!", error);
  }
};

export const PATCH = async (request, { params }) => {
  const { id } = params;
  try {
    const data = await request.json();
    const { takenSeats } = data;
    connectToDb();
    const existingSchedule = await Schedule.findById(id);
    if (!existingSchedule) {
      return new Response("Schedule not found", { status: 404 });
    }
    const updatedTakenSeats = [...existingSchedule.takenSeats, ...takenSeats];
    await Schedule.updateOne({ _id: id }, { takenSeats: updatedTakenSeats });
    return new Response(JSON.stringify({ updatedTakenSeats }), { status: 200 });
  } catch (error) {
    console.error("Failed to update schedule:", error);
    return new Response("Failed to update schedule", { status: 500 });
  }
};
