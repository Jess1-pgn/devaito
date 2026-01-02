# Documentation API - Exemples de Requêtes

## 🔐 Authentification

### 1. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@devaito.com",
  "password": "admin123"
}
```

**Réponse:**
```json
{
  "message": "Connexion réussie",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@devaito.com",
    "role": "admin"
  }
}
```

### 2. Register
```http
POST /api/auth/register
Content-Type: application/json
Authorization: Bearer {token}

{
  "email": "formateur@example.com",
  "password": "password123",
  "role": "formateur"
}
```

### 3. Get Profile
```http
GET /api/auth/profile
Authorization: Bearer {token}
```

## 📚 Formations

### 1. Créer une Formation (Admin)
```http
POST /api/formations
Content-Type: application/json
Authorization: Bearer {admin_token}

{
  "titre": "Formation JavaScript Avancé",
  "description": "Maîtrisez JavaScript ES6+",
  "categorie": "Développement Web",
  "nombre_heures": 40,
  "cout": 1500.00,
  "objectifs": "Maîtriser les concepts avancés de JavaScript",
  "programme": "Modules ES6, Async/Await, Promises, etc.",
  "type_public": "mixte",
  "ville": "Paris"
}
```

### 2. Lister toutes les Formations (Public)
```http
GET /api/formations
GET /api/formations?categorie=Développement Web
GET /api/formations?ville=Paris
GET /api/formations?categorie=Marketing&ville=Lyon
```

**Réponse:**
```json
[
  {
    "id": 1,
    "titre": "Formation JavaScript Avancé",
    "description": "Maîtrisez JavaScript ES6+",
    "categorie": "Développement Web",
    "nombre_heures": 40,
    "cout": 1500.00,
    "objectifs": "Maîtriser les concepts avancés de JavaScript",
    "programme": "Modules ES6, Async/Await, Promises, etc.",
    "type_public": "mixte",
    "ville": "Paris",
    "created_at": "2024-01-02T10:00:00.000Z"
  }
]
```

### 3. Détails d'une Formation (Public)
```http
GET /api/formations/1
```

### 4. Modifier une Formation (Admin)
```http
PUT /api/formations/1
Content-Type: application/json
Authorization: Bearer {admin_token}

{
  "titre": "Formation JavaScript ES6+",
  "description": "Maîtrisez JavaScript moderne",
  "categorie": "Développement Web",
  "nombre_heures": 45,
  "cout": 1600.00,
  "objectifs": "Maîtriser JavaScript moderne",
  "programme": "ES6+, TypeScript, React",
  "type_public": "mixte",
  "ville": "Paris"
}
```

### 5. Supprimer une Formation (Admin)
```http
DELETE /api/formations/1
Authorization: Bearer {admin_token}
```

## 👨‍🏫 Formateurs

### 1. Créer un Formateur (Admin)
```http
POST /api/formateurs
Content-Type: application/json
Authorization: Bearer {admin_token}

{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@example.com",
  "telephone": "0612345678",
  "competences": "JavaScript, React, Node.js, Python, Django",
  "remarques": "Excellent formateur, très pédagogue"
}
```

### 2. Lister les Formateurs (Admin/Assistant)
```http
GET /api/formateurs
GET /api/formateurs?statut=interne
GET /api/formateurs?statut=en_attente
Authorization: Bearer {token}
```

### 3. Inscription Formateur Externe (Public)
```http
POST /api/formateurs/externe/register
Content-Type: application/json

{
  "nom": "Martin",
  "prenom": "Sophie",
  "email": "sophie.martin@example.com",
  "telephone": "0623456789",
  "competences": "Marketing digital, SEO, Google Ads, Social Media"
}
```

**Réponse:**
```json
{
  "message": "Candidature enregistrée avec succès. Vous serez contacté prochainement.",
  "formateurId": 5
}
```

### 4. Modifier un Formateur (Admin)
```http
PUT /api/formateurs/5
Content-Type: application/json
Authorization: Bearer {admin_token}

{
  "nom": "Martin",
  "prenom": "Sophie",
  "email": "sophie.martin@example.com",
  "telephone": "0623456789",
  "competences": "Marketing digital, SEO, Google Ads, Social Media, Content Marketing",
  "remarques": "Approuvé - excellent profil",
  "statut": "externe"
}
```

## 🏢 Entreprises

### 1. Créer une Entreprise (Admin/Assistant)
```http
POST /api/entreprises
Content-Type: application/json
Authorization: Bearer {token}

{
  "nom": "TechCorp",
  "adresse": "123 Avenue des Champs-Élysées, 75008 Paris",
  "telephone": "0144556677",
  "email": "contact@techcorp.fr",
  "url": "https://www.techcorp.fr"
}
```

### 2. Lister les Entreprises (Admin/Assistant)
```http
GET /api/entreprises
Authorization: Bearer {token}
```

### 3. Modifier une Entreprise (Admin/Assistant)
```http
PUT /api/entreprises/1
Content-Type: application/json
Authorization: Bearer {token}

{
  "nom": "TechCorp International",
  "adresse": "123 Avenue des Champs-Élysées, 75008 Paris",
  "telephone": "0144556677",
  "email": "contact@techcorp.fr",
  "url": "https://www.techcorp-intl.fr"
}
```

## 📅 Sessions de Formation

### 1. Créer une Session (Admin/Assistant)
```http
POST /api/sessions
Content-Type: application/json
Authorization: Bearer {token}

{
  "formation_id": 1,
  "formateur_id": 2,
  "entreprise_id": 1,
  "date_debut": "2024-03-15",
  "date_fin": "2024-03-22",
  "type_session": "entreprise"
}
```

### 2. Créer une Session pour Individus (Admin/Assistant)
```http
POST /api/sessions
Content-Type: application/json
Authorization: Bearer {token}

