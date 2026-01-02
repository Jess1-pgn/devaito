# 🚀 Guide de Démarrage Rapide

## Installation et Configuration

### 1. Prérequis
Assurez-vous d'avoir installé:
- Node.js v14+ ([télécharger](https://nodejs.org))
- MySQL v5.7+ ([télécharger](https://dev.mysql.com/downloads/mysql/))
- npm ou yarn

### 2. Installation des dépendances

```bash
cd backend
npm install
```

### 3. Configuration de la base de données

#### Créer la base de données
```bash
mysql -u root -p
```

Puis dans MySQL:
```sql
source database/schema.sql
```

Ou depuis le terminal:
```bash
mysql -u root -p < database/schema.sql
```

### 4. Configuration de l'environnement

Copier le fichier `.env.example` vers `.env`:
```bash
cp .env.example .env
```

Éditer `.env` avec vos paramètres:
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=devaito_training
DB_PORT=3306

JWT_SECRET=changez_ceci_en_production_avec_une_cle_securisee
JWT_EXPIRE=7d

CORS_ORIGIN=http://localhost:3001
```

⚠️ **Important**: Changez `JWT_SECRET` en production avec une clé aléatoire sécurisée!

### 5. Démarrage du serveur

Mode développement (avec rechargement automatique):
```bash
npm run dev
```

Mode production:
```bash
npm start
```

Le serveur démarre sur `http://localhost:3000`

### 6. Test de l'API

Ouvrir votre navigateur sur `http://localhost:3000` - vous devriez voir:
```json
{
  "message": "API de Gestion de Formation Devaito",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

## Test avec Postman

### Importer la collection
1. Ouvrir Postman
2. Importer le fichier `postman_collection.json`
3. Les endpoints sont organisés par catégories

### Test de connexion

1. **Login** avec le compte admin par défaut:
   - Endpoint: `POST /api/auth/login`
   - Body:
   ```json
   {
     "email": "admin@devaito.com",
     "password": "admin123"
   }
   ```

2. **Copier le token** retourné dans la réponse

3. **Configurer le token** dans Postman:
   - Variables → `jwt_token` → coller votre token

4. **Tester les autres endpoints** protégés

## Flux de Test Complet

### 1. Authentification
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@devaito.com","password":"admin123"}'
```

Sauvegarder le token retourné.

### 2. Créer une Formation
```bash
curl -X POST http://localhost:3000/api/formations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -d '{
    "titre": "Formation React",
    "description": "Apprendre React.js",
    "categorie": "Développement Web",
    "nombre_heures": 30,
    "cout": 1200,
    "objectifs": "Maîtriser React",
    "programme": "Components, Hooks, Context API",
    "type_public": "mixte",
    "ville": "Paris"
  }'
```

### 3. Créer un Formateur
```bash
curl -X POST http://localhost:3000/api/formateurs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -d '{
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean.dupont@example.com",
    "telephone": "0612345678",
    "competences": "React, JavaScript, Node.js",
    "remarques": "Expert React"
  }'
```

### 4. Créer une Entreprise
```bash
curl -X POST http://localhost:3000/api/entreprises \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -d '{
    "nom": "TechCorp",
    "adresse": "123 Rue de Paris",
    "telephone": "0144556677",
    "email": "contact@techcorp.fr",
    "url": "https://techcorp.fr"
  }'
```

### 5. Planifier une Session
```bash
curl -X POST http://localhost:3000/api/sessions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -d '{
    "formation_id": 1,
    "formateur_id": 1,
    "entreprise_id": 1,
    "date_debut": "2024-03-15",
    "date_fin": "2024-03-22",
    "type_session": "entreprise"
  }'
```

### 6. Inscription d'un Participant (Public)
```bash
curl -X POST http://localhost:3000/api/participants/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Durand",
    "prenom": "Marie",
    "date_naissance": "1990-05-15",
    "ville": "Lyon",
    "email": "marie.durand@example.com",
    "telephone": "0634567890",
    "session_id": 1
  }'
```

### 7. Créer une Évaluation (Public)
```bash
curl -X POST http://localhost:3000/api/evaluations \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": 1,
    "participant_id": 1,
    "formateur_id": 1,
    "note_pedagogie": 5,
    "note_rythme": 4,
    "note_support": 5,
    "note_maitrise": 5,
    "commentaires": "Excellente formation!"
  }'
```

### 8. Voir les Formations (Public)
```bash
curl http://localhost:3000/api/formations
curl http://localhost:3000/api/formations?ville=Paris
curl http://localhost:3000/api/formations?categorie=Développement%20Web
```

## Vérification de l'Installation

✅ Checklist:
- [ ] Base de données créée et tables présentes
- [ ] Fichier `.env` configuré
- [ ] Serveur démarre sans erreur
- [ ] Endpoint racine répond
- [ ] Login fonctionne et retourne un token
- [ ] Création d'une formation réussie

## Dépannage

### Erreur de connexion MySQL
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution**: Vérifier que MySQL est démarré et les credentials dans `.env`

### Erreur "Cannot find module"
```
Error: Cannot find module 'express'
```
**Solution**: Exécuter `npm install`

### Erreur JWT
```
Error: secretOrPrivateKey must have a value
```
**Solution**: Vérifier que `JWT_SECRET` est défini dans `.env`

### Port déjà utilisé
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution**: 
- Changer le port dans `.env`
- Ou tuer le processus: `lsof -ti:3000 | xargs kill -9`

## Prochaines Étapes

1. ✅ Tester tous les endpoints avec Postman
2. 📝 Personnaliser les données de test
3. 🔐 Changer le mot de passe admin par défaut
4. 🎨 Connecter le frontend React
5. 🚀 Déployer en production

## Support

Pour plus de détails:
- 📖 [README.md](./README.md) - Documentation complète
- 📋 [API_EXAMPLES.md](./API_EXAMPLES.md) - Exemples de requêtes
- 📦 [postman_collection.json](./postman_collection.json) - Collection Postman

## Compte Admin Par Défaut

🔑 Credentials de test:
- **Email**: admin@devaito.com
- **Mot de passe**: admin123

⚠️ **À CHANGER EN PRODUCTION!**
