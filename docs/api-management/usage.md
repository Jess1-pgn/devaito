# How to Connect/Use Devaito APIs

## Introduction
This guide explains step by step how to integrate and use Devaito APIs (SaaS multi-tenant version) for any type of application—whether you are building a login system, a plugin, an e-commerce feature, or any other app for the Devaito platform.  
You will find code examples, best practices, and essential steps for each API.

**Base URL**: `https://admin.devaito.com/api`

---

## About Devaito APIs

Devaito provides a set of RESTful APIs that let you build, extend, and customize any application or plugin for the platform.  
These APIs cover authentication, user management, products, orders, categories, campaigns, posts, social media, templates, media galleries, store settings, and AI-powered content generation.

Below, you'll find grouped code samples for the most popular frameworks.  
Each section starts with a short description of the API, then shows how to use it in React, Flutter, Vue.js, and more.

---

## React

React is a popular JavaScript library for building user interfaces.  
Below are examples of how to interact with Devaito APIs in a React project.  
Each API section includes a short description to help you understand its purpose.

### Authentication API

**Purpose:**  
Authentication APIs allow you to log users in and out of your app, and securely manage their session tokens.  
Use these endpoints to enable user access and protect private data.

```javascript
// Login
const login = async (email, password) => {
  const response = await fetch('https://admin.devaito.com/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const result = await response.json();
  if (response.ok && result.token) {
    localStorage.setItem('authToken', result.token);
  }
  return result;
}

// Logout
const logout = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/logout', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.ok) localStorage.removeItem('authToken');
  return await response.json();
}
```

### User API

**Purpose:**  
The User API lets you fetch information about the current user and their store.  
Use this to display user profiles, store settings, or personalize the app experience.

```javascript
const getUser = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/user', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Products API

**Purpose:**  
Products APIs allow you to list, search, and view details about products in the store.  
Use these endpoints to build product listings, detail pages, or analytics features.

```javascript
const getProducts = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/fetch-all-products', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}

const getProduct = async (slug) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`https://admin.devaito.com/api/get-product/${slug}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.status === 404) {
    throw new Error('Product not found');
  }
  return await response.json();
}
```

### Orders API

**Purpose:**  
Orders APIs let you retrieve and manage orders placed in the store.  
Use these endpoints to display order history, track fulfillment, or build dashboards.

```javascript
const getOrders = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/get-all-orders', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Categories API

**Purpose:**  
Categories APIs help you organize products and content by category.  
Use these endpoints to build category navigation, filters, or category-based analytics.

```javascript
const getCategories = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/fetch-categories', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}

const getProductsByCategory = async (permalink) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`https://admin.devaito.com/api/fetch-categories-product/${permalink}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Campaigns API

**Purpose:**  
Campaigns APIs allow you to create and manage marketing campaigns.  
Use these endpoints to automate promotions, notifications, or scheduled events.

```javascript
const createCampaign = async (data) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/campaigns', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}
```

### Posts API

**Purpose:**  
Posts APIs let you create and manage content posts for blogs, news, or announcements.  
Use these endpoints to build content management features or automate publishing.

```javascript
const createPost = async (data) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/posts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}
```

### Social Media APIs

**Purpose:**  
Social Media APIs allow you to publish and schedule posts to platforms like Facebook and Instagram.  
Use these endpoints to automate social media marketing or connect your store to social accounts.

```javascript
const publishFacebookPost = async (pageIds, caption, imageUrl) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/facebook/publish-post', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ page_id: pageIds, caption, imageUrl })
  });
  return await response.json();
}

const publishInstagramPost = async (caption, imageUrl) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/instagram/publish-post', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ caption, imageUrl })
  });
  return await response.json();
}
```

### Templates API

**Purpose:**  
Templates APIs let you fetch and manage design templates for your store or app.  
Use these endpoints to offer template selection or customization features.

```javascript
const getTemplates = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/templates', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Gallery & Media API

**Purpose:**  
Gallery & Media APIs help you upload and manage images, videos, and other media files.  
Use these endpoints to build galleries, portfolios, or media management tools.

```javascript
const uploadImage = async (file) => {
  const token = localStorage.getItem('authToken');
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch('https://admin.devaito.com/api/save-image', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  });
  return await response.json();
}

const getImageGallery = async (page = 1) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`https://admin.devaito.com/api/image-gallery?page=${page}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Store Settings API

**Purpose:**  
Store Settings APIs allow you to fetch and update store appearance, language, and configuration.  
Use these endpoints to build customization features for store owners.

