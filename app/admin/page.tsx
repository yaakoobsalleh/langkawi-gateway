"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadBookings() {
    setLoading(true);
    const response = await fetch("/api/bookings");
    const result = await response.json();
    if (result.success) setBookings(result.bookings || []);
    setLoading(false);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <main style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>LANGKAWIGATEWAY</h1>
      <h2>Admin Dashboard</h2>

      <button onClick={loadBookings}>Refresh Bookings</button>

      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((b) => (
          <section key={b.id} style={{
            border: "1px solid #ccc",
            borderRadius: 10,
            padding: 15,
            marginTop: 15
          }}>
            <h3>{b.booking_code}</h3>
            <p>Customer: {b.customer_name}</p>
            <p>WhatsApp: {b.whatsapp}</p>
            <p>Service: {b.service}</p>
            <p>Date: {b.travel_date}</p>
            <p>Status: {b.booking_status}</p>
            <p>Payment: {b.payment_status}</p>
          </section>
        ))
      )}
    </main>
  );
}