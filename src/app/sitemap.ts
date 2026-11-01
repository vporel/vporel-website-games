import type { MetadataRoute } from "next";
import { GAMES, gamePath } from "@/games/games";
import { SITE_URL } from "@/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...GAMES.map((game) => ({ url: `${SITE_URL}${gamePath(game)}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
