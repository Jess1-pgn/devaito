# Backend - Système de Gestion de Formation Devaito

Backend API REST développé avec Node.js, Express et MySQL pour la gestion des formations professionnelles.

## 🚀 Technologies

- **Backend Framework**: Node.js avec Express.js
- **Base de données**: MySQL
- **Authentification**: JWT (JSON Web Tokens)
- **Sécurité**: bcryptjs pour le hachage des mots de passe
- **Validation**: express-validator

## 📋 Fonctionnalités

### 1. Authentification
- Interface d'authentification pour 3 rôles: **admin**, **formateur**, **assistant**
- Système de login/register avec JWT
- Middleware d'autorisation basé sur les rôles

### 2. Gestion des Formations
- L'admin peut créer/modifier/supprimer des formations
- Spécification: nombre d'heures, coût, objectifs, programme détaillé
- API publique avec filtres (catégorie, ville, date)

### 3. Gestion des Formateurs
- L'admin ajoute des formateurs avec mots-clés de compétences et remarques
- Formateurs externes peuvent s'inscrire via formulaire public
- Statut: interne, externe, en_attente

### 4. Gestion des Entreprises
- Admin et assistant ajoutent des entreprises
- Informations: nom, adresse, téléphone, URL, email

### 5. Planification des Sessions
- Admin et assistant planifient des formations
- Affectation formateur + entreprise + dates
- Types: formation entreprise ou individuelle

### 6. Inscriptions Individuelles
- Formulaire public d'inscription pour les individus
- Choix de formation depuis la page d'accueil
- Admin/assistant affecte le formateur après inscription

### 7. Page d'Accueil Publique
- Affichage de toutes les formations
- Filtres: catégorie, ville, date
- Accessible sans authentification

### 8. Évaluations
- Participants évaluent les formations
- Notes sur: qualité pédagogique, rythme, support de cours, maîtrise du sujet
- Statistiques par formateur

### 9. Inscription Formateurs Externes
- Formulaire public pour montrer intérêt
- Saisie des mots-clés de compétences
- Statut "en_attente" pour validation admin

## 📁 Structure du Projet

```
backend/
├── config/
│   └── database.js           # Configuration MySQL
├── controllers/
│   ├── authController.js     # Authentification
│   ├── formationController.js # Gestion formations
│   ├── formateurController.js # Gestion formateurs
│   ├── entrepriseController.js # Gestion entreprises
│   ├── sessionController.js   # Planification sessions
│   ├── participantController.js # Inscriptions
│   └── evaluationController.js # Évaluations
├── middleware/
│   ├── auth.js               # Authentification JWT
│   └── validator.js          # Validation des données
├── routes/
│   ├── authRoutes.js
│   ├── formationRoutes.js
│   ├── formateurRoutes.js
│   ├── entrepriseRoutes.js
│   ├── sessionRoutes.js
│   ├── participantRoutes.js
│   └── evaluationRoutes.js
├── database/
│   └── schema.sql            # Schéma de base de données
├── .env.example              # Variables d'environnement exemple
├── .gitignore
├── package.json
└── server.js                 # Point d'entrée
```

## 🔧 Installation

### Prérequis
- Node.js (v14 ou supérieur)
- MySQL (v5.7 ou supérieur)
- npm ou yarn

### Étapes d'installation

1. **Installer les dépendances**
```bash
cd backend
npm install
```

2. **Configurer la base de données**

Créer la base de données MySQL:
```bash
mysql -u root -p < database/schema.sql
```

3. **Configurer les variables d'environnement**

Copier `.env.example` vers `.env`:
```bash
cp .env.example .env
```

Modifier `.env` avec vos paramètres:
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=devaito_training
DB_PORT=3306

JWT_SECRET=votre_secret_jwt_securise
JWT_EXPIRE=7d

CORS_ORIGIN=http://localhost:3001
```

4. **Démarrer le serveur**

Mode développement (avec nodemon):
```bash
npm run dev
```

Mode production:
```bash
npm start
```

Le serveur démarre sur `http://localhost:3000`

## 📚 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription (admin uniquement)
- `GET /api/auth/profile` - Profil utilisateur (authentifié)

### Formations (Public)
- `GET /api/formations` - Liste toutes les formations (public avec filtres)
- `GET /api/formations/:id` - Détails d'une formation (public)

