# Devaito - Système de Gestion de Formation

Plateforme complète de gestion de formations professionnelles avec backend Node.js/Express et MySQL.

## 🎯 Contenu du Repository

Ce repository contient:
- **Documentation Devaito** (`/docs` et `/site`) - Documentation de la plateforme Devaito
- **Backend Training Management** (`/backend`) - ⭐ **NOUVEAU** - API complète de gestion de formation

## 🚀 Backend - Système de Gestion de Formation

Le backend implémente un système complet de gestion de formations professionnelles.

### Accès Rapide

📁 **Dossier**: `/backend`

📖 **Documentation Principale**: [backend/README.md](backend/README.md)

🚀 **Guide de Démarrage**: [backend/QUICKSTART.md](backend/QUICKSTART.md)

### Fonctionnalités Principales

✅ **10 fonctionnalités complètes implémentées:**

1. **Authentification multi-rôles** (admin, formateur, assistant)
2. **Gestion des formations** avec détails complets
3. **Gestion des formateurs** avec compétences
4. **Gestion des entreprises** clientes
5. **Planification de sessions** de formation
6. **Inscription de participants** individuels
7. **Page d'accueil publique** avec filtres
8. **Système d'évaluation** des formations
9. **Inscription formateurs externes**
10. **Sécurité et qualité** de code production

### Technologies

- **Backend**: Node.js + Express.js
- **Base de données**: MySQL 8.0
- **Authentification**: JWT
- **Sécurité**: bcryptjs, express-validator

### Démarrage Rapide

```bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
# Éditer .env avec vos paramètres

# Importer le schéma de base de données
mysql -u root -p < database/schema.sql

# Démarrer le serveur
npm start
```

Le serveur démarre sur `http://localhost:3000`

### Documentation Complète

| Document | Description |
|----------|-------------|
| [README.md](backend/README.md) | Documentation complète du projet |
| [QUICKSTART.md](backend/QUICKSTART.md) | Guide de démarrage rapide |
| [API_EXAMPLES.md](backend/API_EXAMPLES.md) | Exemples de requêtes API |
| [DEPLOYMENT.md](backend/DEPLOYMENT.md) | Guide de déploiement production |
| [OVERVIEW.md](backend/OVERVIEW.md) | Vue d'ensemble de l'architecture |
| [IMPLEMENTATION_SUMMARY.md](backend/IMPLEMENTATION_SUMMARY.md) | Résumé de l'implémentation |

### API Endpoints

**45 endpoints** répartis en:
- 7 endpoints publics (formations, inscriptions, évaluations)
- 38 endpoints authentifiés (gestion complète)

**Exemple d'utilisation:**
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@devaito.com","password":"admin123"}'

# Voir les formations (public)
curl http://localhost:3000/api/formations
```

Voir [API_EXAMPLES.md](backend/API_EXAMPLES.md) pour tous les exemples.

### Test avec Postman

Import the collection: [postman_collection.json](backend/postman_collection.json)

### Sécurité

✅ JWT avec validation  
✅ Hachage bcrypt  
✅ Validation des entrées  
✅ Protection injection SQL  
✅ CORS sécurisé  
✅ Messages d'erreur sanitisés  

### Base de Données

**8 tables** avec relations:
- users (utilisateurs système)
- formateurs (formateurs internes/externes)
- formations (catalogue formations)
- entreprises (clients entreprises)
- sessions_formation (sessions planifiées)
- participants (participants individuels)
- inscriptions (liens participants/sessions)
- evaluations (évaluations formations)

Schema complet: [database/schema.sql](backend/database/schema.sql)

### Credentials Par Défaut

⚠️ **À changer en production!**

```
Email: admin@devaito.com
Mot de passe: admin123
```

### Structure du Backend

```
backend/
├── config/           # Configuration MySQL
├── controllers/      # 7 contrôleurs de logique métier
├── middleware/       # Authentification et validation
├── routes/          # 7 fichiers de routes API
├── utils/           # Utilitaires (transactions)
├── database/        # Schéma SQL
├── server.js        # Point d'entrée
└── Documentation/   # 6 fichiers de documentation
```

### Production Ready

✅ Guide de déploiement complet  
✅ Configuration PM2  
✅ Configuration Nginx  
✅ SSL/TLS setup  
✅ Monitoring  
✅ Backups  
✅ Checklists de sécurité  

## 📄 Licence

MIT License

## 🤝 Contribution

Pour contribuer au backend:
1. Voir la documentation dans `/backend`
2. Suivre les conventions de code existantes
3. Tester avant de soumettre

## 📞 Support

- Documentation backend: [backend/README.md](backend/README.md)
- Guide de démarrage: [backend/QUICKSTART.md](backend/QUICKSTART.md)
- Exemples API: [backend/API_EXAMPLES.md](backend/API_EXAMPLES.md)

---

**Backend développé avec Node.js + Express + MySQL** 🚀
