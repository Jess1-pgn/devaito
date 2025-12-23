# Guide de Démarrage - Centre de Formation

## Installation Complète

### 1. Prérequis

Assurez-vous d'avoir installé :
- **Node.js** (version 18 ou supérieure) - [Télécharger](https://nodejs.org/)
- **MongoDB** - Choisir une option :
  - MongoDB local - [Télécharger](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (cloud gratuit) - [S'inscrire](https://www.mongodb.com/cloud/atlas/register)
- **Git** - [Télécharger](https://git-scm.com/downloads)

### 2. Cloner le Projet

```bash
git clone <url-du-repository>
cd devaito
```

### 3. Configuration Backend

#### 3.1 Installation des dépendances

```bash
cd backend
npm install
```

#### 3.2 Configuration de l'environnement

Créer un fichier `.env` à partir de `.env.example` :

```bash
cp .env.example .env
```

Modifier le fichier `.env` avec vos paramètres :

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/training_center
JWT_SECRET=votre_secret_jwt_tres_securise_ici
JWT_EXPIRE=7d
NODE_ENV=development
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app
CLIENT_URL=http://localhost:5173
```

**Notes importantes :**
- Pour `JWT_SECRET`, générez une chaîne aléatoire sécurisée
- Pour Gmail, utilisez un "App Password" et non votre mot de passe habituel
- Si vous utilisez MongoDB Atlas, remplacez `MONGODB_URI` par votre connection string

#### 3.3 Démarrer MongoDB (si local)

**Windows :**
```bash
mongod
```

**macOS/Linux :**
```bash
sudo mongod
```

Ou utilisez MongoDB Compass pour démarrer visuellement.

#### 3.4 Créer l'utilisateur admin par défaut

```bash
npm run create-admin
```

Cela créera un compte admin avec :
- Email : `admin@formation.com`
- Mot de passe : `Admin123!`

**⚠️ Important : Changez ce mot de passe après votre première connexion !**

#### 3.5 Démarrer le serveur backend

```bash
npm run dev
```

Le serveur démarrera sur `http://localhost:5000`

Vous devriez voir :
```
MongoDB connected successfully
Server running in development mode on port 5000
```

### 4. Configuration Frontend

#### 4.1 Dans un nouveau terminal, naviguer vers le dossier frontend

```bash
cd frontend
```

#### 4.2 Installation des dépendances

```bash
npm install
```

#### 4.3 Configuration de l'environnement

Créer un fichier `.env` :

```bash
cp .env.example .env
```

Le contenu devrait être :

```env
VITE_API_URL=http://localhost:5000/api
```

#### 4.4 Démarrer l'application frontend

```bash
npm run dev
```

L'application démarrera sur `http://localhost:5173`

Vous devriez voir :
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

### 5. Premier Test

1. Ouvrez votre navigateur à `http://localhost:5173`
2. Cliquez sur "Connexion"
3. Utilisez les identifiants admin :
   - Email : `admin@formation.com`
   - Mot de passe : `Admin123!`
4. Vous devriez être redirigé vers le tableau de bord

## Utilisation

### Rôles et Permissions

#### Admin
- Toutes les permissions
- Créer/modifier/supprimer des formations
- Gérer les formateurs
- Gérer les entreprises
- Planifier des sessions
- Gérer les participants

#### Assistant
- Gérer les entreprises
- Planifier des sessions
- Gérer les participants
- Voir les formations et formateurs

#### Formateur
- Voir ses sessions
- Consulter ses évaluations

### Fonctionnalités Publiques (sans connexion)

1. **Page d'accueil** : Voir toutes les formations disponibles
2. **Inscription participant** : S'inscrire à une formation
3. **Inscription formateur** : Candidater comme formateur externe

### Workflow Typique

#### Pour l'Admin

1. **Créer des formations**
   - Aller dans "Formations" → "+ Nouvelle Formation"
   - Remplir tous les champs (titre, catégorie, heures, coût, objectifs, programme)
   - Cocher "Visible publiquement" pour que les participants puissent s'inscrire

2. **Ajouter des formateurs**
   - Aller dans "Formateurs" → "+ Nouveau Formateur"
   - Renseigner les informations et les compétences (mots-clés)

3. **Ajouter des entreprises**
   - Aller dans "Entreprises" → "+ Nouvelle Entreprise"
   - Renseigner les coordonnées complètes

4. **Planifier une session**
   - Aller dans "Sessions" → "+ Nouvelle Session"
   - Sélectionner formation, formateur, type (entreprise/individuel)
   - Si entreprise, sélectionner l'entreprise
   - Ajouter les dates avec horaires
   - Indiquer la ville

5. **Gérer les participants**
   - Aller dans "Participants"
   - Voir les inscriptions
   - Affecter les participants à des sessions
   - Envoyer les formulaires d'évaluation après les formations

#### Pour les Participants (Public)

1. Aller sur la page d'accueil
2. Parcourir les formations disponibles
3. Utiliser les filtres (catégorie, ville) si nécessaire
4. Cliquer sur "S'inscrire" sur une formation
5. Remplir le formulaire d'inscription
6. Attendre la confirmation par email

#### Pour les Formateurs Externes (Public)

1. Cliquer sur "Devenir formateur" dans le menu
2. Remplir le formulaire avec compétences et expérience
3. Soumettre la candidature
4. Attendre le contact de l'administration

## Dépannage

### Le backend ne démarre pas

**Problème : "MongoDB connection error"**
- Vérifiez que MongoDB est démarré
- Vérifiez votre `MONGODB_URI` dans le `.env`
- Si vous utilisez Atlas, vérifiez que votre IP est autorisée

**Problème : "Port 5000 already in use"**
- Un autre processus utilise le port 5000
- Changez le port dans `.env` : `PORT=5001`
- Ou arrêtez l'autre processus

### Le frontend ne se connecte pas au backend

**Problème : "Network Error" ou "CORS error"**
- Vérifiez que le backend est bien démarré
- Vérifiez `VITE_API_URL` dans le `.env` du frontend
- Le backend doit être accessible avant de démarrer le frontend

### Impossible de se connecter

**Problème : "Email ou mot de passe incorrect"**
- Vérifiez que vous avez bien exécuté `npm run create-admin`
- Vérifiez vos identifiants : `admin@formation.com` / `Admin123!`
- La base de données doit être accessible

### Les emails ne sont pas envoyés

**Problème : Email configuration**
- Pour Gmail, créez un "App Password" dans les paramètres de sécurité Google
- Activez l'authentification à deux facteurs sur votre compte Google
- Utilisez ce App Password dans `EMAIL_PASS` et non votre mot de passe normal

## Structure des Données

### Modèles Principaux

#### User (Utilisateur)
```javascript
{
  email: String,
  password: String (hashé),
  role: 'admin' | 'formateur' | 'assistant',
  nom: String,
  prenom: String,
  telephone: String
}
```

#### Formation
```javascript
{
  titre: String,
  categorie: String,
  nombreHeures: Number,
  cout: Number,
  objectifs: String,
  programme: String,
  description: String,
  isPublique: Boolean
}
```

#### Formateur
```javascript
{
  nom: String,
  prenom: String,
  email: String,
  telephone: String,
  motsCles: [String],
  remarques: String,
  statut: 'interne' | 'externe' | 'en_attente',
  evaluations: [{
    qualitePedagogique: Number (1-5),
    rythme: Number (1-5),
    supportCours: Number (1-5),
    maitriseSujet: Number (1-5),
    commentaire: String
  }]
}
```

#### SessionFormation
```javascript
{
  formation: ObjectId,
  formateur: ObjectId,
  type: 'entreprise' | 'individuel',
  entreprise: ObjectId (si type entreprise),
  dates: [{
    date: Date,
    heureDebut: String,
    heureFin: String
  }],
  ville: String,
  statut: 'planifiee' | 'en_cours' | 'terminee' | 'annulee',
  participants: [ObjectId]
}
```

## Prochaines Étapes

Pour compléter le projet, vous devrez implémenter :

1. ✅ Page de gestion des entreprises (CRUD)
2. ✅ Page de gestion des sessions avec calendrier
3. ✅ Page de gestion des participants
4. ✅ Formulaire d'évaluation complet
5. ✅ Amélioration du design (CSS moderne ou framework UI)
6. ✅ Tests unitaires et d'intégration
7. ✅ Déploiement (Heroku/Railway pour backend, Vercel/Netlify pour frontend)

## Support

Pour toute question ou problème :
1. Consultez d'abord ce guide
2. Vérifiez les logs du terminal (backend et frontend)
3. Consultez la documentation MongoDB, Express, React
4. Contactez votre professeur ou votre binôme

Bon développement ! 🚀
