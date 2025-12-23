# Centre de Formation - Application de Gestion

Application web complète pour la gestion d'un centre de formation professionnelle.

## 🎯 Objectifs

- Gérer les documents des projets de formation
- Planifier les formations et affecter les formateurs
- Gérer les coûts de formation

## ✨ Fonctionnalités

### 1. Authentification et Gestion des Rôles
- Interface d'authentification pour 3 rôles : **Admin**, **Formateur**, **Assistant**
- Système de permissions basé sur les rôles

### 2. Gestion des Formations (Admin)
- Ajout de formations publiques avec :
  - Nombre d'heures
  - Coût
  - Objectifs
  - Programme détaillé
  - Catégorie

### 3. Gestion des Formateurs (Admin)
- Ajout de formateurs avec :
  - Mots-clés de compétences
  - Champ remarques
  - Évaluations

### 4. Gestion des Entreprises (Admin/Assistant)
- Ajout d'entreprises avec :
  - Nom, adresse, téléphone
  - URL et email

### 5. Planification des Sessions (Admin/Assistant)
- Création de sessions de formation
- Affectation formateur + entreprise
- Calendrier avec dates multiples
- Support formations entreprise et individuelles

### 6. Inscription Participants (Public)
- Formulaire d'inscription public
- Informations : nom, prénom, date de naissance, ville, email, téléphone
- Choix de formation depuis la page d'accueil

### 7. Page d'Accueil Publique
- Affichage de toutes les formations
- Filtres :
  - Catégorie
  - Ville
  - Date

### 8. Évaluation des Formations
- Formulaire d'évaluation envoyé aux participants
- Notes sur :
  - Qualité pédagogique
  - Rythme
  - Support de cours et TP
  - Maîtrise du sujet

### 9. Inscription Formateurs Externes (Public)
- Formulaire pour formateurs externes
- Saisie des mots-clés de compétences
- Statut "en attente" pour validation

### 10. Qualité et Sécurité
- Code modulaire en couches
- Sécurité JWT
- Validation des données
- Gestion des erreurs

## 🛠️ Technologies

### Backend
- **Node.js** avec **Express**
- **MongoDB** avec **Mongoose**
- **JWT** pour l'authentification
- **Bcrypt** pour le hachage des mots de passe
- **Nodemailer** pour les emails

### Frontend
- **React** avec **Vite**
- **React Router** pour la navigation
- **Axios** pour les requêtes API
- **React Hook Form** pour les formulaires

## 📦 Installation

### Prérequis
- Node.js (v18 ou supérieur)
- MongoDB (local ou Atlas)
- npm ou yarn

### Configuration du Backend

1. Naviguer vers le dossier backend :
```bash
cd backend
```

2. Installer les dépendances :
```bash
npm install
```

3. Créer un fichier `.env` basé sur `.env.example` :
```bash
cp .env.example .env
```

4. Modifier les variables d'environnement dans `.env` :
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/training_center
JWT_SECRET=votre_secret_jwt_securise
JWT_EXPIRE=7d
NODE_ENV=development
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe
CLIENT_URL=http://localhost:3000
```

5. Démarrer le serveur :
```bash
npm run dev
```

Le serveur backend sera accessible sur `http://localhost:5000`

### Configuration du Frontend

1. Naviguer vers le dossier frontend :
```bash
cd frontend
```

2. Installer les dépendances :
```bash
npm install
```

3. Créer un fichier `.env` basé sur `.env.example` :
```bash
cp .env.example .env
```

4. Modifier les variables d'environnement dans `.env` :
```env
VITE_API_URL=http://localhost:5000/api
```

5. Démarrer l'application :
```bash
npm run dev
```

L'application frontend sera accessible sur `http://localhost:5173`

## 📁 Structure du Projet

```
devaito/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Formation.js
│   │   │   ├── Formateur.js
│   │   │   ├── Entreprise.js
│   │   │   ├── SessionFormation.js
│   │   │   └── Participant.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── formationController.js
│   │   │   ├── formateurController.js
│   │   │   ├── entrepriseController.js
│   │   │   ├── sessionController.js
│   │   │   └── participantController.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── formations.js
│   │   │   ├── formateurs.js
│   │   │   ├── entreprises.js
│   │   │   ├── sessions.js
│   │   │   └── participants.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   └── server.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── index.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
└── README.md
```

