import Navbar from "@/components/navbar/Navbar";
import "./globals.scss";

export const metadata = {
  title: "Sapphire By The Sea | Luxury Beach Cabin in Crystal Beach, TX",
  description:
    "Discover Sapphire By The Sea, a luxurious beach cabin in Crystal Beach, TX, perfect for family getaways and unforgettable memories. Enjoy beautiful views, modern amenities, and easy beach access just minutes away.",
  keywords: "luxury beach cabin, Crystal Beach TX, family vacation, beach house rental, unforgettable memories, seaside getaway, galveston TX, short term rental, beach vacation, beach house",
  author: "B and D Chen",
  openGraph: {
    title: "Sapphire By The Sea",
    description:
      "Experience the ultimate luxury beach cabin at Sapphire By The Sea in Crystal Beach, TX. Ideal for families and friends seeking a memorable vacation.",
    url: "https://sapphirebytheseatx.com", // Replace with your website URL
    image: "https://res.cloudinary.com/dwfzjmsyz/image/upload/f_auto,q_auto/beachpic_d4m2n0", // URL to an image that represents the page
    type: "website",
  },
  twitter: {
    card: "A luxurious beach cabin located in Crystal Beach, TX.",
    title: "Sapphire By The Sea",
    description:
      "Escape to Sapphire By The Sea, a stunning luxury beach cabin in Crystal Beach, TX. Create unforgettable memories with your loved ones.",
    image: "https://res.cloudinary.com/dwfzjmsyz/image/upload/f_auto,q_auto/beachpic_d4m2n0", 
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
