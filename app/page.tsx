
const services = [
  { name: "Local Driver Tour", price: "From RM250", desc: "Explore Langkawi with a local driver." },
  { name: "Airport Transfer", price: "From RM60", desc: "Comfortable pickup at Langkawi Airport, Gate 4." },
  { name: "ATV Fun Ride", price: "RM250 / unit", desc: "Discover Langkawi nature on an ATV." },
  { name: "Langkawi River Cruise", price: "RM750 / boat", desc: "Private boat adventure through the mangroves." },
];

export default function Home() {
  return (
    <main style={{ background: "#f5f8f7", color: "#12343b", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <header style={{ padding: "22px 7%", background: "#073b42", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong style={{ fontSize: 22 }}>LANGKAWI GATEWAY</strong>
        <a href="#services" style={{ color: "white" }}>Explore Services</a>
      </header>

      <section style={{ padding: "75px 8%", background: "linear-gradient(120deg,#07545a,#0b303d)", color: "white" }}>
        <p style={{ letterSpacing: 3 }}>LOCAL DRIVER • TOURS • ACTIVITIES</p>
        <h1 style={{ fontSize: "clamp(38px,7vw,64px)", maxWidth: 700, margin: "20px 0" }}>
          Discover Langkawi Your Way
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 550 }}>
          Reliable local transport, exciting tours and unforgettable island experiences.
        </p>
        <a href="#services" style={{ display: "inline-block", marginTop: 25, padding: "15px 25px", background: "#36c6b0", color: "#073b42", borderRadius: 8, textDecoration: "none", fontWeight: "bold" }}>
          Book Your Experience
        </a>
      </section>

      <section id="services" style={{ padding: "55px 7%" }}>
        <h2 style={{ fontSize: 32 }}>Our Services</h2>
        <p>Choose your Langkawi experience.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18, marginTop: 25 }}>
          {services.map((service) => (
            <article key={service.name} style={{ background: "white", padding: 24, borderRadius: 14, boxShadow: "0 4px 18px #12343b12" }}>
              <h3>{service.name}</h3>
              <p>{service.desc}</p>
              <strong style={{ color: "#087e78" }}>{service.price}</strong>
              <p>
                <a href="/booking" style={{ color: "#087e78", fontWeight: "bold" }}>Book Now →</a>
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer style={{ background: "#073b42", color: "white", padding: 30, textAlign: "center" }}>
        <p>LANGKAWI GATEWAY</p>
        <p>Local Driver • Tours • Activities</p>
        <a href="https://wa.me/60134204428" style={{ color: "#55dfc8" }}>Contact Us on WhatsApp</a>
      </footer>
    </main>
  );
}
