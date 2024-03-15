import { connectToDb } from "@/lib/connectDb";
import { Booking, CinemaSalon } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectToDb();
    const bookings = await Booking.find();
    return NextResponse.json(bookings);
  } catch (error) {
    console.log(error);
    throw new Error("Error getting bookings!", error);
  }
};
export const POST = async (req) => {
  try {
    const data = await req.json();
    connectToDb();
    const newBooking = new Booking(data);
    await newBooking.save();
    const { scheduleId, seats } = data;
    const salon = await CinemaSalon.findOne({ "schedule._id": scheduleId });
    if (!salon) {
      return NextResponse.json({ error: "Salon not found" }, { status: 404 });
    }
    const scheduleEntry = salon.schedule.find(
      (entry) => entry._id.toString() === scheduleId
    );
    if (!scheduleEntry) {
      return NextResponse.json(
        { error: "Schedule entry not found" },
        { status: 404 }
      );
    }
    scheduleEntry.takenSeats.push(seats);
    await salon.save();
    return NextResponse.json({
      message: "Booking created successfully",
      newBooking,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error creating a booking!", error);
  }
};

export const DELETE = async () => {
  try {
    connectToDb();
    await Booking.deleteMany();
    return NextResponse.json("All bookings deleted");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete all bookings!", error);
  }
};
