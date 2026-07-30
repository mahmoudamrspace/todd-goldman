import localFont from "next/font/local";

export const averia = localFont({
  src: [
    {
      path: "../../../public/assets/fonts/font-d8f7ac63.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/font-fd49bfc5.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../../public/assets/fonts/font-5a8463df.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/font-029cd5e4.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/assets/fonts/font-d13e2870.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/font-441cff38.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-averia",
  display: "swap",
});

export const interDisplay = localFont({
  src: [
    {
      path: "../../../public/assets/fonts/font-9c51bc37.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/font-f8838bdc.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/font-30b1f8e8.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/font-d328df11.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter-display",
  display: "swap",
});

export const inter = localFont({
  src: [
    {
      path: "../../../public/assets/fonts/font-5afd6099.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/font-8a18e34e.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/font-cd48ba5f.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const grapeNuts = localFont({
  src: "../../../public/assets/fonts/font-ccc6ed47.woff2",
  variable: "--font-grape-nuts",
  weight: "400",
  display: "swap",
});

export const cabinet = localFont({
  src: "../../../public/assets/fonts/font-03472585.woff2",
  variable: "--font-cabinet",
  weight: "500",
  display: "swap",
});