```javascript
const getFontsAndColors = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/fonts-and-colors', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Content Generator API

**Purpose:**  
The Content Generator API lets you use AI to generate content for your store or app.  
Use this endpoint to automate product descriptions, blog posts, or marketing copy.

```javascript
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

## Flutter (Dart)

Flutter is a cross-platform framework for building mobile apps.  
Here are examples for using Devaito APIs in Flutter.

### Authentication API

**Purpose:**  
Authenticate users and manage sessions in your mobile app.

```dart
Future<String?> login(String email, String password) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/login'),
    headers: { 'Content-Type': 'application/json' },
    body: jsonEncode({ 'email': email, 'password': password }),
  );
  final result = jsonDecode(response.body);
  if (response.statusCode == 200 && result['token'] != null) {
    return result['token'];
  }
  return null;
}

Future<Map<String, dynamic>> logout(String token) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/logout'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### User API

**Purpose:**  
Fetch user and store information for profile screens or personalization.

```dart
Future<Map<String, dynamic>> getUser(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/user'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### Products API

**Purpose:**  
List products and show product details in your app.

```dart
Future<Map<String, dynamic>> getProducts(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/fetch-all-products'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}

Future<Map<String, dynamic>> getProduct(String token, String slug) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/get-product/$slug'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  if (response.statusCode == 404) {
    throw Exception('Product not found');
  }
  return jsonDecode(response.body);
}
```

### Orders API

**Purpose:**  
Retrieve and manage orders in your mobile app.

```dart
Future<Map<String, dynamic>> getOrders(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/get-all-orders'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### Categories API

**Purpose:**  
Organize products and content by category in your app.

```dart
Future<Map<String, dynamic>> getCategories(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/fetch-categories'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}

Future<Map<String, dynamic>> getProductsByCategory(String token, String permalink) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/fetch-categories-product/$permalink'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### Campaigns API

**Purpose:**  
Create and manage marketing campaigns in your app.

```dart
Future<Map<String, dynamic>> createCampaign(String token, Map<String, dynamic> data) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/campaigns'),
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    },
    body: jsonEncode(data),
  );
  return jsonDecode(response.body);
}
```

### Posts API

**Purpose:**  
Create and manage content posts in your app.

```dart
Future<Map<String, dynamic>> createPost(String token, Map<String, dynamic> data) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/posts'),
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    },
    body: jsonEncode(data),
  );
  return jsonDecode(response.body);
}
```

### Social Media APIs

**Purpose:**  
Publish and schedule posts to social media platforms from your app.

```dart
Future<Map<String, dynamic>> publishFacebookPost(String token, List<String> pageIds, String caption, String imageUrl) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/facebook/publish-post'),
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    },
    body: jsonEncode({ 'page_id': pageIds, 'caption': caption, 'imageUrl': imageUrl }),
  );
  return jsonDecode(response.body);
}

Future<Map<String, dynamic>> publishInstagramPost(String token, String caption, String imageUrl) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/instagram/publish-post'),
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    },
    body: jsonEncode({ 'caption': caption, 'imageUrl': imageUrl }),
  );
  return jsonDecode(response.body);
}
```

### Templates API

**Purpose:**  
Fetch and manage design templates in your app.

```dart
Future<Map<String, dynamic>> getTemplates(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/templates'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### Gallery & Media API

**Purpose:**  
Upload and manage media files in your app.

```dart
import 'package:http/http.dart' as http;

Future<Map<String, dynamic>> uploadImage(String token, String filePath) async {
  var request = http.MultipartRequest(
    'POST',
    Uri.parse('https://admin.devaito.com/api/save-image'),
  );
  request.headers['Authorization'] = 'Bearer $token';
  request.files.add(await http.MultipartFile.fromPath('file', filePath));
  final response = await request.send();
  final respStr = await response.stream.bytesToString();
  return jsonDecode(respStr);
}

Future<Map<String, dynamic>> getImageGallery(String token, int page) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/image-gallery?page=$page'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### Store Settings API

**Purpose:**  
Fetch and update store settings in your app.

```dart
Future<Map<String, dynamic>> getFontsAndColors(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/fonts-and-colors'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### Content Generator API

**Purpose:**  
Generate content using AI in your app.

```dart
Future<Map<String, dynamic>> generateContent(String token, String message) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/content-generator'),
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    },
    body: jsonEncode({ 'message': message }),
  );
  return jsonDecode(response.body);
}
```

---

## Vue.js

Vue.js is a progressive JavaScript framework for building user interfaces.  
Below are examples for using Devaito APIs in Vue.js.

### Authentication API

**Purpose:**  
Authenticate users and manage sessions in your Vue app.

```javascript
async function login(email, password) {
  const response = await fetch('https://admin.devaito.com/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const result = await response.json();
  if (response.ok && result.token) {
    authToken.value = result.token;
    localStorage.setItem('authToken', result.token);
  }
  return result;
}

async function logout() {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/logout', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.ok) localStorage.removeItem('authToken');
  return await response.json();
}
```

### User API

**Purpose:**  
Fetch user and store information for profile screens or personalization.

```javascript
async function getUser() {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/user', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Products API

**Purpose:**  
List products and show product details in your app.

```javascript
async function getProducts() {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/fetch-all-products', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}

async function getProduct(slug) {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`https://admin.devaito.com/api/get-product/${slug}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.status === 404) {
    throw new Error('Product not found');
  }
  return await response.json();
}
```

### Orders API

**Purpose:**  
Retrieve and manage orders in your app.

```javascript
async function getOrders() {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/get-all-orders', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Categories API

**Purpose:**  
Organize products and content by category in your app.

```javascript
async function getCategories() {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/fetch-categories', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}

async function getProductsByCategory(permalink) {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`https://admin.devaito.com/api/fetch-categories-product/${permalink}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Campaigns API

**Purpose:**  
Create and manage marketing campaigns in your app.

```javascript
const createCampaign = async (data) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/campaigns', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}
```

### Posts API

**Purpose:**  
Create and manage content posts in your app.

```javascript
const createPost = async (data) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/posts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}
```

### Social Media APIs

**Purpose:**  
Publish and schedule posts to social media platforms from your app.

```javascript
const publishFacebookPost = async (pageIds, caption, imageUrl) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/facebook/publish-post', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ page_id: pageIds, caption, imageUrl })
  });
  return await response.json();
}

const publishInstagramPost = async (caption, imageUrl) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/instagram/publish-post', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ caption, imageUrl })
  });
  return await response.json();
}
```

### Templates API

**Purpose:**  
Fetch and manage design templates in your app.

```javascript
const getTemplates = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/templates', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Gallery & Media API

**Purpose:**  
Upload and manage media files in your app.

```javascript
const uploadImage = async (file) => {
  const token = localStorage.getItem('authToken');
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch('https://admin.devaito.com/api/save-image', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  });
  return await response.json();
}

