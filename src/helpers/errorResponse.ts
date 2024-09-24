import { NextResponse } from "next/server";

export const nextError = (error: any) => {
  const message: string = error.message || "Server side Error";
  const status: number = error.status || 500;

  return NextResponse.json({ error: message }, { status: status });
};
