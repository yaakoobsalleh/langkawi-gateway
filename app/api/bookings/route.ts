import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        customer_name: data.name,
        whatsapp: data.whatsapp,
        service: data.service,
        vehicle: data.vehicle,
        travel_date: data.date,
        pickup_time: data.time,
        pickup_location: data.location,
        passengers: Number(data.passengers),
        bags: Number(data.bags),
        special_requests: data.requests || "",
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Booking failed" },
      { status: 500 }
    );
  }
}