const getImageGallery = async (page = 1) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`https://admin.devaito.com/api/image-gallery?page=${page}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Store Settings API

**Purpose:**  
Fetch and update store settings in your app.

```javascript
const getFontsAndColors = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/fonts-and-colors', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Content Generator API

**Purpose:**  
The Content Generator API lets you use AI to generate content for your store or app.  
Use this endpoint to automate product descriptions, blog posts, or marketing copy.

```javascript
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

## Flutter (Dart)

Flutter is a cross-platform framework for building mobile apps.  
Here are examples for using Devaito APIs in Flutter.

### Authentication API

**Purpose:**  
Authenticate users and manage sessions in your mobile app.

```dart
Future<String?> login(String email, String password) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/login'),
    headers: { 'Content-Type': 'application/json' },
    body: jsonEncode({ 'email': email, 'password': password }),
  );
  final result = jsonDecode(response.body);
  if (response.statusCode == 200 && result['token'] != null) {
    return result['token'];
  }
  return null;
}

Future<Map<String, dynamic>> logout(String token) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/logout'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### User API

**Purpose:**  
Fetch user and store information for profile screens or personalization.

```dart
Future<Map<String, dynamic>> getUser(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/user'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### Products API

**Purpose:**  
List products and show product details in your app.

```dart
Future<Map<String, dynamic>> getProducts(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/fetch-all-products'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}

Future<Map<String, dynamic>> getProduct(String token, String slug) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/get-product/$slug'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  if (response.statusCode == 404) {
    throw Exception('Product not found');
  }
  return jsonDecode(response.body);
}
```

### Orders API

**Purpose:**  
Retrieve and manage orders in your mobile app.

```dart
Future<Map<String, dynamic>> getOrders(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/get-all-orders'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### Categories API

**Purpose:**  
Organize products and content by category in your mobile app.

```dart
Future<Map<String, dynamic>> getCategories(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/fetch-categories'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}

Future<Map<String, dynamic>> getProductsByCategory(String token, String permalink) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/fetch-categories-product/$permalink'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### Campaigns API

**Purpose:**  
Create and manage marketing campaigns in your mobile app.

```dart
Future<Map<String, dynamic>> createCampaign(String token, Map<String, dynamic> data) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/campaigns'),
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    },
    body: jsonEncode(data),
  );
  return jsonDecode(response.body);
}
```

### Posts API

**Purpose:**  
Create and manage content posts in your mobile app.

```dart
Future<Map<String, dynamic>> createPost(String token, Map<String, dynamic> data) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/posts'),
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    },
    body: jsonEncode(data),
  );
  return jsonDecode(response.body);
}
```

### Social Media APIs

**Purpose:**  
Publish and schedule posts to social media platforms from your mobile app.

```dart
Future<Map<String, dynamic>> publishFacebookPost(String token, List<String> pageIds, String caption, String imageUrl) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/facebook/publish-post'),
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    },
    body: jsonEncode({ 'page_id': pageIds, 'caption': caption, 'imageUrl': imageUrl }),
  );
  return jsonDecode(response.body);
}

