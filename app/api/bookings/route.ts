
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (
      !data.name ||
      !data.whatsapp ||
      !data.date ||
      !data.service ||
      !data.vehicle
    ) {
      return NextResponse.json(
        { success: false, message: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const vehicle = data.vehicle;
    const duration = data.duration || "";
    let packageOption = "";
    let amount = 0;

    if (data.service === "Local Driver Tour") {
      packageOption = `${vehicle} - ${duration}`;

      if (vehicle === "Sedan" && duration === "4 Hours") amount = 250;
      else if (vehicle === "Sedan" && duration === "8 Hours") amount = 350;
      else if (vehicle === "MPV" && duration === "4 Hours") amount = 350;
      else if (vehicle === "MPV" && duration === "8 Hours") amount = 450;

    } else if (data.service === "Airport Transfer") {
      packageOption = `${vehicle} - Airport Transfer`;

      if (vehicle === "Sedan") amount = 60;
      else if (vehicle === "MPV") amount = 90;

    } else if (data.service === "ATV Fun Ride") {
      packageOption = "1 Hour";
      amount = 250;

    } else if (data.service === "Langkawi River Cruise") {
      packageOption = "Private Boat - 3 Hours";
      amount = 750;
    }

    if (!amount) {
      return NextResponse.json(
        { success: false, message: "Invalid service or package." },
        { status: 400 }
      );
    }

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
        package_option: packageOption,
        travel_date: data.date,
        pickup_time: data.time || null,
        pickup_location: data.location || null,
        passengers: Number(data.passengers || 1),
        bags: Number(data.bags || 0),
        special_requests: data.requests || null,
        amount_myr: amount,
        booking_status: "Pending Review",
        payment_status: "Unpaid – Cash"
      })
      .select()
      .single();

    if (error) {
      console.error("Booking insert error:", error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      booking
    });

  } catch (error) {
    console.error("Booking API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Booking failed. Please try again."
      },
      { status: 500 }
    );
  }
}