### Formations (Admin)
- `POST /api/formations` - Créer formation (admin)
- `PUT /api/formations/:id` - Modifier formation (admin)
- `DELETE /api/formations/:id` - Supprimer formation (admin)

### Formateurs
- `POST /api/formateurs` - Créer formateur (admin)
- `GET /api/formateurs` - Liste formateurs (admin/assistant)
- `GET /api/formateurs/:id` - Détails formateur (admin/assistant)
- `PUT /api/formateurs/:id` - Modifier formateur (admin)
- `DELETE /api/formateurs/:id` - Supprimer formateur (admin)
- `POST /api/formateurs/externe/register` - Inscription formateur externe (public)

### Entreprises
- `POST /api/entreprises` - Créer entreprise (admin/assistant)
- `GET /api/entreprises` - Liste entreprises (admin/assistant)
- `GET /api/entreprises/:id` - Détails entreprise (admin/assistant)
- `PUT /api/entreprises/:id` - Modifier entreprise (admin/assistant)
- `DELETE /api/entreprises/:id` - Supprimer entreprise (admin/assistant)

### Sessions de Formation
- `POST /api/sessions` - Créer session (admin/assistant)
- `GET /api/sessions` - Liste sessions (public avec filtres)
- `GET /api/sessions/:id` - Détails session (public)
- `PUT /api/sessions/:id` - Modifier session (admin/assistant)
- `DELETE /api/sessions/:id` - Supprimer session (admin/assistant)
- `PATCH /api/sessions/:id/assign-formateur` - Affecter formateur (admin/assistant)

### Participants
- `POST /api/participants/register` - Inscription participant (public)
- `GET /api/participants` - Liste participants (admin/assistant)
- `GET /api/participants/:id` - Détails participant (admin/assistant)
- `GET /api/participants/session/:session_id/inscriptions` - Inscriptions d'une session (admin/assistant)
- `PATCH /api/participants/inscriptions/:id/status` - Mettre à jour statut inscription (admin/assistant)

### Évaluations
- `POST /api/evaluations` - Créer évaluation (public)
- `GET /api/evaluations/session/:session_id` - Évaluations d'une session (authentifié)
- `GET /api/evaluations/formateur/:formateur_id` - Évaluations d'un formateur (authentifié)
- `GET /api/evaluations/formateur/:formateur_id/stats` - Statistiques formateur (authentifié)
- `GET /api/evaluations/link/:session_id/:participant_id` - Lien évaluation (public)

## 🔐 Sécurité

- **JWT**: Authentification par tokens
- **bcryptjs**: Hachage des mots de passe (salt rounds: 10)
- **express-validator**: Validation des entrées
- **CORS**: Configuration des origines autorisées
- **Middleware d'autorisation**: Contrôle d'accès basé sur les rôles

## 🗄️ Schéma de Base de Données

### Tables principales:
1. **users** - Utilisateurs (admin, formateur, assistant)
2. **formateurs** - Formateurs avec compétences
3. **formations** - Formations disponibles
4. **entreprises** - Entreprises clientes
5. **sessions_formation** - Sessions planifiées
6. **participants** - Participants individuels
7. **inscriptions** - Inscriptions participants/sessions
8. **evaluations** - Évaluations des formations

### Relations:
- Une session appartient à une formation
- Une session peut avoir un formateur et/ou une entreprise
- Les participants s'inscrivent à des sessions
- Les évaluations lient participants, sessions et formateurs

## 👤 Utilisateur par Défaut

Un compte admin par défaut est créé:
- **Email**: admin@devaito.com
- **Mot de passe**: admin123

⚠️ **Important**: Changez ce mot de passe en production!

## 🧪 Tests

Pour tester l'API, vous pouvez utiliser:
- Postman
- cURL
- Thunder Client (VS Code)
- Insomnia

Collection Postman disponible sur demande.

## 📝 Notes de Développement

### Architecture en Couches
- **Routes**: Définition des endpoints
- **Controllers**: Logique métier
- **Middleware**: Authentification, validation
- **Config**: Configuration DB et environnement

### Bonnes Pratiques
- Code modulaire et réutilisable
- Gestion d'erreurs centralisée
- Validation des données côté serveur
- Transactions pour opérations critiques
- Index sur colonnes fréquemment recherchées

## 🤝 Contribution

Ce projet fait partie du système Devaito de gestion de formations.

## 📄 Licence

MIT
