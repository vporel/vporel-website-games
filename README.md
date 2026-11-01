# vporel games

Vitrine des jeux en ligne de vporel, servie sur `games.vporel.com`. Chaque jeu est une application
séparée, servie sous `games.vporel.com/<slug>` (par exemple `/ludo`, code dans `../ludo`).

## Développement

```bash
npm install
npm run dev          # http://localhost:3001
```

Pour tester le passage de la vitrine vers un jeu en local :

```bash
# dans ../ludo
PORT=3000 npm run dev
# ici, avec le relais vers Ludo
GAME_ORIGIN_LUDO=http://localhost:3000 npm run dev
# puis ouvrir http://localhost:3001/ludo
```

## Ajouter un jeu

1. Ajouter une entrée dans `GAMES` (`src/games/games.ts`).
2. Créer son illustration dans `src/components/` et l'enregistrer dans `ILLUSTRATIONS` (`GameCard.tsx`).
3. Configurer le jeu avec `basePath: "/<slug>"`.

## Déploiement (o2switch, cPanel)

`npm run build` ou `npm run build-full` produit `vporel-website-games.zip` (build « standalone »). Les étapes détaillées sont dans `à-faire.md`.

## Scripts

- `npm run dev` : serveur de développement (port 3001)
- `npm run build` : build de production et archive zip **sans** `node_modules` (déploiement courant)
- `npm run build-full` : même chose **avec** `node_modules` (premier déploiement, ou après l'ajout ou la mise à jour d'un package)
- `npm test` : tests (Vitest)
- `npm run lint`
