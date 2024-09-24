import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
import { connectDB } from "@/config/db.config";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

connectDB();
config();

export const POST = async (req: NextRequest) => {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { error: "Credentials Required" },
      { status: 400 }
    );
  }

  const user = await User.findOne({ username });

  if (!user) {
    return NextResponse.json(
      { error: "Authentication Failed!" },
      { status: 401 }
    );
  }

  if (user.password !== password) {
    return NextResponse.json(
      { error: "Authentication Failed!" },
      { status: 401 }
    );
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!);

  const response = NextResponse.json(
    { message: "Loggin Successfully" ,payload : user},
    { status: 200 }
  );

  response.cookies.set("accessToken", token, {
    httpOnly: true,
    path: "/",
    secure: false,
  });

  return response;
};