## 🔑 API Endpoints

### Authentification
- `POST /api/auth/register` - Créer un compte utilisateur
- `POST /api/auth/login` - Se connecter
- `GET /api/auth/me` - Obtenir l'utilisateur actuel

### Formations
- `GET /api/formations/public` - Liste publique des formations
- `GET /api/formations` - Liste des formations (authentifié)
- `POST /api/formations` - Créer une formation (admin)
- `GET /api/formations/:id` - Détails d'une formation
- `PUT /api/formations/:id` - Modifier une formation (admin)
- `DELETE /api/formations/:id` - Supprimer une formation (admin)

### Formateurs
- `POST /api/formateurs/register-externe` - Inscription formateur externe
- `GET /api/formateurs` - Liste des formateurs
- `POST /api/formateurs` - Ajouter un formateur (admin)
- `GET /api/formateurs/:id` - Détails d'un formateur
- `PUT /api/formateurs/:id` - Modifier un formateur (admin)
- `DELETE /api/formateurs/:id` - Supprimer un formateur (admin)
- `POST /api/formateurs/:id/evaluation` - Ajouter une évaluation

### Entreprises
- `GET /api/entreprises` - Liste des entreprises
- `POST /api/entreprises` - Ajouter une entreprise (admin/assistant)
- `GET /api/entreprises/:id` - Détails d'une entreprise
- `PUT /api/entreprises/:id` - Modifier une entreprise (admin/assistant)
- `DELETE /api/entreprises/:id` - Supprimer une entreprise (admin/assistant)

### Sessions
- `GET /api/sessions` - Liste des sessions
- `POST /api/sessions` - Créer une session (admin/assistant)
- `GET /api/sessions/:id` - Détails d'une session
- `PUT /api/sessions/:id` - Modifier une session (admin/assistant)
- `DELETE /api/sessions/:id` - Supprimer une session (admin/assistant)
- `POST /api/sessions/:id/participants` - Ajouter un participant

### Participants
- `POST /api/participants/register` - Inscription participant (public)
- `GET /api/participants` - Liste des participants (admin/assistant)
- `GET /api/participants/:id` - Détails d'un participant
- `PUT /api/participants/:id` - Modifier un participant (admin/assistant)
- `DELETE /api/participants/:id` - Supprimer un participant (admin/assistant)
- `POST /api/participants/:id/send-evaluation` - Envoyer email d'évaluation

## 🔐 Sécurité

- Authentification JWT avec tokens sécurisés
- Hachage des mots de passe avec bcrypt
- Validation des données côté serveur
- Protection des routes par rôle
- CORS configuré
- Variables d'environnement pour les secrets

## 🎨 Interface Utilisateur

L'application utilise un design simple et professionnel avec :
- Navigation intuitive
- Responsive design
- Filtres dynamiques
- Formulaires validés
- Messages d'erreur clairs

## 📝 Utilisation

### Premier démarrage

1. Créer un compte admin :
```bash
# Via l'API directement ou interface
POST /api/auth/register
{
  "email": "admin@example.com",
  "password": "password123",
  "role": "admin",
  "nom": "Admin",
  "prenom": "Système"
}
```

2. Se connecter avec ce compte
3. Ajouter des formations
4. Ajouter des formateurs
5. Ajouter des entreprises
6. Planifier des sessions

## 🚀 Déploiement

### Backend
- Heroku, Railway, ou serveur VPS
- Configurer MongoDB Atlas pour la production
- Définir les variables d'environnement

### Frontend
- Vercel, Netlify, ou serveur web
- Configurer l'URL de l'API en production

## 👥 Contributeurs

Projet réalisé par : [Votre binôme]

## 📅 Dates importantes

- Partage GitHub : 20/12/2025
- Présentation : 06/01/2026

## 📄 Licence

Ce projet est un projet académique pour le cours de développement web.
