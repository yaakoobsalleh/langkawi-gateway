
"use client";

import { useState } from "react";

export default function BookingPage() {
  const [service, setService] = useState("Local Driver Tour");
  const [vehicle, setVehicle] = useState("Sedan");
  const [duration, setDuration] = useState("4 Hours");

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

      <form onSubmit={(e) => {
        e.preventDefault();
        alert("Booking form completed. Online submission will be connected next.");
      }}>
        <label>Full Name</label>
        <input required placeholder="Your full name" style={field} />

        <label>WhatsApp Number</label>
        <input required type="tel" placeholder="+60..." style={field} />

        <label>Choose Service</label>
        <select value={service}
          onChange={e => setService(e.target.value)} style={field}>
          <option>Local Driver Tour</option>
          <option>Airport Transfer</option>
          <option>ATV Fun Ride</option>
          <option>Langkawi River Cruise</option>
        </select>

        <label>Vehicle</label>
        <select value={vehicle}
          onChange={e => setVehicle(e.target.value)} style={field}>
          <option>Sedan</option>
          <option>MPV</option>
        </select>

        {service === "Local Driver Tour" && <>
          <label>Tour Duration</label>
          <select value={duration}
            onChange={e => setDuration(e.target.value)} style={field}>
            <option>4 Hours</option>
            <option>8 Hours</option>
          </select>
        </>}

        <label>Travel Date</label>
        <input required type="date" min={new Date().toISOString().split("T")[0]}
          style={field} />

        <label>Pickup Time</label>
        <input required type="time" min="10:00" style={field} />

        <label>Pickup Location / Hotel</label>
        <input required placeholder="Hotel or pickup location" style={field} />

        <label>Number of Passengers</label>
        <input required type="number" min="1" max={vehicle === "Sedan" ? 3 : 6}
          defaultValue="1" style={field} />

        <label>Number of Bags</label>
        <input type="number" min="0" defaultValue="0" style={field} />

        <label>Special Requests</label>
        <textarea placeholder="Any additional requests?"
          style={{ ...field, minHeight: 90 }} />

        <button type="submit" style={{
          width: "100%",
          padding: 16,
          marginTop: 20,
          background: "#07877f",
          color: "white",
          border: 0,
          borderRadius: 8,
          fontSize: 17
        }}>
          Submit Booking Request
        </button>
      </form>
    </main>
  );
}

const field = {
  display: "block",
  width: "100%",
  boxSizing: "border-box" as const,
  padding: 13,
  margin: "8px 0 18px",
  border: "1px solid #ccd8d8",
  borderRadius: 7,
  fontSize: 16
};