Future<Map<String, dynamic>> publishInstagramPost(String token, String caption, String imageUrl) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/instagram/publish-post'),
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    },
    body: jsonEncode({ 'caption': caption, 'imageUrl': imageUrl }),
  );
  return jsonDecode(response.body);
}
```

### Templates API

**Purpose:**  
Fetch and manage design templates in your mobile app.

```dart
Future<Map<String, dynamic>> getTemplates(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/templates'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### Gallery & Media API

**Purpose:**  
Upload and manage media files in your mobile app.

```dart
Future<Map<String, dynamic>> uploadImage(String token, String filePath) async {
  var request = http.MultipartRequest(
    'POST',
    Uri.parse('https://admin.devaito.com/api/save-image'),
  );
  request.headers['Authorization'] = 'Bearer $token';
  request.files.add(await http.MultipartFile.fromPath('file', filePath));
  final response = await request.send();
  final respStr = await response.stream.bytesToString();
  return jsonDecode(respStr);
}

Future<Map<String, dynamic>> getImageGallery(String token, int page) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/image-gallery?page=$page'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### Store Settings API

**Purpose:**  
Fetch and update store settings in your mobile app.

```dart
Future<Map<String, dynamic>> getFontsAndColors(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/fonts-and-colors'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### Content Generator API

**Purpose:**  
Generate content using AI in your mobile app.

```dart
Future<Map<String, dynamic>> generateContent(String token, String message) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/content-generator'),
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    },
    body: jsonEncode({ 'message': message }),
  );
  return jsonDecode(response.body);
}
```

---

## Vue.js

Vue.js is a progressive JavaScript framework for building user interfaces.  
Below are examples for using Devaito APIs in Vue.js.

### Authentication API

**Purpose:**  
Authenticate users and manage sessions in your Vue app.

```javascript
async function login(email, password) {
  const response = await fetch('https://admin.devaito.com/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const result = await response.json();
  if (response.ok && result.token) {
    authToken.value = result.token;
    localStorage.setItem('authToken', result.token);
  }
  return result;
}

async function logout() {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/logout', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.ok) localStorage.removeItem('authToken');
  return await response.json();
}
```

### User API

**Purpose:**  
Fetch user and store information for profile screens or personalization.

```javascript
async function getUser() {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/user', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Products API

**Purpose:**  
List products and show product details in your app.

```javascript
async function getProducts() {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/fetch-all-products', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}

async function getProduct(slug) {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`https://admin.devaito.com/api/get-product/${slug}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.status === 404) {
    throw new Error('Product not found');
  }
  return await response.json();
}
```

### Orders API

**Purpose:**  
Retrieve and manage orders in your app.

```javascript
async function getOrders() {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/get-all-orders', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Categories API

**Purpose:**  
Organize products and content by category in your app.

```javascript
async function getCategories() {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/fetch-categories', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}

async function getProductsByCategory(permalink) {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`https://admin.devaito.com/api/fetch-categories-product/${permalink}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Campaigns API

**Purpose:**  
Create and manage marketing campaigns in your app.

```javascript
const createCampaign = async (data) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/campaigns', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}
```

### Posts API

**Purpose:**  
Create and manage content posts in your app.

```javascript
const createPost = async (data) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/posts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}
```

### Social Media APIs

**Purpose:**  
Publish and schedule posts to social media platforms from your app.

```javascript
const publishFacebookPost = async (pageIds, caption, imageUrl) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/facebook/publish-post', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ page_id: pageIds, caption, imageUrl })
  });
  return await response.json();
}

const publishInstagramPost = async (caption, imageUrl) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/instagram/publish-post', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ caption, imageUrl })
  });
  return await response.json();
}
```

### Templates API

**Purpose:**  
Fetch and manage design templates in your app.

```javascript
const getTemplates = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/templates', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Gallery & Media API

**Purpose:**  
Upload and manage media files in your app.

