import { connectToDb } from "@/lib/connectDb";
import { Cinema, Schedule } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectToDb();
    const schedules = await Schedule.find();
    return NextResponse.json(schedules);
  } catch (error) {
    console.log(error);
    throw new Error("Error getting schedules!", error);
  }
};

export const POST = async (req) => {
  try {
    const requestData = await req.json();
    connectToDb();
    if (Array.isArray(requestData)) {
      const createdSchedules = [];
      for (const data of requestData) {
        const newSchedule = new Schedule(data);
        await newSchedule.save();
        const cinema = await Cinema.findById(data.cinemaId);
        if (!cinema) {
          return NextResponse.json(
            { error: "Cinema not found" },
            { status: 404 }
          );
        }
        cinema.schedules.push(newSchedule.id); // Change cinema.schedule to cinema.schedules
        await cinema.save(); // Save the updated cinema document
        createdSchedules.push(newSchedule);
      }

      return NextResponse.json({
        message: "Schedules created successfully",
        createdSchedules,
      });
    } else {
      const newSchedule = new Schedule(requestData);
      await newSchedule.save();
      const cinema = await Cinema.findById(requestData.cinemaId);
      if (!cinema) {
        return NextResponse.json(
          { error: "Cinema not found" },
          { status: 404 }
        );
      }
      cinema.schedules.push(newSchedule.id);
      await cinema.save();
      return NextResponse.json({
        message: "Schedule created successfully",
        newSchedule,
      });
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error creating schedule(s)!");
  }
};

export const DELETE = async () => {
  try {
    connectToDb();
    await Schedule.deleteMany();
    return NextResponse.json("All schedules deleted");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete all schedules!", error);
  }
};
