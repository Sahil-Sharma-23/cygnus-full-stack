import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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
    const { email, username, password_hash, gender, date_of_birth, full_name } =
      body; // Extract necessary data

    if (!username || !email) {
      return NextResponse.json(
        { error: "Username and email are required" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("users")
      .insert([
        { email, username, password_hash, gender, date_of_birth, full_name },
      ])
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 }); // 201 Created
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
