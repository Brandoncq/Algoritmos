import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar";
import ClientNav from "@/components/client";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Algoritmos Congruenciales",
  description: "Calculadora de Algoritmos Congruenciales",
  openGraph: {
    images:
      "https://res.cloudinary.com/dmo6ofy2z/image/upload/v1719379221/samples/landscapes/logomio_p34rv9.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientNav></ClientNav>
        {children}
      </body>
    </html>
  );
}
