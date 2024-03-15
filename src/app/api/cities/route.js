import { connectToDb } from "@/lib/connectDb";
import { City } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectToDb();
    const cities = await City.find();
    return NextResponse.json(cities);
  } catch (error) {
    throw new Error("Error getting cities!", error);
  }
};

export const POST = async (req) => {
  try {
    const data = await req.json();
    connectToDb();
    const newCity = new City(data);
    await newCity.save();
    return NextResponse.json({
      message: "City created successfully",
      newCity,
    });
  } catch (error) {
    throw new Error("Error creating city!", error);
  }
};

export const DELETE = async () => {
  try {
    connectToDb();
    await City.deleteMany();
    return NextResponse.json("All cities deleted");
  } catch (error) {
    throw new Error("Failed to delete all cities!", error);
  }
};
