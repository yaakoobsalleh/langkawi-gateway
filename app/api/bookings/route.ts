
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(request: Request) {
  try {
    const adminKey = request.headers.get("x-admin-key");

    if (!adminKey || adminKey !== process.env.ADMIN_ACCESS_KEY) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data, error } = await supabaseAdmin()
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, bookings: data });
  } catch (error) {
    console.error("Admin booking error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to load bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (
      !data.name ||
      !data.whatsapp ||
      !data.service ||
      !data.vehicle ||
      !data.date
    ) {
      return NextResponse.json(
        { success: false, message: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const supabase = supabaseAdmin();
    let amount = 0;
    let packageOption = "";

    if (data.service === "Local Driver Tour") {
      packageOption = `${data.vehicle} - ${data.duration}`;

      if (data.vehicle === "Sedan" && data.duration === "4 Hours") amount = 250;
      if (data.vehicle === "Sedan" && data.duration === "8 Hours") amount = 350;
      if (data.vehicle === "MPV" && data.duration === "4 Hours") amount = 350;
      if (data.vehicle === "MPV" && data.duration === "8 Hours") amount = 450;
    } else if (data.service === "Airport Transfer") {
      packageOption = data.vehicle;
      amount = data.vehicle === "Sedan" ? 60 : 90;
    } else if (data.service === "ATV") {
      packageOption = "1 Hour";
      amount = 250;
    } else if (data.service === "River Cruise") {
      packageOption = "Private Boat - 3 Hours";
      amount = 750;
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid service." },
        { status: 400 }
      );
    }

    const { data: latest } = await supabase
      .from("bookings")
      .select("booking_code")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const lastNumber = Number(
      latest?.booking_code?.replace("LGW-", "") || 0
    );

    const bookingCode = `LGW-${String(lastNumber + 1).padStart(6, "0")}`;

    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        booking_code: bookingCode,
        customer_name: data.name,
        whatsapp: data.whatsapp,
        service: data.service,
        package_option: packageOption,
        travel_date: data.date,
        pickup_time: data.time || null,
        pickup_location: data.location || null,
        passengers: Number(data.passengers || 1),
        bags: Number(data.bags || 0),
        special_requests: data.requests || null,
        amount_myr: amount,
        booking_status: "Pending Review",
        payment_status: "Unpaid – Cash",
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { success: false, message: "Booking failed. Please try again." },
      { status: 500 }
    );
  }
}
