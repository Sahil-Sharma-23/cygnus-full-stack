import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key missing from environment variables.");
}

const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");

export async function POST(request: NextRequest) {
  const body = await request.json(); // Assuming the request body is JSON
  const { userId } = body; // Extract necessary data

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId);

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json(); // Assuming the request body is JSON
  const {
    id,
    email,
    username,
    password_hash,
    gender,
    date_of_birth,
    full_name,
  } = body; // Extract necessary data

  try {
    const {  error } = await supabase
      .from("users")
      .upsert({
        id,
        email,
        username,
        password_hash,
        gender,
        date_of_birth,
        full_name,
      })
      .eq("id", id);

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: 204 });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
