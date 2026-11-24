
"use client";

import { useState } from "react";

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadBookings() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/bookings", {
        headers: { "x-admin-key": key },
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      setBookings(result.bookings || []);
    } catch (err: any) {
      setError(err.message || "Unable to load bookings");
    }

    setLoading(false);
  }

  return (
    <main style={{ padding: 20, fontFamily: "Arial", maxWidth: 900, margin: "auto" }}>
      <h1>LANGKAWIGATEWAY</h1>
      <h2>Admin Dashboard</h2>

      <input
        type="password"
        placeholder="Admin access key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{ padding: 12, width: "100%", marginBottom: 10 }}
      />

      <button onClick={loadBookings} disabled={loading || !key}>
        {loading ? "Loading..." : "Login / Refresh Bookings"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Total Bookings: {bookings.length}</h2>

      {bookings.map((b) => (
        <section
          key={b.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: 10,
            padding: 15,
            marginTop: 15,
          }}
        >
          <h3>{b.booking_code}</h3>
          <p>Customer: {b.customer_name}</p>
          <p>WhatsApp: {b.whatsapp}</p>
          <p>Service: {b.service}</p>
          <p>Package: {b.package_option}</p>
          <p>Date: {b.travel_date}</p>
          <p>Pickup: {b.pickup_time || "-"}</p>
          <p>Location: {b.pickup_location || "-"}</p>
          <p>Passengers: {b.passengers}</p>
          <p>Bags: {b.bags}</p>
          <p>Amount: RM {b.amount_myr}</p>
          <p>Status: {b.booking_status}</p>
          <p>Payment: {b.payment_status}</p>
          <p>Driver: {b.driver_name || "Not assigned"}</p>
        </section>
      ))}
    </main>
  );
}
