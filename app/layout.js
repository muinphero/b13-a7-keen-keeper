import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AppProviders from "@/components/shared/AppProviders";

export const metadata = {
  title: "KeenKeeper",
  description: "Keep Your Friendships Alive",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="bg-[#edf0f4] text-slate-900">
        <AppProviders>
          <Navbar />
          <main className="min-h-[calc(100vh-64px)]">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
              {children}
            </div>
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
