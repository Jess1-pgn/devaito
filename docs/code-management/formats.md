# Code Formats & Conventions

## Overview

This guide establishes the coding standards, file organization patterns, and naming conventions for Devaito v2.0 applications. Following these conventions ensures consistency, maintainability, and seamless integration with the Devaito platform APIs.

**Benefits of Following Conventions:**
- Improved code readability and maintainability
- Better team collaboration
- Easier debugging and troubleshooting
- Consistent deployment behavior
- Enhanced platform compatibility

## Project Structure Standards

### Web Application Structure

**Standard Frontend Structure:**
```
project-root/
├── index.html              # Main entry point (required)
├── assets/                 # Static assets directory
│   ├── css/               # Stylesheets
│   │   ├── main.css       # Primary styles
│   │   ├── components.css # Component styles
│   │   └── responsive.css # Media queries
│   ├── js/                # JavaScript files
│   │   ├── app.js         # Main application logic
│   │   ├── api.js         # API integration
│   │   ├── utils.js       # Utility functions
│   │   └── components/    # Reusable components
│   ├── images/            # Image assets
│   │   ├── logo.png
│   │   ├── icons/
│   │   └── products/
│   └── fonts/             # Font files
├── api/                   # Backend API files
│   ├── config/            # Configuration files
│   ├── controllers/       # Request handlers
│   ├── models/            # Data models
│   └── middleware/        # Custom middleware
├── config/                # Application configuration
│   ├── database.php       # Database settings
│   ├── app.js            # App configuration
│   └── environment.env    # Environment variables
├── vendor/                # Third-party libraries
├── node_modules/          # NPM packages (excluded from upload)
├── package.json           # Node.js dependencies
├── composer.json          # PHP dependencies
└── README.md              # Project documentation
```

### Framework-Specific Structures

**React Application Structure:**
```
react-app/
├── public/
│   ├── index.html         # HTML template
│   ├── favicon.ico        # Site icon
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/        # Reusable components
│   │   ├── common/        # Shared components
│   │   ├── layout/        # Layout components
│   │   └── ui/            # UI elements
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   └── Cart.jsx
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services
│   │   ├── api.js         # Base API client
│   │   ├── products.js    # Product API calls
│   │   └── auth.js        # Authentication
│   ├── utils/             # Utility functions
│   ├── styles/            # Style files
│   ├── App.js             # Main App component
│   └── index.js           # Entry point
├── build/                 # Production build output
├── package.json
└── .env                   # Environment variables
```

**Vue.js Application Structure:**
```
vue-app/
├── public/
│   └── index.html
├── src/
│   ├── components/        # Vue components
│   ├── views/             # Page views
│   ├── router/            # Vue Router config
│   ├── store/             # Vuex store
│   ├── services/          # API services
│   ├── assets/            # Static assets
│   ├── App.vue            # Root component
│   └── main.js            # Entry point
├── dist/                  # Build output
└── package.json
```

**PHP Application Structure:**
```
php-app/
├── public/                # Web-accessible directory
│   ├── index.php          # Entry point
│   ├── assets/            # Static assets
│   └── .htaccess          # Apache configuration
├── src/                   # Source code
│   ├── Controllers/       # Request controllers
│   ├── Models/            # Data models
│   ├── Services/          # Business logic
│   └── Utils/             # Utility classes
├── config/                # Configuration files
│   ├── database.php
│   └── app.php
├── vendor/                # Composer dependencies
├── composer.json          # PHP dependencies
└── .env                   # Environment configuration
```

## File Naming Conventions

### General Rules

**File Naming Standards:**
- Use lowercase with hyphens: `user-profile.js` ✅
- Avoid spaces and underscores: `user_profile.js` ❌, `user profile.js` ❌
- Use descriptive names: `product-card.component.js` ✅
- Include file purpose in name: `auth.service.js`, `product.model.js`
- Keep names concise but meaningful: `cart.js` ✅ vs `shopping-cart-functionality.js` ❌

### Language-Specific Naming