```javascript
const uploadImage = async (file) => {
  const token = localStorage.getItem('authToken');
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch('https://admin.devaito.com/api/save-image', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  });
  return await response.json();
}

const getImageGallery = async (page = 1) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`https://admin.devaito.com/api/image-gallery?page=${page}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Store Settings API

**Purpose:**  
Fetch and update store settings in your app.

```javascript
const getFontsAndColors = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/fonts-and-colors', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Content Generator API

**Purpose:**  
The Content Generator API lets you use AI to generate content for your store or app.  
Use this endpoint to automate product descriptions, blog posts, or marketing copy.

```javascript
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

## Flutter (Dart)

Flutter is a cross-platform framework for building mobile apps.  
Here are examples for using Devaito APIs in Flutter.

### Authentication API

**Purpose:**  
Authenticate users and manage sessions in your mobile app.

```dart
Future<String?> login(String email, String password) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/login'),
    headers: { 'Content-Type': 'application/json' },
    body: jsonEncode({ 'email': email, 'password': password }),
  );
  final result = jsonDecode(response.body);
  if (response.statusCode == 200 && result['token'] != null) {
    return result['token'];
  }
  return null;
}

Future<Map<String, dynamic>> logout(String token) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/logout'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### User API

**Purpose:**  
Fetch user and store information for profile screens or personalization.

```dart
Future<Map<String, dynamic>> getUser(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/user'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### Products API

**Purpose:**  
List products and show product details in your app.

```dart
Future<Map<String, dynamic>> getProducts(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/fetch-all-products'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}

Future<Map<String, dynamic>> getProduct(String token, String slug) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/get-product/$slug'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  if (response.statusCode == 404) {
    throw Exception('Product not found');
  }
  return jsonDecode(response.body);
}
```

### Orders API

**Purpose:**  
Retrieve and manage orders in your mobile app.

```dart
Future<Map<String, dynamic>> getOrders(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/get-all-orders'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### Categories API

**Purpose:**  
Organize products and content by category in your mobile app.

```dart
Future<Map<String, dynamic>> getCategories(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/fetch-categories'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}

Future<Map<String, dynamic>> getProductsByCategory(String token, String permalink) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/fetch-categories-product/$permalink'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### Campaigns API

**Purpose:**  
Create and manage marketing campaigns in your mobile app.

```dart
Future<Map<String, dynamic>> createCampaign(String token, Map<String, dynamic> data) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/campaigns'),
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    },
    body: jsonEncode(data),
  );
  return jsonDecode(response.body);
}
```

### Posts API

**Purpose:**  
Create and manage content posts in your mobile app.

```dart
Future<Map<String, dynamic>> createPost(String token, Map<String, dynamic> data) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/posts'),
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    },
    body: jsonEncode(data),
  );
  return jsonDecode(response.body);
}
```

### Social Media APIs

**Purpose:**  
Publish and schedule posts to social media platforms from your mobile app.

```dart
Future<Map<String, dynamic>> publishFacebookPost(String token, List<String> pageIds, String caption, String imageUrl) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/facebook/publish-post'),
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    },
    body: jsonEncode({ 'page_id': pageIds, 'caption': caption, 'imageUrl': imageUrl }),
  );
  return jsonDecode(response.body);
}

Future<Map<String, dynamic>> publishInstagramPost(String token, String caption, String imageUrl) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/instagram/publish-post'),
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    },
    body: jsonEncode({ 'caption': caption, 'imageUrl': imageUrl }),
  );
  return jsonDecode(response.body);
}
```

### Templates API

**Purpose:**  
Fetch and manage design templates in your mobile app.

```dart
Future<Map<String, dynamic>> getTemplates(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/templates'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### Gallery & Media API

**Purpose:**  
Upload and manage media files in your mobile app.

```dart
Future<Map<String, dynamic>> uploadImage(String token, String filePath) async {
  var request = http.MultipartRequest(
    'POST',
    Uri.parse('https://admin.devaito.com/api/save-image'),
  );
  request.headers['Authorization'] = 'Bearer $token';
  request.files.add(await http.MultipartFile.fromPath('file', filePath));
  final response = await request.send();
  final respStr = await response.stream.bytesToString();
  return jsonDecode(respStr);
}

Future<Map<String, dynamic>> getImageGallery(String token, int page) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/image-gallery?page=$page'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### Store Settings API

**Purpose:**  
Fetch and update store settings in your mobile app.

```dart
Future<Map<String, dynamic>> getFontsAndColors(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/fonts-and-colors'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

### Content Generator API

**Purpose:**  
Generate content using AI in your mobile app.

```dart
Future<Map<String, dynamic>> generateContent(String token, String message) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/content-generator'),
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    },
    body: jsonEncode({ 'message': message }),
  );
  return jsonDecode(response.body);
}
```

---

## Vue.js

Vue.js is a progressive JavaScript framework for building user interfaces.  
Below are examples for using Devaito APIs in Vue.js.

### Authentication API

**Purpose:**  
Authenticate users and manage sessions in your Vue app.

```javascript
async function login(email, password) {
  const response = await fetch('https://admin.devaito.com/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const result = await response.json();
  if (response.ok && result.token) {
    authToken.value = result.token;
    localStorage.setItem('authToken', result.token);
  }
  return result;
}

async function logout() {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/logout', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.ok) localStorage.removeItem('authToken');
  return await response.json();
}
```

### User API

**Purpose:**  
Fetch user and store information for profile screens or personalization.

```javascript
async function getUser() {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/user', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Products API

**Purpose:**  
List products and show product details in your app.

```javascript
async function getProducts() {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/fetch-all-products', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}

async function getProduct(slug) {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`https://admin.devaito.com/api/get-product/${slug}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.status === 404) {
    throw new Error('Product not found');
  }
  return await response.json();
}
```

### Orders API

**Purpose:**  
Retrieve and manage orders in your app.

```javascript
async function getOrders() {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/get-all-orders', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Categories API

**Purpose:**  
Organize products and content by category in your app.

```javascript
async function getCategories() {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/fetch-categories', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}

async function getProductsByCategory(permalink) {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`https://admin.devaito.com/api/fetch-categories-product/${permalink}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Campaigns API

**Purpose:**  
Create and manage marketing campaigns in your app.

```javascript
const createCampaign = async (data) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/campaigns', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}
```

### Posts API

**Purpose:**  
Create and manage content posts in your app.

```javascript
const createPost = async (data) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/posts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}
```

### Social Media APIs

**Purpose:**  
Publish and schedule posts to social media platforms from your app.

```javascript
const publishFacebookPost = async (pageIds, caption, imageUrl) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/facebook/publish-post', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ page_id: pageIds, caption, imageUrl })
  });
  return await response.json();
}

const publishInstagramPost = async (caption, imageUrl) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/instagram/publish-post', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ caption, imageUrl })
  });
  return await response.json();
}
```

### Templates API

**Purpose:**  
Fetch and manage design templates in your app.

```javascript
const getTemplates = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/templates', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Gallery & Media API

**Purpose:**  
Upload and manage media files in your app.

```javascript
const uploadImage = async (file) => {
  const token = localStorage.getItem('authToken');
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch('https://admin.devaito.com/api/save-image', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  });
  return await response.json();
}

