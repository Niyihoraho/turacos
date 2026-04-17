import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

// Remove Google Font imports and initializations to avoid build failures due to font fetching
const interVariable = '--font-inter';
const playfairVariable = '--font-playfair';

export const metadata: Metadata = {
  title: "Turacos Tours | Rwanda Wildlife Safaris & Primate Tracking",
  description: "Explore Lake Kivu and Rwanda with Turacos Tours. Kayaking, boat trips, gorilla trekking, safari, and cultural experiences. Book your adventure today.",
  keywords: "Rwanda safari, gorilla trekking Rwanda, Turacos Tours, Nyungwe chimpanzee, Akagera safari, Lake Kivu",
  openGraph: {
    title: "Turacos Tours | Rwanda Wildlife Safaris & Primate Tracking",
    description: "Discover Rwanda with Turacos Tours. Expert-guided gorilla trekking, chimpanzee tracking, Akagera safaris, and Lake Kivu experiences.",
    images: ["https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200"],
  },
  icons: {
    icon: "/images/logoo.png",
    apple: "/images/logoo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${interVariable} ${playfairVariable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