**JavaScript/TypeScript Files:**
```
// Components (PascalCase for classes/components)
UserProfile.js
ProductCard.jsx
ShoppingCart.tsx

// Services and utilities (camelCase)
apiService.js
dataUtils.js
authHelper.ts

// Configuration files (lowercase with hyphens)
webpack-config.js
babel-config.js
eslint-config.js

// Page/route files (lowercase with hyphens)
home-page.js
product-detail.js
checkout-flow.js
```

**PHP Files:**
```
// Classes (PascalCase)
UserController.php
ProductModel.php
DatabaseService.php

// Functions and utilities (camelCase)
helpers.php
utilities.php
functions.php

// Configuration (lowercase)
config.php
database.php
settings.php
```

**CSS/SCSS Files:**
```
// Main stylesheets
main.css
styles.scss
variables.scss

// Component styles (match component names)
user-profile.css
product-card.scss
navigation.css

// Layout styles
layout.css
grid-system.scss
responsive.css
```

### Directory Naming

**Directory Structure Rules:**
- Use lowercase with hyphens: `user-management/` ✅
- Be descriptive and specific: `product-components/` ✅ vs `components/` ❌
- Group related functionality: `auth-services/`, `payment-utils/`
- Use plural nouns for collections: `components/`, `services/`, `models/`

**Examples:**
```
src/
├── components/
│   ├── ui-elements/
│   ├── form-controls/
│   └── navigation/
├── services/
│   ├── api-clients/
│   ├── data-processing/
│   └── third-party/
├── utils/
│   ├── string-helpers/
│   ├── date-functions/
│   └── validation/
└── assets/
    ├── image-files/
    ├── font-files/
    └── icon-sets/
```

## Configuration Files

### Environment Configuration

**Environment Variables (.env):**
```bash
# Application Settings
APP_NAME=MyDevaitoApp
APP_ENV=production
APP_DEBUG=false
APP_URL=https://myapp.devaito.com

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=myapp_db
DB_USERNAME=db_user
DB_PASSWORD=secure_password

# Devaito API Configuration
DEVAITO_API_URL=https://svelte.devaito.com
DEVAITO_API_TOKEN=11|your_bearer_token_here
DEVAITO_APP_ID=your_app_id

# Third-party Services
STRIPE_PUBLIC_KEY=pk_live_your_stripe_key
STRIPE_SECRET_KEY=sk_live_your_stripe_secret
PAYPAL_CLIENT_ID=your_paypal_client_id

# Email Configuration
MAIL_DRIVER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your_app_password

# Cache Settings
CACHE_DRIVER=redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# File Storage
FILESYSTEM_DISK=local
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=your_s3_bucket
```

### Package Configuration

**package.json Structure:**
```json
{
  "name": "my-devaito-app",
  "version": "1.0.0",
  "description": "E-commerce application built with Devaito APIs",
  "main": "index.js",
  "keywords": ["ecommerce", "devaito", "api"],
  "author": {
    "name": "Your Name",
    "email": "your.email@example.com"
  },
  "license": "MIT",
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "webpack --mode=production",
    "test": "jest",
    "lint": "eslint src/",
    "format": "prettier --write src/"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "eslint": "^8.50.0",
    "prettier": "^3.0.0",
    "jest": "^29.0.0",
    "nodemon": "^3.0.0"
  },
  "devaito": {
    "app_id": "your_app_id",
    "api_version": "v1",
    "build_command": "npm run build",
    "start_command": "npm start"
  }
}
```

**composer.json Structure (PHP):**
```json
{
  "name": "yourname/devaito-app",
  "description": "PHP application using Devaito APIs",
  "type": "project",
  "keywords": ["php", "ecommerce", "devaito"],
  "license": "MIT",
  "authors": [
    {
      "name": "Your Name",
      "email": "your.email@example.com"
    }
  ],
  "minimum-stability": "stable",
  "require": {
    "php": "^8.0",
    "guzzlehttp/guzzle": "^7.0",
    "vlucas/phpdotenv": "^5.0",
    "monolog/monolog": "^3.0"
  },
  "require-dev": {
    "phpunit/phpunit": "^10.0",
    "phpstan/phpstan": "^1.0",
    "squizlabs/php_codesniffer": "^3.0"
  },
  "autoload": {
    "psr-4": {
      "App\\": "src/"
    }
  },
  "autoload-dev": {
    "psr-4": {
      "Tests\\": "tests/"
    }
  },
  "scripts": {
    "test": "phpunit",
    "lint": "phpcs src/",
    "analyze": "phpstan analyse src/"
  }
}
```