const getImageGallery = async (page = 1) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`https://admin.devaito.com/api/image-gallery?page=${page}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Store Settings API

**Purpose:**  
Fetch and update store settings in your app.

```javascript
const getFontsAndColors = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/fonts-and-colors', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

### Content Generator API

**Purpose:**  
The Content Generator API lets you use AI to generate content for your store or app.  
Use this endpoint to automate product descriptions, blog posts, or marketing copy.

```javascript
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

## PHP (Laravel)

Laravel is a popular PHP framework for building web applications.  
Below are examples for using Devaito APIs in a Laravel project.

### Authentication API

**Purpose:**  
Authenticate users and manage sessions in your Laravel app.

```php
// Login example using Guzzle HTTP client
use GuzzleHttp\Client;

$client = new Client();
$response = $client->post('https://admin.devaito.com/api/login', [
    'json' => [
        'email' => $email,
        'password' => $password
    ]
]);
$result = json_decode($response->getBody(), true);
if (isset($result['token'])) {
    // Store token in session or database
}
```

### User API

```php
uri = URI('https://admin.devaito.com/api/user')
req = Net::HTTP::Get.new(uri)
req['Authorization'] = "Bearer #{token}"
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
user = JSON.parse(res.body)
```

### Products API

```php
// Get all products
$response = $client->get('https://admin.devaito.com/api/fetch-all-products', [
    'headers' => [
        'Authorization' => 'Bearer ' . $token
    ]
]);
$products = json_decode($response->getBody(), true);

// Get product by slug
$slug = 'your-product-slug';
$response = $client->get("https://admin.devaito.com/api/get-product/$slug", [
    'headers' => [
        'Authorization' => 'Bearer ' . $token
    ]
]);
$product = json_decode($response->getBody(), true);
```

### Orders API

```php
uri = URI('https://admin.devaito.com/api/get-all-orders')
req = Net::HTTP::Get.new(uri)
req['Authorization'] = "Bearer #{token}"
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
orders = JSON.parse(res.body)
```

### Categories API

```php
$response = $client->get('https://admin.devaito.com/api/fetch-categories', [
    'headers' => [
        'Authorization' => 'Bearer ' . $token
    ]
]);
$categories = json_decode($response->getBody(), true);

