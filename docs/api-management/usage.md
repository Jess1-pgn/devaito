# Comment Connecter/Utiliser les APIs Devaito

## Introduction
Ce guide vous explique étape par étape comment intégrer et utiliser les APIs Devaito (version SaaS multi-tenant). Vous trouverez des exemples de code, les bonnes pratiques et les étapes essentielles pour chaque API.

**URL de base** : `https://admin.devaito.com/api`

---

## Configuration Initiale

### 1. **Prérequis**
- Accès au serveur Devaito
- Environnement de développement configuré
- Bibliothèque HTTP (ex: fetch, axios, curl)
- Gestion des tokens pour l'authentification

### 2. **Headers Standards**
```javascript
// Pour les requêtes authentifiées
const headers = {
  'Authorization': 'Bearer YOUR_TOKEN_HERE',
  'Content-Type': 'application/json'
}
```

---

## Guide par API

### 1. **Authentication API - Première Étape**

#### **Connexion d'un Utilisateur**
```javascript
// POST /login
const login = async (email, password) => {
  const response = await fetch('https://admin.devaito.com/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const result = await response.json();
  if (response.ok) {
    localStorage.setItem('authToken', result.token);
  }
  return result;
}
```

#### **Déconnexion**
```javascript
// POST /logout
const logout = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/logout', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

---

### 2. **User API**
```javascript
// GET /user
const getUser = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/user', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

---

### 3. **Products API**

#### **Récupérer tous les produits**
```javascript
// GET /fetch-all-products
const getProducts = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/fetch-all-products', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

#### **Récupérer un produit par slug**
```javascript
// GET /get-product/{slug}
const getProduct = async (slug) => {
  const response = await fetch(`https://admin.devaito.com/api/get-product/${slug}`);
  if (response.status === 404) {
    throw new Error('Produit non trouvé');
  }
  return await response.json();
}
```

---

### 4. **Orders API**
```javascript
// GET /get-all-orders
const getOrders = async () => {
  const response = await fetch('https://admin.devaito.com/api/get-all-orders');
  return await response.json();
}
```

---

### 5. **Categories API**
```javascript
// GET /fetch-categories
const getCategories = async () => {
  const response = await fetch('https://admin.devaito.com/api/fetch-categories');
  return await response.json();
}

// GET /fetch-categories-product/{permalink}
const getProductsByCategory = async (permalink) => {
  const response = await fetch(`https://admin.devaito.com/api/fetch-categories-product/${permalink}`);
  return await response.json();
}
```

---

### 6. **Campaigns API**
```javascript
// POST /campaigns
const createCampaign = async (data) => {
  const response = await fetch('https://admin.devaito.com/api/campaigns', {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  return await response.json();
}
```

---

### 7. **Posts API**
```javascript
// POST /posts
const createPost = async (data) => {
  const response = await fetch('https://admin.devaito.com/api/posts', {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  return await response.json();
}
```

---

### 8. **Social Media APIs**

#### **Facebook - Publier un post**
```javascript
// POST /facebook/publish-post
const publishFacebookPost = async (pageIds, caption, imageUrl) => {
  const response = await fetch('https://admin.devaito.com/api/facebook/publish-post', {
    method: 'POST',
    headers,
    body: JSON.stringify({ page_id: pageIds, caption, imageUrl })
  });
  return await response.json();
}
```

#### **Instagram - Publier un post**
```javascript
// POST /instagram/publish-post
const publishInstagramPost = async (caption, imageUrl) => {
  const response = await fetch('https://admin.devaito.com/api/instagram/publish-post', {
    method: 'POST',
    headers,
    body: JSON.stringify({ caption, imageUrl })
  });
  return await response.json();
}
```

---

### 9. **Templates API**
```javascript
// GET /templates
const getTemplates = async () => {
  const response = await fetch('https://admin.devaito.com/api/templates');
  return await response.json();
}
```

---

### 10. **Gallery & Media API**

#### **Upload une image**
```javascript
// POST /save-image
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch('https://admin.devaito.com/api/save-image', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
    body: formData
  });
  return await response.json();
}
```

#### **Lister la galerie d’images**
```javascript
// GET /image-gallery
const getImageGallery = async (page = 1) => {
  const response = await fetch(`https://admin.devaito.com/api/image-gallery?page=${page}`);
  return await response.json();
}
```

---

### 11. **Store Settings API**
```javascript
// GET /fonts-and-colors
const getFontsAndColors = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/fonts-and-colors', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

---

### 12. **Content Generator API**
```javascript
// POST /content-generator
const generateContent = async (message) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/content-generator', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });
  return await response.json();
}
```

---

## Bonnes Pratiques
- Toujours utiliser HTTPS en production
- Stocker les tokens de manière sécurisée
- Implémenter un refresh automatique des tokens
- Mettre en cache les données statiques (catégories, templates…)
- Gérer les erreurs (401 → reconnecter l’utilisateur, 404 → message clair)

---

## Débogage
- Utilisez Postman/Insomnia pour tester les endpoints
- Activez les DevTools réseau du navigateur
- Logger toutes les requêtes/réponses côté client

```javascript
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  console.log('API Call:', args[0], args[1]);
  const response = await originalFetch(...args);
  console.log('API Response:', response.status, response.statusText);
  return response;
}
```