## Code Quality Standards

### JavaScript/TypeScript Standards

**Modern JavaScript Practices:**
```javascript
// Use const/let instead of var
const API_BASE_URL = 'https://svelte.devaito.com';
let currentUser = null;

// Arrow functions for callbacks
const fetchProducts = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?category=${category}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

// Destructuring for cleaner code
const { products, categories, total } = await fetchCatalogData();

// Template literals for strings
const productUrl = `${API_BASE_URL}/products/${productSlug}`;

// Async/await instead of promises
const loadUserData = async (userId) => {
  const user = await fetchUser(userId);
  const orders = await fetchUserOrders(userId);
  return { user, orders };
};

// Object shorthand
const createProductData = (name, price, category) => ({
  name,
  price,
  category,
  createdAt: new Date().toISOString()
});

// Default parameters
const formatPrice = (price, currency = 'USD', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(price);
};
```

**TypeScript Best Practices:**
```typescript
// Interface definitions
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  slug: string;
  images: string[];
  inStock: boolean;
  createdAt: Date;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

// Generic functions
async function apiCall<T>(endpoint: string): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${process.env.DEVAITO_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.json();
}

// Type guards
function isProduct(obj: any): obj is Product {
  return obj && 
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.price === 'number';
}

// Enum usage
enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}
```

### PHP Standards (PSR Compliance)

**PSR-4 Autoloading Structure:**
```php
<?php
// src/Controllers/ProductController.php
namespace App\Controllers;

use App\Services\ProductService;
use App\Models\Product;
use Exception;

class ProductController
{
    private ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function getProducts(array $filters = []): array
    {
        try {
            $products = $this->productService->getFilteredProducts($filters);
            
            return [
                'success' => true,
                'data' => $products,
                'count' => count($products)
            ];
        } catch (Exception $e) {
            error_log("Product fetch error: " . $e->getMessage());
            
            return [
                'success' => false,
                'error' => 'Failed to fetch products',
                'message' => $e->getMessage()
            ];
        }
    }

    public function getProduct(string $slug): array
    {
        if (empty($slug)) {
            return [
                'success' => false,
                'error' => 'Product slug is required'
            ];
        }

        $product = $this->productService->getBySlug($slug);
        
        if (!$product) {
            return [
                'success' => false,
                'error' => 'Product not found'
            ];
        }

        return [
            'success' => true,
            'data' => $product
        ];
    }
}
```

**Model Structure:**
```php
<?php
// src/Models/Product.php
namespace App\Models;

use DateTime;

class Product
{
    private string $id;
    private string $name;
    private float $price;
    private string $category;
    private string $slug;
    private array $images;
    private bool $inStock;
    private DateTime $createdAt;

    public function __construct(array $data)
    {
        $this->id = $data['id'] ?? '';
        $this->name = $data['name'] ?? '';
        $this->price = (float)($data['price'] ?? 0);
        $this->category = $data['category'] ?? '';
        $this->slug = $data['slug'] ?? '';
        $this->images = $data['images'] ?? [];
        $this->inStock = (bool)($data['in_stock'] ?? false);
        $this->createdAt = new DateTime($data['created_at'] ?? 'now');
    }

    // Getters
    public function getId(): string
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function getFormattedPrice(string $currency = 'USD'): string
    {
        return number_format($this->price, 2) . ' ' . $currency;
    }

    // Validation
    public function isValid(): bool
    {
        return !empty($this->id) && 
               !empty($this->name) && 
               $this->price > 0 &&
               !empty($this->slug);
    }

    // Serialization
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'category' => $this->category,
            'slug' => $this->slug,
            'images' => $this->images,
            'in_stock' => $this->inStock,
            'created_at' => $this->createdAt->format('c')
        ];
    }
}
```