$permalink = 'your-category-permalink';
$response = $client->get("https://admin.devaito.com/api/fetch-categories-product/$permalink", [
    'headers' => [
        'Authorization' => 'Bearer ' . $token
    ]
]);
$categoryProducts = json_decode($response->getBody(), true);
```

### Campaigns API

```php
$response = $client->post('https://admin.devaito.com/api/campaigns', [
    'headers' => [
        'Authorization' => 'Bearer ' . $token,
        'Content-Type' => 'application/json'
    ],
    'json' => [
        // your campaign data here
    ]
]);
$campaign = json_decode($response->getBody(), true);
```

### Posts API

```php
$response = $client->post('https://admin.devaito.com/api/posts', [
    'headers' => [
        'Authorization' => 'Bearer ' . $token,
        'Content-Type' => 'application/json'
    ],
    'json' => [
        // your post data here
    ]
]);
$post = json_decode($response->getBody(), true);
```

### Social Media APIs

```php
// Publish Facebook post
$response = $client->post('https://admin.devaito.com/api/facebook/publish-post', [
    'headers' => [
        'Authorization' => 'Bearer ' . $token,
        'Content-Type' => 'application/json'
    ],
    'json' => [
        'page_id' => ['your-page-id'],
        'caption' => 'Your caption',
        'imageUrl' => 'https://example.com/image.jpg'
    ]
]);
$fbResult = json_decode($response->getBody(), true);

// Publish Instagram post
$response = $client->post('https://admin.devaito.com/api/instagram/publish-post', [
    'headers' => [
        'Authorization' => 'Bearer ' . $token,
        'Content-Type' => 'application/json'
    ],
    'json' => [
        'caption' => 'Your caption',
        'imageUrl' => 'https://example.com/image.jpg'
    ]
]);
$igResult = json_decode($response->getBody(), true);
```

### Templates API

```php
$response = $client->get('https://admin.devaito.com/api/templates', [
    'headers' => [
        'Authorization' => 'Bearer ' . $token
    ]
]);
$templates = json_decode($response->getBody(), true);
```

### Gallery & Media API

```php
// Upload image (using Guzzle's multipart)
$response = $client->post('https://admin.devaito.com/api/save-image', [
    'headers' => [
        'Authorization' => 'Bearer ' . $token
    ],
    'multipart' => [
        [
            'name'     => 'file',
            'contents' => fopen('/path/to/image.jpg', 'r')
        ]
    ]
]);
$imageUpload = json_decode($response->getBody(), true);

// Get image gallery
$response = $client->get('https://admin.devaito.com/api/image-gallery?page=1', [
    'headers' => [
        'Authorization' => 'Bearer ' . $token
    ]
]);
$imageGallery = json_decode($response->getBody(), true);
```

### Store Settings API

```php
$response = $client->get('https://admin.devaito.com/api/fonts-and-colors', [
    'headers' => [
        'Authorization' => 'Bearer ' . $token
    ]
]);
$fontsColors = json_decode($response->getBody(), true);
```

### Content Generator API

```php
$response = $client->post('https://admin.devaito.com/api/content-generator', [
    'headers' => [
        'Authorization' => 'Bearer ' . $token,
        'Content-Type' => 'application/json'
    ],
    'json' => [
        'message' => 'Generate a product description for a new shoe.'
    ]
]);
$content = json_decode($response->getBody(), true);
```

---

## Ruby (Rails)

Ruby on Rails is a dynamic web framework.  
Below are examples for using Devaito APIs in a Rails project.  
Each API section includes a short description to help you understand its purpose.

### Authentication API

**Purpose:**  
Authenticate users and manage sessions in your Rails app.

```ruby
require 'net/http'
require 'json'

# Login
uri = URI('https://admin.devaito.com/api/login')
res = Net::HTTP.post(uri, { email: email, password: password }.to_json, "Content-Type" => "application/json")
result = JSON.parse(res.body)
token = result["token"] if result["token"]

# Logout
uri = URI('https://admin.devaito.com/api/logout')
req = Net::HTTP::Post.new(uri)
req['Authorization'] = "Bearer #{token}"
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
logout_result = JSON.parse(res.body)
```

### User API

**Purpose:**  
Fetch user and store information for profile screens or personalization.

```ruby
uri = URI('https://admin.devaito.com/api/user')
req = Net::HTTP::Get.new(uri)
req['Authorization'] = "Bearer #{token}"
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
user = JSON.parse(res.body)
```

### Products API

**Purpose:**  
List products and show product details in your app.

```ruby
# Get all products
uri = URI('https://admin.devaito.com/api/fetch-all-products')
req = Net::HTTP::Get.new(uri)
req['Authorization'] = "Bearer #{token}"
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
products = JSON.parse(res.body)

