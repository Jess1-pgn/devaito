# List of Available APIs and Their Description

## Introduction
This section provides a detailed list of the APIs available on Devaito (SaaS multi-tenant version). Each API covers features for content management, e-commerce, social media, and customization.

**Main server**: `https://admin.devaito.com/api`

---

## 1. **Authentication API**
- **Description**: Manages user authentication and session handling.
- **Endpoints**:
  - `/login` → User login
  - `/logout` → User logout
- **Usage**: Secures access and generates a Bearer token for all authenticated operations.

---

## 2. **User API**
- **Description**: Retrieves user and store information.
- **Endpoint**: `/user`
- **Usage** : Obtenir le profil, avatar, type de site (ecommerce, vitrine, etc.).

---

## 3. **Products API**
- **Description**: Manages products and product details.
- **Endpoints**:
  - `/fetch-all-products` → Get all products
  - `/get-product/{slug}` → Get product details by slug
  - `/popular-products` → Get popular products
- **Utilisation** : Afficher produits, images, prix, promotions.

---

## 4. **Orders API**
- **Description**: Handles order management.
- **Endpoint**: `/get-all-orders`
- **Utilisation** : Suivi des commandes en livraison.

---

## 5. **Categories API**
- **Description**: Manages product categories.
- **Endpoints**:
  - `/categories` (GET, POST, PUT, DELETE)
  - `/categories/{id}`
  - `/fetch-categories`
  - `/fetch-categories-product/{permalink}`
- **Utilisation** : Filtrage et navigation produit.

---

## 6. **Campaigns API**
- **Description**: Manages marketing campaigns.
- **Endpoints**:
  - `/campaigns` (GET, POST)
  - `/campaigns/{id}` (GET, PUT, DELETE)
- **Utilisation** : Créer, planifier et gérer des campagnes.

---

## 7. **Posts API**
- **Description**: Handles posts and job-related actions.
- **Endpoints**:
  - `/posts` (GET, POST)
  - `/posts/{id}` (GET, PUT, DELETE)
  - `/posts/{id}/{job_id}`
- **Utilisation** : Publier et gérer du contenu lié au store.

---

## 8. **Social Media APIs**

### a. Facebook API
- **Endpoints**:
  - `/facebook/pages`
  - `/facebook/publish-post`
  - `/facebook/publish-post-job`
- **Utilisation** : Intégration avec les pages Facebook de l’utilisateur.

### b. Instagram API
- **Endpoints**:
  - `/instagram/publish-post`
  - `/instagram/publish-post-job`
- **Utilisation** : Poster du contenu sur Instagram via pages liées à Facebook.

### c. Platform Connections API
- **Endpoint**: `/platform-connections`
- **Utilisation** : Voir les comptes sociaux connectés.

---

## 9. **Templates API**
- **Description**: Manages templates for apps and sites.
- **Endpoints**:
  - `/templates` (GET, POST)
  - `/templates/{id}` (GET, PUT, DELETE)
- **Utilisation** : Créer et réutiliser des modèles pour publications.

---

## 10. **Platforms API**
- **Description**: Manages platforms and integrations.
- **Endpoints**:
  - `/platforms` (GET, POST)
  - `/platforms/{id}` (GET, PUT, DELETE)
- **Utilisation** : Définir les plateformes sociales ou de publication.

---

## 11. **Resolutions API**
- **Description**: Handles image/video resolutions.
- **Endpoints**:
  - `/resolutions` (GET, POST)
  - `/resolutions/{id}` (GET, PUT, DELETE)
- **Utilisation** : Définir formats d’images/vidéos adaptés aux plateformes.

---

## 12. **Gallery & Media APIs**
- **Description**: Manages media files and galleries.
- **Endpoints**:
  - `/gallery-store`
  - `/image-gallery`
  - `/video-gallery`
  - `/save-image`
  - `/save-video`
- **Utilisation** : Centraliser les médias du store.

---

## 13. **Store Settings APIs**
- **Description**: Manages store configuration and appearance.
- **Endpoints**:
  - `/get-store-prompt`
  - `/get-store-language`
  - `/fonts-and-colors`
- **Utilisation** : Branding et customisation du site.

---

## 14. **Content Generator API**
- **Description**: Generates content using AI.
- **Endpoint**: `/content-generator`
