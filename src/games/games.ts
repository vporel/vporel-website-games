export type GameAccent = "red" | "green" | "yellow" | "blue";

export type Game = {
  /** URL segment: the game is served at games.vporel.com/<slug>. */
  slug: string;
  name: string;
  tagline: string;
  players: string;
  tags: string[];
  accent: GameAccent;
};

/** Games shown on the home page, in display order. */
export const GAMES: Game[] = [
  {
    slug: "ludo",
    name: "Ludo",
    tagline: "Le grand classique du plateau en croix : sors tes pions avec un 6, capture tes adversaires et ramène tout le monde à la maison.",
    players: "2 à 4 joueurs",
    tags: ["Entre amis"],
    accent: "red",
  },
];

export function gamePath(game: Pick<Game, "slug">): string {
  return `/${game.slug}`;
}

/** Env var holding the origin a game is proxied to, e.g. GAME_ORIGIN_LUDO. */
export function gameOriginEnvVar(game: Pick<Game, "slug">): string {
  return `GAME_ORIGIN_${game.slug.toUpperCase().replace(/[^A-Z0-9]/g, "_")}`;
}

/**
 * Rewrites proxying /<slug> and everything below it to the game's own deployment, for games whose
 * origin is configured. The game app must use `basePath: "/<slug>"`.
 */
export function gameRewrites(games: Game[], env: Record<string, string | undefined>) {
  return games.flatMap((game) => {
    const origin = env[gameOriginEnvVar(game)]?.replace(/\/+$/, "");
    if (!origin) return [];
    const path = gamePath(game);
    return [
      { source: path, destination: `${origin}${path}` },
      { source: `${path}/:path*`, destination: `${origin}${path}/:path*` },
    ];
  });
}
