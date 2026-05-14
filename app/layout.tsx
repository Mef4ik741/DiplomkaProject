import type { Metadata } from "next";
import "./globals.css";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Toast from "./components/Toast";

export const metadata: Metadata = {
  title: "Voyager — Турагентство",
  description: "Путешествия, которые остаются в душе",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Cursor />
        <Nav />
        {children}
        <Footer />
        <Modal />
        <Toast />
      </body>
    </html>
  );
}
