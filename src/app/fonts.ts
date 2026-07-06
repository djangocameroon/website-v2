import { Poppins, Urbanist, Nova_Script } from "next/font/google";
import localFont from "next/font/local";

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const urbanist = Urbanist({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-urbanist",
  display: "swap",
});

export const novaScript = Nova_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-nova",
  display: "swap",
});

export const nohemi = localFont({
  src: [
    { path: "../../public/fonts/Nohemi-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Nohemi-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/Nohemi-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Nohemi-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-nohemi",
  display: "swap",
});

export const fontVariables = `${poppins.variable} ${urbanist.variable} ${novaScript.variable} ${nohemi.variable}`;
