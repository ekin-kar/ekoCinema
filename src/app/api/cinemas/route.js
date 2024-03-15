import { connectToDb } from "@/lib/connectDb";
import { Cinema, CinemaSalon, City } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectToDb();
    const cinemas = await Cinema.find();
    return NextResponse.json(cinemas);
  } catch (error) {
    console.log(error);
    throw new Error("Error getting cinemas!", error);
  }
};

export const POST = async (req) => {
  try {
    const data = await req.json();
    connectToDb();
    const newCinema = new Cinema(data);
    const savedCinema = await newCinema.save();
    const cityId = data.cityId;
    const city = await City.findById(cityId);
    if (!city) {
      throw new Error(`City with ID ${cityId} not found`);
    }
    city.cinemas.push(savedCinema._id);
    await city.save();
    return NextResponse.json({
      message: "Cinema created successfully",
      newCinema: savedCinema,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error creating a cinema!", error);
  }
};

export const DELETE = async () => {
  try {
    connectToDb();
    await Cinema.deleteMany();
    return NextResponse.json("All cinemas deleted");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete all cinemas!", error);
  }
};

export const PUT = async (req) => {
  try {
    const { cinemaId, salonId } = await req.json();
    connectToDb();
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return NextResponse.json({ error: "Cinema not found" }, { status: 404 });
    }
    const salon = await CinemaSalon.findById(salonId);
    if (!salon) {
      return NextResponse.json({ error: "Salon not found" }, { status: 404 });
    }
    cinema.salons.push(salonId);
    await cinema.save();
    return NextResponse.json({
      message: `Salon ${salonId} added to cinema ${cinemaId}`,
      cinema,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error adding salon to cinema!", error);
  }
};
