import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import preview from "@/../../public/preview.png";



export const metadata = {
  title: "Engineers Design & Development",
  description: "Pushing Limits, Making Dreams Reality",
  openGraph: {
    images: preview,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
          <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
