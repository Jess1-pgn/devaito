# How to Connect/Use Devaito APIs

## Introduction
This guide explains step by step how to integrate and use Devaito APIs (SaaS multi-tenant version).  
You will find code examples, best practices, and essential steps for each API.

**Base URL**: `https://admin.devaito.com/api`

---

## Initial Setup

### 1. **Prerequisites**
- You need access to the Devaito server (API URL and a user account).
- Your development environment should be ready (for example, VS Code for React, or Flutter SDK for Flutter).
- You need an HTTP library to make requests (like `fetch` or `axios` for React, or the `http` package for Flutter).
- You must handle authentication tokens: after login, the API returns a token that you must store and use for all protected requests.

### 2. **How to Use the Token**
After a successful login (`/login`), the API returns a token (usually called `token` or `access_token`).  
Store this token securely (for example, in `localStorage` for React or in secure storage for Flutter).  
For every request to a protected endpoint, add this token in the `Authorization` header:

```javascript
// React example
const token = localStorage.getItem('authToken');
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

```dart
// Flutter example
final headers = {
  'Authorization': 'Bearer $token',
  'Content-Type': 'application/json'
};
```

---

## API Guide

### 1. **Authentication API**

#### **User Login**
```javascript
// React example
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
```
```dart
// Flutter example
import 'package:http/http.dart' as http;
import 'dart:convert';

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
```

#### **Logout**
```javascript
// React example
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
```dart
// Flutter example
Future<Map<String, dynamic>> logout(String token) async {
  final response = await http.post(
    Uri.parse('https://admin.devaito.com/api/logout'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

---

### 2. **User API**

#### **Get User**
```javascript
// React example
const getUser = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/user', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```
```dart
// Flutter example
Future<Map<String, dynamic>> getUser(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/user'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

---

### 3. **Products API**

#### **Get All Products**
```javascript
// React example
const getProducts = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/fetch-all-products', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```
```dart
// Flutter example
Future<Map<String, dynamic>> getProducts(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/fetch-all-products'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

#### **Get Product by Slug**
```javascript
// React example
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
```dart
// Flutter example
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

---

### 4. **Orders API**
```javascript
// React example
const getOrders = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/get-all-orders', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```
```dart
// Flutter example
Future<Map<String, dynamic>> getOrders(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/get-all-orders'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

---

### 5. **Categories API**
```javascript
// React example
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
```dart
// Flutter example
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

---

### 6. **Campaigns API**
```javascript
// React example
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
```dart
// Flutter example
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

---

### 7. **Posts API**
```javascript
// React example
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
```dart
// Flutter example
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

---

### 8. **Social Media APIs**

#### **Facebook - Publish a Post**
```javascript
// React example
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
```
```dart
// Flutter example
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
```

#### **Instagram - Publish a Post**
```javascript
// React example
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
```dart
// Flutter example
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

---

### 9. **Templates API**
```javascript
// React example
const getTemplates = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/templates', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```
```dart
// Flutter example
Future<Map<String, dynamic>> getTemplates(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/templates'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

---

### 10. **Gallery & Media API**

#### **Upload an Image**
```javascript
// React example
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
```
```dart
// Flutter example
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
```

#### **List Image Gallery**
```javascript
// React example
const getImageGallery = async (page = 1) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`https://admin.devaito.com/api/image-gallery?page=${page}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```
```dart
// Flutter example
Future<Map<String, dynamic>> getImageGallery(String token, int page) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/image-gallery?page=$page'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

---

### 11. **Store Settings API**
```javascript
// React example
const getFontsAndColors = async () => {
  const token = localStorage.getItem('authToken');
  const response = await fetch('https://admin.devaito.com/api/fonts-and-colors', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```
```dart
// Flutter example
Future<Map<String, dynamic>> getFontsAndColors(String token) async {
  final response = await http.get(
    Uri.parse('https://admin.devaito.com/api/fonts-and-colors'),
    headers: { 'Authorization': 'Bearer $token' },
  );
  return jsonDecode(response.body);
}
```

---

### 12. **Content Generator API**
```javascript
// React example
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
```dart
// Flutter example
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

## Best Practices
- Always use HTTPS in production
- Store tokens securely
- Implement automatic token refresh
- Cache static data (categories, templates, etc.)
- Handle errors (401 → reconnect user, 404 → clear message)

---

## Debugging
- Use Postman/Insomnia to test endpoints
- Enable browser network DevTools
- Log all requests/responses on the client side

```javascript
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  console.log('API Call:', args[0], args[1]);
  const response = await originalFetch(...args);
  console.log('API Response:', response.status, response.statusText);
  return response;
}
```
