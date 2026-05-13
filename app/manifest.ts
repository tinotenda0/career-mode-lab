import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Career Mode Lab",
    short_name: "Career Lab",
    description: "A mobile-only FIFA and EA FC career mode randomizer with real save challenges, club history, and browser memory.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f4f1ec",
    theme_color: "#c84036",
    orientation: "portrait",
    categories: ["games", "sports", "utilities"],
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      },
      {
        src: "/icons/maskable-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ],
    shortcuts: [
      {
        name: "Start a save",
        short_name: "Start",
        description: "Open Career Mode Lab and generate a career mode brief.",
        url: "/"
      }
    ]
  };
}
