import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
import { connectDB } from "@/config/db.config";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { config } from "dotenv";
// import { response } from "@/types/response";

connectDB();
config();
// for creating a new user
export const POST = async (req: NextRequest) => {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { error: "Credentials Required" },
      { status: 400 }
    );
  }

  let user = new User({
    username,
    password,
  });
  user = await user.save();
  return NextResponse.json({ message: "User created" }, { status: 201 });
};

export const GET = async (req: NextRequest) => {
  // const accessToken: string = req.cookies.accessToken!;
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Token not found" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = jwt.verify(accessToken, process.env.JWT_SECRET!);
    if (!decoded) {
      return NextResponse.json(
        { error: "Authentication Failed!" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Authentication Failed!" },
      { status: 401 }
    );
  }

  const user = await User.findById(decoded._id, { password: 0 });
  if (!user) {
    return NextResponse.json({ error: "User Not Found!" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "User Fetched", payload: user },
    { status: 201 }
  );
};
