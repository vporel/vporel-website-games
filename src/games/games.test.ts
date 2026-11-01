import { describe, expect, it } from "vitest";
import { GAMES, gameOriginEnvVar, gamePath, gameRewrites } from "./games";

describe("GAMES", () => {
  it("has unique, URL-safe slugs", () => {
    const slugs = GAMES.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  it("serves each game under its slug", () => {
    expect(gamePath({ slug: "ludo" })).toBe("/ludo");
  });
});

describe("gameRewrites", () => {
  const ludo = GAMES.find((g) => g.slug === "ludo")!;

  it("names the env var after the slug", () => {
    expect(gameOriginEnvVar({ slug: "petits-chevaux" })).toBe("GAME_ORIGIN_PETITS_CHEVAUX");
  });

  it("proxies the game path when its origin is set", () => {
    expect(gameRewrites([ludo], { GAME_ORIGIN_LUDO: "http://localhost:3000/" })).toEqual([
      { source: "/ludo", destination: "http://localhost:3000/ludo" },
      { source: "/ludo/:path*", destination: "http://localhost:3000/ludo/:path*" },
    ]);
  });

  it("adds nothing when the origin is not set", () => {
    expect(gameRewrites([ludo], {})).toEqual([]);
    expect(gameRewrites([ludo], { GAME_ORIGIN_LUDO: "" })).toEqual([]);
  });
});
