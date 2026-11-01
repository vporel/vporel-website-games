# À faire (manuellement)

## 1. Déployer la vitrine sur o2switch
- [ ] En local, construire `vporel-website-games.zip` :
  - `npm run build-full` pour le **premier** déploiement, ou après l'ajout ou la mise à jour d'un package (le zip contient `node_modules`).
  - `npm run build` pour les déploiements suivants (zip sans `node_modules` : ceux déjà sur le serveur sont conservés).
- [ ] Dans cPanel, **Setup Node.js App**, puis **Create Application** :
  - Node.js version : 20 ou plus
  - Application mode : Production
  - Application root : par exemple `apps/vporel-website-games`
  - Application URL : `games.vporel.com`, en laissant le chemin **vide** (racine)
  - Application startup file : `server.js`
- [ ] Envoyer `vporel-website-games.zip` dans le dossier de l'application (Gestionnaire de fichiers), puis l'extraire.
- [ ] Ajouter la variable d'environnement `NODE_ENV=production`, puis **Restart**.
- [ ] Vérifier que https://games.vporel.com affiche la vitrine.

## 2. Déployer Ludo sous /ludo
Les étapes sont dans `../ludo/à-faire.md`, section « Déploiement ». En résumé : une 2e application Node.js dont l'Application URL est `games.vporel.com/ludo`.

## 3. Vérifier le lien vitrine → Ludo
- [ ] Cliquer sur la carte Ludo depuis https://games.vporel.com. On doit arriver sur la page de connexion de Ludo (`/ludo/login`).
- [ ] **Si `/ludo` donne une erreur 404 ou la vitrine au lieu du jeu**, cPanel ne sait pas servir Ludo sous ce chemin. Solution de repli :
  1. Déployer Ludo sur un sous-domaine à part, par exemple `ludo-app.games.vporel.com`, avec l'Application URL à la racine de ce sous-domaine.
  2. Reconstruire la vitrine **avec la variable définie au moment du build** (Next fige les redirections internes au build) : `GAME_ORIGIN_LUDO=https://ludo-app.games.vporel.com npm run build` (ou `build-full`). Il suffit aussi de mettre la ligne dans un fichier `.env.production` avant le build.
  3. Redéployer le zip, puis **Restart**. La vitrine relaie alors `/ludo` vers ce sous-domaine, et les joueurs continuent de voir `games.vporel.com/ludo`.

## Pipeline de déploiement automatique (GitHub Actions → serveur)
GitHub construit l'app (`.github/workflows/deploy.yml`) et publie le résultat sur la branche `deploy` ; le serveur la télécharge via le cron de `../deploy-o2switch` (voir son README).
- [ ] GitHub, **Settings → Secrets and variables → Actions → Variables** : aucune requise (`GAME_ORIGIN_LUDO` doit rester vide). Ce dépôt n'a pas encore de remote GitHub : le créer et vérifier son nom dans `pull-deploy.sh`.
- [ ] Sur le serveur, générer la clé `~/.ssh/deploy_vporel-website-games` et l'ajouter comme **Deploy key** (lecture seule) du dépôt (détails dans `../deploy-o2switch/README.md`).
- [ ] Les variables d'environnement serveur (`NODE_ENV=production`, clés secrètes) restent définies dans l'application Node.js de cPanel.
- [ ] Premier déploiement : lancer le workflow à la main (`workflow_dispatch`), attendre le cron, vérifier `~/.deploy/vporel-website-games/deploy.log`.
