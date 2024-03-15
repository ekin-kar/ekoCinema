import { connectToDb } from "@/lib/connectDb";
import { Cinema, CinemaSalon } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectToDb();
    const salons = await CinemaSalon.find();
    return NextResponse.json(salons);
  } catch (error) {
    console.log(error);
    throw new Error("Error getting salons!", error);
  }
};

export const POST = async (req) => {
  try {
    const data = await req.json();
    connectToDb();
    const newSalon = new CinemaSalon(data);
    await newSalon.save();
    const cinema = await Cinema.findById(data.cinemaId);
    if (!cinema) {
      return NextResponse.json({ error: "Cinema not found" }, { status: 404 });
    }
    cinema.salons.push(newSalon.id);
    await cinema.save();
    return NextResponse.json({
      message: "Salon created successfully",
      newSalon,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error creating a salon!", error);
  }
};

export const DELETE = async () => {
  try {
    connectToDb();
    await CinemaSalon.deleteMany();
    return NextResponse.json("All salons deleted");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete all salons!", error);
  }
};

export const PUT = async (req) => {
  try {
    const { salonId, schedule } = await req.json();
    const movieId = schedule[0].movieId;
    connectToDb();
    const salon = await CinemaSalon.findById(salonId);
    if (!salon) {
      return NextResponse.json({ error: "Salon not found" }, { status: 404 });
    }
    salon.schedule.push({ movieId });
    await salon.save();
    return NextResponse.json({
      message: `Schedule added to salon ${salonId} for movie ${movieId}.`,
      salon,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error adding schedule to salon!", error);
  }
};
