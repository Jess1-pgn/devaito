# APIs Disponibles

## Introduction
Cette section vous présente les APIs disponibles sur Devaito (version SaaS multi-tenant), essentielles pour enrichir les fonctionnalités de vos applications.  
Elles couvrent la gestion des produits, commandes, campagnes marketing, réseaux sociaux, templates, médias et personnalisation.

**URL de base** : `https://admin.devaito.com/api`

---

## Vue d’Ensemble
- Les APIs sont accessibles via l’onglet **"APIs Disponibles"** dans le panneau de navigation.  
- Elles sont conçues pour répondre à divers besoins : e-commerce, gestion de contenu, intégrations sociales et automatisation marketing.  

---

## Liste des APIs

- **Authentication API** : Connexion et gestion des sessions utilisateurs.  
- **User API** : Récupération des informations de l’utilisateur et du store.  
- **Products API** : Gestion et affichage des produits.  
- **Orders API** : Consultation des commandes et historiques d’achats.  
- **Categories API** : Organisation et filtrage des produits par catégorie.  
- **Campaigns API** : Création et gestion des campagnes marketing.  
- **Posts API** : Gestion des posts internes et publications planifiées.  
- **Social Media APIs** : Intégration avec Facebook et Instagram (publication directe ou planifiée).  
- **Templates API** : Gestion des templates graphiques et de contenu.  
- **Platforms API** : Gestion des plateformes sociales/publicitaires connectées.  
- **Resolutions API** : Définition des formats d’images/vidéos selon la plateforme.  
- **Gallery & Media API** : Gestion et stockage d’images/vidéos du store.  
- **Store Settings API** : Personnalisation du branding (langues, couleurs, polices, prompts).  
- **Content Generator API** : Génération de contenu via IA (basée sur OpenAI).  

---

## Comment Utiliser les APIs
1. **Sélection** : Choisissez l’API adaptée à votre besoin (ex. produits, social media, campagnes).  
2. **Intégration** : Implémentez les appels avec `fetch`, `axios` ou toute bibliothèque HTTP.  
3. **Authentification** : Utilisez un Bearer Token pour sécuriser l’accès.  
4. **Test** : Vérifiez vos requêtes avec Postman/Insomnia avant d’intégrer dans votre app.  

---

## Détails
- Chaque API retourne des données en **JSON** avec des statuts HTTP standards (`200`, `201`, `400`, `401`, `404`, `500`).  
- La majorité des APIs nécessitent une authentification (`Authorization: Bearer YOUR_TOKEN`).  
- Certaines APIs supportent la pagination (produits, galeries).  

---

## Conseils
- **Environnement de test** : Toujours valider vos intégrations avant mise en production.  
- **Gestion des erreurs** : Implémentez des gestionnaires pour `401` (non autorisé), `404` (non trouvé), etc.  
- **Performance** : Cachez les données peu changeantes (catégories, templates).  
- **Sécurité** : Ne partagez jamais vos tokens publics.  

---

Pour aller plus loin, consultez :  
- [Guide du Développeur](./developer_guide.md)  
- [Guide d’Utilisation des APIs](./usage.md)  
- [Liste détaillée des APIs](./apis.md)  
