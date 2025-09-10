# Liste des APIs Accessibles et leur Description  

## Introduction  
Cette section fournit une liste détaillée des APIs disponibles sur Devaito (version SaaS multi-tenant). Chaque API couvre des fonctionnalités de gestion de contenus, e-commerce, social media et personnalisation.  

**Serveur principal** : `https://admin.devaito.com/api`  

---

## 1. **Authentication API**  
- **Description** : Gère l’authentification et la gestion de session des utilisateurs.  
- **Endpoints** :  
  - `/login` → Connexion utilisateur  
  - `/logout` → Déconnexion  
- **Utilisation** : Sécurise l’accès et génère un token Bearer pour toutes les opérations authentifiées.  

---

## 2. **User API**  
- **Description** : Récupère les informations de l’utilisateur et de son store.  
- **Endpoint** : `/user`  
- **Utilisation** : Obtenir le profil, avatar, type de site (ecommerce, vitrine, etc.).  

---

## 3. **Products API**  
- **Description** : Gestion et récupération du catalogue produits.  
- **Endpoints** :  
  - `/fetch-all-products` → Liste paginée des produits  
  - `/get-product/{slug}` → Détails d’un produit via slug  
  - `/popular-products` → Produits les plus commandés  
- **Utilisation** : Afficher produits, images, prix, promotions.  

---

## 4. **Orders API**  
- **Description** : Récupération des commandes.  
- **Endpoint** : `/get-all-orders`  
- **Utilisation** : Suivi des commandes en livraison.  

---

## 5. **Categories API**  
- **Description** : Organisation et gestion des catégories de produits.  
- **Endpoints** :  
  - `/categories` (CRUD : GET, POST, PUT, DELETE)  
  - `/categories/{id}` → Détails, mise à jour, suppression  
  - `/fetch-categories` → Liste des catégories avec images & slug  
  - `/fetch-categories-product/{permalink}` → Produits par catégorie  
- **Utilisation** : Filtrage et navigation produit.  

---

## 6. **Campaigns API**  
- **Description** : Gestion des campagnes marketing.  
- **Endpoints** :  
  - `/campaigns` (GET, POST)  
  - `/campaigns/{id}` (GET, PUT, DELETE)  
- **Utilisation** : Créer, planifier et gérer des campagnes.  

---

## 7. **Posts API**  
- **Description** : Gestion des posts internes.  
- **Endpoints** :  
  - `/posts` (GET, POST) → Liste ou création de posts  
  - `/posts/{id}` (GET, PUT, DELETE) → Détails ou modification  
  - `/posts/{id}/{job_id}` → Mise à jour du job lié à un post  
- **Utilisation** : Publier et gérer du contenu lié au store.  

---

## 8. **Social Media APIs**  

### a. **Facebook API**  
- **Endpoints** :  
  - `/facebook/pages` → Récupérer pages connectées  
  - `/facebook/publish-post` → Publier immédiatement un post  
  - `/facebook/publish-post-job` → Planifier un post (job)  
- **Utilisation** : Intégration avec les pages Facebook de l’utilisateur.  

### b. **Instagram API**  
- **Endpoints** :  
  - `/instagram/publish-post` → Publier immédiatement un post  
  - `/instagram/publish-post-job` → Planifier un post (job)  
- **Utilisation** : Poster du contenu sur Instagram via pages liées à Facebook.  

### c. **Platform Connections API**  
- **Endpoint** : `/platform-connections`  
- **Utilisation** : Voir les comptes sociaux connectés.  

---

## 9. **Templates API**  
- **Description** : CRUD des templates de design.  
- **Endpoints** :  
  - `/templates` (GET, POST)  
  - `/templates/{id}` (GET, PUT, DELETE)  
- **Utilisation** : Créer et réutiliser des modèles pour publications.  

---

## 10. **Platforms API**  
- **Description** : Gestion des plateformes disponibles.  
- **Endpoints** :  
  - `/platforms` (GET, POST)  
  - `/platforms/{id}` (GET, PUT, DELETE)  
- **Utilisation** : Définir les plateformes sociales ou de publication.  

---

## 11. **Resolutions API**  
- **Description** : Gestion des tailles & résolutions liées aux plateformes.  
- **Endpoints** :  
  - `/resolutions` (GET, POST)  
  - `/resolutions/{id}` (GET, PUT, DELETE)  
- **Utilisation** : Définir formats d’images/vidéos adaptés aux plateformes.  

---

## 12. **Gallery & Media APIs**  
- **Description** : Gestion des images et vidéos du store.  
- **Endpoints** :  
  - `/gallery-store` → Tous les médias liés au store  
  - `/image-gallery` → Galerie d’images (paginée)  
  - `/video-gallery` → Galerie vidéos (paginée)  
  - `/save-image` → Upload image  
  - `/save-video` → Upload vidéo  
- **Utilisation** : Centraliser les médias du store.  

---

## 13. **Store Settings APIs**  
- **Description** : Personnalisation du store.  
- **Endpoints** :  
  - `/get-store-prompt` → Récupérer le prompt (description du store)  
  - `/get-store-language` → Langue du store  
  - `/fonts-and-colors` → Polices & couleurs configurées  
- **Utilisation** : Branding et customisation du site.  

---

## 14. **Content Generator API**  
- **Description** : Génération de contenu via IA (ChatGPT).  
- **Endpoint** : `/content-generator`  
- **Utilisation** : Générer titres, descriptions, textes marketing.  

---

## Formats de Réponse  
- **Format** : JSON  
- **Codes statut** : `200`, `201`, `400`, `401`, `404`, `500`  
- **Auth requise** : Bearer Token (`Authorization: Bearer xxx`) pour la majorité des endpoints.  
