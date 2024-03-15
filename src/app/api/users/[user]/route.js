import { connectToDb } from "@/lib/connectDb";
import { User } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    connectToDb();
    const users = await User.findOne({ id });
    return NextResponse.json(users);
  } catch (error) {
    throw new Error(error);
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    connectToDb();
    await User.deleteOne({ id });
    return NextResponse.json("User deleted");
  } catch (error) {
    throw new Error("Failed to delete user!", error);
  }
};
