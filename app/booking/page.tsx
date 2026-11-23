
"use client";

import { useState } from "react";

export default function BookingPage() {
  const [service, setService] = useState("Local Driver Tour");
  const [vehicle, setVehicle] = useState("Sedan");
  const [duration, setDuration] = useState("4 Hours");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    date: "",
    time: "10:00",
    location: "",
    passengers: "1",
    bags: "0",
    requests: ""
  });

  const field = {
    width: "100%",
    padding: 14,
    margin: "8px 0 18px",
    border: "1px solid #ccc",
    borderRadius: 8,
    fontSize: 16
  };

  const label = {
    display: "block",
    fontWeight: 600
  };

  async function submitBooking(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          service,
          vehicle,
          duration,
          passengers: Number(form.passengers),
          bags: Number(form.bags)
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Booking failed. Please try again.");
      }

      setMessage(
        "Booking request submitted successfully. Our team will review and contact you on WhatsApp."
      );

      setForm({
        name: "",
        whatsapp: "",
        date: "",
        time: "10:00",
        location: "",
        passengers: "1",
        bags: "0",
        requests: ""
      });
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      maxWidth: 650,
      margin: "auto",
      padding: 24,
      fontFamily: "Arial",
      color: "#123b40"
    }}>
      <h1>Book Your Langkawi Experience</h1>
      <p>Submit your booking request. We will review and confirm it.</p>

      <form onSubmit={submitBooking}>
        <label style={label}>Full Name</label>
        <input required style={field}
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
          placeholder="Your full name" />

        <label style={label}>WhatsApp Number</label>
        <input required type="tel" style={field}
          value={form.whatsapp}
          onChange={e => setForm({...form, whatsapp: e.target.value})}
          placeholder="+60..." />

        <label style={label}>Choose Service</label>
        <select style={field} value={service}
          onChange={e => setService(e.target.value)}>
          <option>Local Driver Tour</option>
          <option>Airport Transfer</option>
          <option>ATV Fun Ride</option>
          <option>Langkawi River Cruise</option>
        </select>

        <label style={label}>Vehicle</label>
        <select style={field} value={vehicle}
          onChange={e => setVehicle(e.target.value)}>
          <option>Sedan</option>
          <option>MPV</option>
        </select>

        {service === "Local Driver Tour" && <>
          <label style={label}>Tour Duration</label>
          <select style={field} value={duration}
            onChange={e => setDuration(e.target.value)}>
            <option>4 Hours</option>
            <option>8 Hours</option>
          </select>
        </>}

        <label style={label}>Travel Date</label>
        <input required type="date" style={field}
          min={new Date().toISOString().split("T")[0]}
          value={form.date}
          onChange={e => setForm({...form, date: e.target.value})} />

        <label style={label}>Pickup Time</label>
        <input required type="time" style={field}
          min={service === "Local Driver Tour" ? "10:00" : undefined}
          value={form.time}
          onChange={e => setForm({...form, time: e.target.value})} />

        <label style={label}>Pickup Location / Hotel</label>
        <input required style={field}
          value={form.location}
          onChange={e => setForm({...form, location: e.target.value})}
          placeholder="Hotel or pickup location" />

        <label style={label}>Number of Passengers</label>
        <input required type="number" min="1"
          max={vehicle === "Sedan" ? 3 : 6}
          style={field}
          value={form.passengers}
          onChange={e => setForm({...form, passengers: e.target.value})} />

        <label style={label}>Number of Bags</label>
        <input type="number" min="0"
          max={vehicle === "Sedan" ? 2 : 4}
          style={field}
          value={form.bags}
          onChange={e => setForm({...form, bags: e.target.value})} />

        <label style={label}>Special Requests</label>
        <textarea style={{...field, minHeight: 90}}
          value={form.requests}
          onChange={e => setForm({...form, requests: e.target.value})}
          placeholder="Any additional requests?" />

        <button type="submit" disabled={loading}
          style={{
            width: "100%",
            padding: 16,
            background: "#16b8a6",
            color: "white",
            border: 0,
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 700
          }}>
          {loading ? "Submitting..." : "Submit Booking"}
        </button>

        {message && <p style={{marginTop: 20}}>{message}</p>}
      </form>
    </main>
  );
}
