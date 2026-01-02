# 🚀 Guide de Déploiement

## Déploiement en Production

### 1. Prérequis Serveur

- Serveur Linux (Ubuntu 20.04+ recommandé)
- Node.js v14+ installé
- MySQL v5.7+ installé
- Gestionnaire de processus (PM2 recommandé)
- Reverse proxy (Nginx recommandé)
- Certificat SSL (Let's Encrypt)

### 2. Installation sur le Serveur

#### Cloner le repository
```bash
git clone <votre-repo>
cd backend
```

#### Installer les dépendances
```bash
npm install --production
```

⚠️ **Note de Sécurité**: Pour une production critique, envisagez de figer les versions exactes des dépendances:
```bash
# Option 1: Générer package-lock.json et l'utiliser
npm install
npm ci --production  # Installation reproductible basée sur package-lock.json

# Option 2: Figer complètement les versions (production haute sécurité)
# Retirer les préfixes ^ et ~ dans package.json
# Exemple: "express": "4.18.2" au lieu de "express": "^4.18.2"
npm install
```

**Avantages du figeage des versions:**
- Protection contre les attaques de la chaîne d'approvisionnement
- Builds reproductibles
- Prévention des changements cassants lors de mises à jour mineures

**Important:** Même avec versions figées, mettez à jour régulièrement:
```bash
npm audit        # Vérifier les vulnérabilités
npm outdated     # Voir les mises à jour disponibles
npm update       # Mettre à jour si nécessaire
```

#### Configurer l'environnement
```bash
cp .env.example .env
nano .env
```

Configuration production dans `.env`:
```env
PORT=3000
NODE_ENV=production

DB_HOST=localhost
DB_USER=devaito_user
DB_PASSWORD=strong_password_here
DB_NAME=devaito_training
DB_PORT=3306

JWT_SECRET=RANDOM_SECURE_KEY_MINIMUM_32_CHARACTERS
JWT_EXPIRE=7d

CORS_ORIGIN=https://votre-domaine.com
```

⚠️ **Important**: 
- Utilisez un JWT_SECRET fort et unique
- Créez un utilisateur MySQL dédié (pas root)
- Activez le firewall du serveur

#### Créer la base de données
```bash
mysql -u root -p
```

```sql
CREATE DATABASE devaito_training CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'devaito_user'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON devaito_training.* TO 'devaito_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Importer le schéma
mysql -u devaito_user -p devaito_training < database/schema.sql
```

### 3. Configuration PM2

PM2 est un gestionnaire de processus pour Node.js.

#### Installer PM2
```bash
npm install -g pm2
```

#### Démarrer l'application
```bash
pm2 start server.js --name devaito-api
```

#### Configuration PM2 avec fichier ecosystem
Créer `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'devaito-api',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
};
```

#### Démarrer avec le fichier ecosystem
```bash
pm2 start ecosystem.config.js
```

#### Commandes PM2 utiles
```bash
pm2 list                    # Lister les processus
pm2 logs devaito-api        # Voir les logs
pm2 restart devaito-api     # Redémarrer
pm2 stop devaito-api        # Arrêter
pm2 delete devaito-api      # Supprimer
pm2 monit                   # Monitoring
pm2 startup                 # Auto-démarrage au boot
pm2 save                    # Sauvegarder la config
```

### 4. Configuration Nginx

Nginx servira de reverse proxy pour l'API.

#### Installer Nginx
```bash
sudo apt update
sudo apt install nginx
```

#### Configuration Nginx
Créer `/etc/nginx/sites-available/devaito-api`:
```nginx
server {
    listen 80;
    server_name api.votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Limite de taille de fichiers uploadés
    client_max_body_size 10M;

    # Logs
    access_log /var/log/nginx/devaito-api-access.log;
    error_log /var/log/nginx/devaito-api-error.log;
}
```

#### Activer le site
```bash
sudo ln -s /etc/nginx/sites-available/devaito-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. Configuration SSL avec Let's Encrypt

#### Installer Certbot
```bash
sudo apt install certbot python3-certbot-nginx
```

#### Obtenir le certificat SSL
```bash
sudo certbot --nginx -d api.votre-domaine.com
```

Certbot configurera automatiquement Nginx pour HTTPS.

#### Renouvellement automatique
```bash
sudo certbot renew --dry-run
```

Le renouvellement automatique est configuré via cron.

### 6. Sécurité

#### Firewall (UFW)
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

#### Sécuriser MySQL
```bash
sudo mysql_secure_installation
```

#### Mettre à jour le système
```bash
sudo apt update && sudo apt upgrade -y
```

#### Changer le mot de passe admin par défaut
Après le premier déploiement:
1. Se connecter avec admin@devaito.com / admin123
2. Créer un nouveau compte admin
3. Supprimer ou désactiver le compte par défaut

#### Variables sensibles
- Ne jamais commiter le fichier `.env`
- Utiliser des secrets forts et uniques
- Rotationner les secrets régulièrement

### 7. Monitoring et Logs

#### Voir les logs de l'application
```bash
pm2 logs devaito-api
pm2 logs devaito-api --lines 100
```

#### Logs Nginx
```bash
sudo tail -f /var/log/nginx/devaito-api-access.log
sudo tail -f /var/log/nginx/devaito-api-error.log
```

#### Monitoring système
```bash
pm2 monit                    # Monitoring PM2
htop                         # Monitoring système
```

### 8. Backup Base de Données

#### Backup manuel
```bash
mysqldump -u devaito_user -p devaito_training > backup_$(date +%Y%m%d).sql
```

#### Backup automatique (cron)
Ajouter à crontab (`crontab -e`):
```bash
# Backup quotidien à 2h du matin
0 2 * * * mysqldump -u devaito_user -p'password' devaito_training > /backups/db_$(date +\%Y\%m\%d).sql
```

#### Restauration
```bash
mysql -u devaito_user -p devaito_training < backup_20240102.sql
```

### 9. Mise à Jour de l'Application

```bash
# 1. Récupérer les nouvelles versions
git pull origin main

# 2. Installer les nouvelles dépendances
npm install --production

# 3. Appliquer les migrations DB si nécessaire
mysql -u devaito_user -p devaito_training < database/migrations/xxx.sql

# 4. Redémarrer l'application
pm2 restart devaito-api

# 5. Vérifier les logs
pm2 logs devaito-api
```

### 10. Troubleshooting Production

#### L'API ne répond pas
```bash
# Vérifier le statut PM2
pm2 list

# Vérifier les logs
pm2 logs devaito-api

# Vérifier Nginx
sudo nginx -t
sudo systemctl status nginx

# Vérifier les ports
sudo netstat -tulpn | grep :3000
```

#### Erreurs de base de données
```bash
# Vérifier MySQL
sudo systemctl status mysql

# Tester la connexion
mysql -u devaito_user -p devaito_training

# Vérifier les permissions
SHOW GRANTS FOR 'devaito_user'@'localhost';
```

#### Problèmes de performance
```bash
# Monitoring
pm2 monit

# Augmenter les instances PM2
pm2 scale devaito-api +2

# Optimiser MySQL
sudo mysqltuner
```

## Configuration Docker (Alternative)

### Dockerfile
```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
      - DB_USER=devaito_user
      - DB_PASSWORD=strong_password
      - DB_NAME=devaito_training
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=root_password
      - MYSQL_DATABASE=devaito_training
      - MYSQL_USER=devaito_user
      - MYSQL_PASSWORD=strong_password
    volumes:
      - mysql_data:/var/lib/mysql
      - ./database/schema.sql:/docker-entrypoint-initdb.d/schema.sql
    restart: unless-stopped

volumes:
  mysql_data:
```

### Démarrage avec Docker
```bash
docker-compose up -d
docker-compose logs -f api
```

## Checklist de Déploiement

- [ ] Serveur configuré avec Node.js et MySQL
- [ ] Variables d'environnement configurées
- [ ] Base de données créée et schéma importé
- [ ] Mot de passe admin par défaut changé
- [ ] PM2 configuré et démarré
- [ ] Nginx configuré comme reverse proxy
- [ ] SSL configuré avec Let's Encrypt
- [ ] Firewall activé et configuré
- [ ] Backups automatiques configurés
- [ ] Monitoring en place
- [ ] Tests de l'API effectués
- [ ] Documentation à jour

## Checklist de Sécurité Production

- [ ] **JWT_SECRET** défini avec une clé forte et unique (min 32 caractères aléatoires)
- [ ] **CORS_ORIGIN** configuré avec le domaine frontend exact (pas de wildcard)
- [ ] **Mot de passe admin** par défaut changé immédiatement
- [ ] **Utilisateur MySQL** dédié créé (pas root)
- [ ] **Firewall** activé avec seulement ports nécessaires ouverts (80, 443, SSH)
- [ ] **SSL/TLS** configuré avec certificat valide
- [ ] **Versions des dépendances** figées ou package-lock.json utilisé
- [ ] **NODE_ENV=production** défini
- [ ] **Logs sensibles** vérifiés (pas de mots de passe, tokens, etc.)
- [ ] **Rate limiting** considéré pour les endpoints publics
- [ ] **Backups automatiques** testés et vérifiés
- [ ] **Audit de sécurité** npm audit exécuté et vulnérabilités corrigées
- [ ] **Headers de sécurité** HTTP configurés (via helmet.js optionnel)
- [ ] **Monitoring d'erreurs** en place
- [ ] **Plan de récupération** en cas d'incident documenté

## Support

Pour des questions ou problèmes:
1. Consulter les logs: `pm2 logs devaito-api`
2. Vérifier la documentation API
3. Tester en local d'abord

Bon déploiement! 🚀
