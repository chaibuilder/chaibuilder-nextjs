import { Metadata } from "next";
import "@/public/chaistyles.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Chaibuilder - Login",
  description: "Authentication pages for Chaibuilder",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html dir="ltr" className="smooth-scroll">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body className="font-sans antialiased">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