### CSS/SCSS Standards

**CSS Architecture:**
```css
/* Base styles - variables and resets */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --danger-color: #e74c3c;
  --warning-color: #f39c12;
  --text-color: #2c3e50;
  --background-color: #ffffff;
  --border-color: #ecf0f1;
  
  --font-family-primary: 'Inter', sans-serif;
  --font-family-secondary: 'Georgia', serif;
  
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  --border-radius: 0.375rem;
  --box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Component-based structure */
.product-card {
  display: flex;
  flex-direction: column;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: var(--spacing-md);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing-sm);
}

.product-card__title {
  font-family: var(--font-family-primary);
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: var(--spacing-xs);
  line-height: 1.4;
}

.product-card__price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
}

/* Responsive design */
@media (max-width: 768px) {
  .product-card {
    padding: var(--spacing-sm);
  }
  
  .product-card__image {
    height: 150px;
  }
}
```

**SCSS Structure:**
```scss
// _variables.scss
$primary-color: #3498db;
$secondary-color: #2ecc71;
$text-color: #2c3e50;

$breakpoints: (
  'mobile': 480px,
  'tablet': 768px,
  'desktop': 1024px,
  'wide': 1200px
);

// _mixins.scss
@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  }
}

@mixin button-style($bg-color: $primary-color, $text-color: white) {
  background-color: $bg-color;
  color: $text-color;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: darken($bg-color, 10%);
    transform: translateY(-1px);
  }
}

// main.scss
@import 'variables';
@import 'mixins';

.btn-primary {
  @include button-style($primary-color, white);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  
  @include respond-to('tablet') {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include respond-to('desktop') {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## API Integration Standards

### Devaito API Client Structure

**Base API Client:**
```javascript
// services/api.js
class DevaitoAPI {
  constructor() {
    this.baseURL = process.env.DEVAITO_API_URL || 'https://svelte.devaito.com';
    this.token = process.env.DEVAITO_API_TOKEN;
    this.timeout = 30000; // 30 seconds
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    // Add authentication header if token is available
    if (this.token && !options.skipAuth) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new APIError(response.status, response.statusText);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(0, 'Network error', error.message);
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Custom error class
class APIError extends Error {
  constructor(status, statusText, details = null) {
    super(`API Error ${status}: ${statusText}`);
    this.status = status;
    this.statusText = statusText;
    this.details = details;
    this.name = 'APIError';
  }
}

export default new DevaitoAPI();
```

**Service-Specific Clients:**
```javascript
// services/products.js
import api from './api.js';

export const productService = {
  // Get all products with optional filters
  async getProducts(filters = {}) {
    const params = {
      category: filters.category,
      min_price: filters.minPrice,
      max_price: filters.maxPrice,
      search: filters.search,
      page: filters.page || 1,
      limit: filters.limit || 20
    };

    // Remove undefined values
    Object.keys(params).forEach(key => {
      if (params[key] === undefined) delete params[key];
    });

    return api.get('/products', params);
  },

  // Get single product by slug
  async getProduct(slug) {
    if (!slug) {
      throw new Error('Product slug is required');
    }
    return api.get(`/products/${slug}`);
  },

  // Get product reviews
  async getProductReviews(slug, page = 1) {
    return api.get(`/products/${slug}/reviews`, { page });
  },

  // Add product review (requires authentication)
  async addReview(slug, reviewData) {
    const { rating, comment, title } = reviewData;
    
    if (!rating || rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    return api.post(`/products/${slug}/reviews`, {
      rating,
      comment,
      title
    });
  }
};

// services/cart.js
export const cartService = {
  // Get cart contents
  async getCart() {
    return api.get('/cart');
  },

  // Add item to cart
  async addToCart(productId, quantity = 1, variant = null) {
    return api.post('/cart', {
      product_id: productId,
      quantity,
      variant
    });
  },

  // Update cart item quantity
  async updateCartItem(itemId, quantity) {
    return api.put(`/cart/${itemId}`, { quantity });
  },

  // Remove item from cart
  async removeFromCart(itemId) {
    return api.delete(`/cart/${itemId}`);
  },

  // Clear entire cart
  async clearCart() {
    return api.delete('/cart');
  }
};
```

### Error Handling Standards

**Centralized Error Handler:**
```javascript
// utils/error-handler.js
export class ErrorHandler {
  static handle(error, context = '') {
    console.group(`🚨 Error in ${context || 'Application'}`);
    console.error('Error:', error.message);
    
    if (error instanceof APIError) {
      console.error('Status:', error.status);
      console.error('Details:', error.details);
      
      // Handle specific API errors
      switch (error.status) {
        case 401:
          this.handleUnauthorized();
          break;
        case 429:
          this.handleRateLimit();
          break;
        case 500:
          this.handleServerError();
          break;
      }
    }
    
    console.error('Stack:', error.stack);
    console.groupEnd();
    
    // Report to monitoring service
    this.reportError(error, context);
  }

  static handleUnauthorized() {
    // Clear stored tokens
    localStorage.removeItem('auth_token');
    
    // Redirect to login
    window.location.href = '/login';
  }

  static handleRateLimit() {
    // Show rate limit message
    this.showUserMessage('Too many requests. Please try again later.', 'warning');
  }

  static handleServerError() {
    // Show generic error message
    this.showUserMessage('Server error. Please try again.', 'error');
  }

  static showUserMessage(message, type = 'info') {
    // Implementation depends on your UI framework
    console.log(`${type.toUpperCase()}: ${message}`);
  }

  static reportError(error, context) {
    // Send error to monitoring service
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track('Error Occurred', {
        error: error.message,
        context,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
    }
  }
}

// Usage in components
try {
  const products = await productService.getProducts();
  setProducts(products.data);
} catch (error) {
  ErrorHandler.handle(error, 'ProductList Component');
}
```

## Documentation Standards

### Code Documentation

**JSDoc Comments:**
```javascript
/**
 * Fetches products from the Devaito API with optional filtering
 * @param {Object} filters - Filter options for products
 * @param {string} [filters.category] - Product category slug
 * @param {number} [filters.minPrice] - Minimum price filter
 * @param {number} [filters.maxPrice] - Maximum price filter
 * @param {string} [filters.search] - Search query
 * @param {number} [filters.page=1] - Page number for pagination
 * @param {number} [filters.limit=20] - Number of items per page
 * @returns {Promise<Object>} API response with products array
 * @throws {APIError} When API request fails
 * @example
 * // Get all products
 * const products = await getProducts();
 * 
 * // Get products with filters
 * const filteredProducts = await getProducts({
 *   category: 'electronics',
 *   minPrice: 100,
 *   maxPrice: 500
 * });
 */
async function getProducts(filters = {}) {
  // Implementation here
}
```

**README.md Template:**
```markdown
# Project Name

Brief description of your Devaito-powered application.

## Features

- 🛍️ Product catalog integration
- 🛒 Shopping cart functionality
- 👤 User authentication
- 💳 Payment processing
- 📱 Responsive design

## Prerequisites

- Node.js 16+ or PHP 8+
- Devaito API token
- Modern web browser

## Installation

```bash
# Clone repository
git clone https://github.com/yourusername/your-app.git
cd your-app

# Install dependencies
npm install  # or composer install

# Configure environment
cp .env.example .env
# Edit .env with your API keys
```

## Configuration

Add your Devaito API credentials to `.env`:

```bash
DEVAITO_API_URL=https://svelte.devaito.com
DEVAITO_API_TOKEN=your_bearer_token_here
DEVAITO_APP_ID=your_app_id
```

## Usage

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

## API Integration

This application uses the following Devaito APIs:

- **Products API**: Product catalog and details
- **Cart API**: Shopping cart management
- **Authentication API**: User login/signup
- **Payment Methods API**: Available payment options

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.
```

Following these code formats and conventions ensures your Devaito applications are maintainable, scalable, and integrate seamlessly with the platform's APIs and deployment system.