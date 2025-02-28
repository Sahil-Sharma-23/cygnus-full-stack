import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key missing from environment variables.");
}

const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); // Assuming the request body is JSON
    const { email, password_hash } = body; // Extract necessary data

    if (!email || !password_hash) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("email", email)
      .eq("password_hash", password_hash)
      .single();

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (data) {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        return NextResponse.json(
          { error: "JWT secret is not defined" },
          { status: 500 },
        );
      }

      const token = jwt.sign(
        { userId: data.id, username: data.username },
        jwtSecret,
        { expiresIn: "1h" },
      );
      const payload = { data, token };
      return NextResponse.json(payload, { status: 200 });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