# Get product by slug
slug = 'your-product-slug'
uri = URI("https://admin.devaito.com/api/get-product/#{slug}")
req = Net::HTTP::Get.new(uri)
req['Authorization'] = "Bearer #{token}"
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
product = JSON.parse(res.body)
```

### Orders API

**Purpose:**  
Retrieve and manage orders in your app.

```ruby
uri = URI('https://admin.devaito.com/api/get-all-orders')
req = Net::HTTP::Get.new(uri)
req['Authorization'] = "Bearer #{token}"
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
orders = JSON.parse(res.body)
```

### Categories API

**Purpose:**  
Organize products and content by category in your app.

```ruby
# Get categories
uri = URI('https://admin.devaito.com/api/fetch-categories')
req = Net::HTTP::Get.new(uri)
req['Authorization'] = "Bearer #{token}"
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
categories = JSON.parse(res.body)

# Get products by category
permalink = 'your-category-permalink'
uri = URI("https://admin.devaito.com/api/fetch-categories-product/#{permalink}")
req = Net::HTTP::Get.new(uri)
req['Authorization'] = "Bearer #{token}"
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
category_products = JSON.parse(res.body)
```

### Campaigns API

**Purpose:**  
Create and manage marketing campaigns in your app.

```ruby
uri = URI('https://admin.devaito.com/api/campaigns')
req = Net::HTTP::Post.new(uri)
req['Authorization'] = "Bearer #{token}"
req['Content-Type'] = "application/json"
req.body = { /* your campaign data here */ }.to_json
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
campaign = JSON.parse(res.body)
```

### Posts API

**Purpose:**  
Create and manage content posts in your app.

```ruby
uri = URI('https://admin.devaito.com/api/posts')
req = Net::HTTP::Post.new(uri)
req['Authorization'] = "Bearer #{token}"
req['Content-Type'] = "application/json"
req.body = { /* your post data here */ }.to_json
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
post = JSON.parse(res.body)
```

### Social Media APIs

**Purpose:**  
Publish and schedule posts to social media platforms from your app.

```ruby
# Publish Facebook post
uri = URI('https://admin.devaito.com/api/facebook/publish-post')
req = Net::HTTP::Post.new(uri)
req['Authorization'] = "Bearer #{token}"
req['Content-Type'] = "application/json"
req.body = {
  page_id: ['your-page-id'],
  caption: 'Your caption',
  imageUrl: 'https://example.com/image.jpg'
}.to_json
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
fb_result = JSON.parse(res.body)

# Publish Instagram post
uri = URI('https://admin.devaito.com/api/instagram/publish-post')
req = Net::HTTP::Post.new(uri)
req['Authorization'] = "Bearer #{token}"
req['Content-Type'] = "application/json"
req.body = {
  caption: 'Your caption',
  imageUrl: 'https://example.com/image.jpg'
}.to_json
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
ig_result = JSON.parse(res.body)
```

### Templates API

**Purpose:**  
Fetch and manage design templates in your app.

```ruby
uri = URI('https://admin.devaito.com/api/templates')
req = Net::HTTP::Get.new(uri)
req['Authorization'] = "Bearer #{token}"
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
templates = JSON.parse(res.body)
```

### Gallery & Media API

**Purpose:**  
Upload and manage media files in your app.

```ruby
# Get image gallery
uri = URI('https://admin.devaito.com/api/image-gallery?page=1')
req = Net::HTTP::Get.new(uri)
req['Authorization'] = "Bearer #{token}"
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
image_gallery = JSON.parse(res.body)
```

### Store Settings API

**Purpose:**  
Fetch and update store settings in your app.

```ruby
uri = URI('https://admin.devaito.com/api/fonts-and-colors')
req = Net::HTTP::Get.new(uri)
req['Authorization'] = "Bearer #{token}"
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
fonts_colors = JSON.parse(res.body)
```

### Content Generator API

**Purpose:**  
Generate content using AI in your app.

```ruby
uri = URI('https://admin.devaito.com/api/content-generator')
req = Net::HTTP::Post.new(uri)
req['Authorization'] = "Bearer #{token}"
req['Content-Type'] = "application/json"
req.body = { message: 'Generate a product description for a new shoe.' }.to_json
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
content = JSON.parse(res.body)
```
