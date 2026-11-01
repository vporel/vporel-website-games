import type { NextConfig } from "next";
import { GAMES, gameRewrites } from "./src/games/games";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return gameRewrites(GAMES, process.env);
  },
};

export default nextConfig;
