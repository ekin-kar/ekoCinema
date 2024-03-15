import { connectToDb } from "@/lib/connectDb";
import { CinemaSalon } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectToDb();
    const salons = await CinemaSalon.find();
    return NextResponse.json(salons);
  } catch (error) {
    throw new Error("Error getting salons!", error);
  }
};

export const POST = async (req) => {
  try {
    const data = await req.json();
    connectToDb();
    const newSalon = new CinemaSalon(data);
    await newSalon.save();
    return NextResponse.json({
      message: "Salon created successfully",
      newSalon,
    });
  } catch (error) {
    throw new Error("Error creating a salon!", error);
  }
};

export const DELETE = async () => {
  try {
    connectToDb();
    await CinemaSalon.deleteMany();
    return NextResponse.json("All salons deleted");
  } catch (error) {
    throw new Error("Failed to delete all salons!", error);
  }
};
