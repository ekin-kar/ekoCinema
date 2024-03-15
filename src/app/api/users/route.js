import { connectToDb } from "@/lib/connectDb";
import { User } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectToDb();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    throw new Error("Error getting users!", error);
  }
};

export const POST = async (req) => {
  try {
    const data = await req.json();
    connectToDb();
    const newUser = new User(data);
    await newUser.save();
    return NextResponse.json({
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    throw new Error("Error creating a user!", error);
  }
};

export const DELETE = async () => {
  try {
    connectToDb();
    await User.deleteMany();
    return NextResponse.json("All users deleted");
  } catch (error) {
    throw new Error("Failed to delete all users!", error);
  }
};
