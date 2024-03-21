import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Eko Cinema",
    template: "%s | Eko Cinema",
  },
  description: "EkoCinema App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="container">
          <div className="main">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
