import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LANGKAWIGATEWAY | Local Driver • Tours • Activities",
  description: "Discover Langkawi with private transport, island tours and activities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