{
  "formation_id": 1,
  "date_debut": "2024-04-10",
  "date_fin": "2024-04-17",
  "type_session": "individuel"
}
```

### 3. Lister les Sessions (Public)
```http
GET /api/sessions
GET /api/sessions?formation_id=1
GET /api/sessions?formateur_id=2
GET /api/sessions?statut=planifie
```

**Réponse:**
```json
[
  {
    "id": 1,
    "formation_id": 1,
    "formateur_id": 2,
    "entreprise_id": 1,
    "date_debut": "2024-03-15",
    "date_fin": "2024-03-22",
    "statut": "planifie",
    "type_session": "entreprise",
    "formation_titre": "Formation JavaScript Avancé",
    "formateur_nom": "Dupont",
    "formateur_prenom": "Jean",
    "entreprise_nom": "TechCorp"
  }
]
```

### 4. Assigner un Formateur à une Session (Admin/Assistant)
```http
PATCH /api/sessions/3/assign-formateur
Content-Type: application/json
Authorization: Bearer {token}

{
  "formateur_id": 2
}
```

### 5. Modifier une Session (Admin/Assistant)
```http
PUT /api/sessions/1
Content-Type: application/json
Authorization: Bearer {token}

{
  "formation_id": 1,
  "formateur_id": 2,
  "entreprise_id": 1,
  "date_debut": "2024-03-20",
  "date_fin": "2024-03-27",
  "type_session": "entreprise",
  "statut": "en_cours"
}
```

## 👥 Participants et Inscriptions

### 1. Inscription d'un Participant (Public)
```http
POST /api/participants/register
Content-Type: application/json

{
  "nom": "Durand",
  "prenom": "Marie",
  "date_naissance": "1990-05-15",
  "ville": "Lyon",
  "email": "marie.durand@example.com",
  "telephone": "0634567890",
  "session_id": 3
}
```

**Réponse:**
```json
{
  "message": "Inscription réussie. Vous serez contacté prochainement.",
  "participantId": 10
}
```

### 2. Lister les Participants (Admin/Assistant)
```http
GET /api/participants
Authorization: Bearer {token}
```

### 3. Inscriptions d'une Session (Admin/Assistant)
```http
GET /api/participants/session/3/inscriptions
Authorization: Bearer {token}
```

**Réponse:**
```json
[
  {
    "id": 5,
    "participant_id": 10,
    "session_id": 3,
    "statut": "en_attente",
    "nom": "Durand",
    "prenom": "Marie",
    "email": "marie.durand@example.com",
    "telephone": "0634567890",
    "ville": "Lyon"
  }
]
```

### 4. Mettre à Jour le Statut d'une Inscription (Admin/Assistant)
```http
PATCH /api/participants/inscriptions/5/status
Content-Type: application/json
Authorization: Bearer {token}

{
  "statut": "confirme"
}
```

## ⭐ Évaluations

### 1. Créer une Évaluation (Public)
```http
POST /api/evaluations
Content-Type: application/json

{
  "session_id": 1,
  "participant_id": 10,
  "formateur_id": 2,
  "note_pedagogie": 5,
  "note_rythme": 4,
  "note_support": 5,
  "note_maitrise": 5,
  "commentaires": "Excellente formation, formateur très pédagogue et à l'écoute"
}
```

**Réponse:**
```json
{
  "message": "Évaluation enregistrée avec succès",
  "evaluationId": 15
}
```

### 2. Évaluations d'une Session (Authentifié)
```http
GET /api/evaluations/session/1
Authorization: Bearer {token}
```

**Réponse:**
```json
[
  {
    "id": 15,
    "session_id": 1,
    "participant_id": 10,
    "formateur_id": 2,
    "note_pedagogie": 5,
    "note_rythme": 4,
    "note_support": 5,
    "note_maitrise": 5,
    "commentaires": "Excellente formation",
    "participant_nom": "Durand",
    "participant_prenom": "Marie",
    "formateur_nom": "Dupont",
    "formateur_prenom": "Jean",
    "created_at": "2024-03-25T14:30:00.000Z"
  }
]
```

### 3. Évaluations d'un Formateur (Authentifié)
```http
GET /api/evaluations/formateur/2
Authorization: Bearer {token}
```

### 4. Statistiques d'un Formateur (Authentifié)
```http
GET /api/evaluations/formateur/2/stats
Authorization: Bearer {token}
```

**Réponse:**
```json
{
  "total_evaluations": 25,
  "moy_pedagogie": 4.6,
  "moy_rythme": 4.3,
  "moy_support": 4.5,
  "moy_maitrise": 4.8,
  "moyenne_generale": 4.55
}
```

### 5. Lien d'Évaluation (Public)
```http
GET /api/evaluations/link/1/10
```

**Réponse:**
```json
{
  "session_id": 1,
  "formateur_id": 2,
  "formation_titre": "Formation JavaScript Avancé"
}
```

## 📊 Codes de Statut HTTP

- `200 OK` - Requête réussie
- `201 Created` - Ressource créée avec succès
- `400 Bad Request` - Erreur de validation
- `401 Unauthorized` - Non authentifié
- `403 Forbidden` - Accès refusé (rôle insuffisant)
- `404 Not Found` - Ressource non trouvée
- `500 Internal Server Error` - Erreur serveur

## 🔑 Notes d'Authentification

Pour les endpoints protégés, incluez le token JWT dans l'en-tête:
```
Authorization: Bearer {votre_token_jwt}
```

Le token est obtenu lors du login et expire selon la configuration (par défaut 7 jours).
