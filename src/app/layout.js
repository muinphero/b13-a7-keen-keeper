import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata = {
  title: "KeenKeeper",
  description: "Keep Your Friendships Alive",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#edf0f4] text-slate-900">
        <Navbar />
        <main className="min-h-[calc(100vh-64px)]">
          <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
