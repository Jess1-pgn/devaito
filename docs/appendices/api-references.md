# API References

## Overview
This section provides detailed references for Devaito v2.0 APIs, including endpoints, parameters, and usage examples.  
For a list of available APIs, see API List & Descriptions.

## API Structure
Devaito APIs follow RESTful conventions:

- **Base URL:** `https://admin.devaito.com/api`
- **Authentication:** Use Bearer tokens in the Authorization header (see Authentication API).
- **Formats:** JSON for requests and responses.

---

## Main Endpoints

### 1. Authentication API
- `POST /login` — User login, returns a token.
- `POST /logout` — Logout, invalidates the token.

### 2. User API
- `GET /user` — Get user and store information.

### 3. Products API
- `GET /fetch-all-products` — List all products.
- `GET /get-product/{slug}` — Get product details by slug.
- `GET /popular-products` — List popular products.

### 4. Orders API
- `GET /get-all-orders` — List all orders.

### 5. Categories API
- `GET /categories` — List categories.
- `POST /categories` — Create a category.
- `PUT /categories/{id}` — Update a category.
- `DELETE /categories/{id}` — Delete a category.
- `GET /fetch-categories` — List categories with images & slug.
- `GET /fetch-categories-product/{permalink}` — Products by category.

### 6. Campaigns API
- `GET /campaigns` — List campaigns.
- `POST /campaigns` — Create a campaign.
- `GET /campaigns/{id}` — Get campaign details.
- `PUT /campaigns/{id}` — Update a campaign.
- `DELETE /campaigns/{id}` — Delete a campaign.

### 7. Posts API
- `GET /posts` — List posts.
- `POST /posts` — Create a post.
- `GET /posts/{id}` — Get post details.
- `PUT /posts/{id}` — Update a post.
- `DELETE /posts/{id}` — Delete a post.
- `GET /posts/{id}/{job_id}` — Update job linked to a post.

### 8. Social Media APIs

#### a. Facebook API
- `GET /facebook/pages` — Get connected Facebook pages.
- `POST /facebook/publish-post` — Publish a post immediately.
- `POST /facebook/publish-post-job` — Schedule a post.

#### b. Instagram API
- `POST /instagram/publish-post` — Publish a post immediately.
- `POST /instagram/publish-post-job` — Schedule a post.

#### c. Platform Connections API
- `GET /platform-connections` — View connected social accounts.

### 9. Templates API
- `GET /templates` — List templates.
- `POST /templates` — Create a template.
- `GET /templates/{id}` — Get template details.
- `PUT /templates/{id}` — Update a template.
- `DELETE /templates/{id}` — Delete a template.

### 10. Platforms API
- `GET /platforms` — List platforms.
- `POST /platforms` — Create a platform.
- `GET /platforms/{id}` — Get platform details.
- `PUT /platforms/{id}` — Update a platform.
- `DELETE /platforms/{id}` — Delete a platform.

### 11. Resolutions API
- `GET /resolutions` — List resolutions.
- `POST /resolutions` — Create a resolution.
- `GET /resolutions/{id}` — Get resolution details.
- `PUT /resolutions/{id}` — Update a resolution.
- `DELETE /resolutions/{id}` — Delete a resolution.

### 12. Gallery & Media APIs
- `GET /gallery-store` — All store media.
- `GET /image-gallery` — Image gallery (paginated).
- `GET /video-gallery` — Video gallery (paginated).
- `POST /save-image` — Upload image.
- `POST /save-video` — Upload video.

### 13. Store Settings APIs
- `GET /get-store-prompt` — Get store description.
- `GET /get-store-language` — Get store language.
- `GET /fonts-and-colors` — Get configured fonts & colors.

### 14. Content Generator API
- `POST /content-generator` — Generate content via AI.

---

## Best Practices

- **Rate Limits:** Adhere to limits outlined in API Usage.
- **Error Handling:** Handle HTTP status codes (e.g., 429 for rate limits, 401 for auth errors).
- **Security:** Store tokens securely and rotate regularly.

## Troubleshooting

- **Authentication Errors:** Verify token validity (see Authentication API).
- **Invalid Requests:** Check parameter formats and required fields.
- **Rate Limit Issues:** Optimize request frequency or contact support for higher quotas.

For full API documentation, visit [https://admin.devaito.com/api/docs](https://admin.devaito.com/api/docs) or contact support@devaito.com.