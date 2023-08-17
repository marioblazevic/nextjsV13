"use server";
import mongoose from "mongoose";

let isConnected = false;
let client: any;

export async function connectToDatabase() {
  if (isConnected) {
    console.log("connected");
    return;
  }

  try {
    client = await mongoose.connect(process.env.DB_CONNECTION as string);
    isConnected = true;
  } catch (error) {
    isConnected = false;
    console.log("Error connecting to DB: " + error);
  }
  return client;
}
