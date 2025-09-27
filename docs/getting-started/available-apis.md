# Available APIs

> **Don’t worry if this list looks long or complicated!**  
> You don’t need to use every API right away.  
> Just start with the ones you need for your project, and come back to this list whenever you want to add new features.  
> Each API is explained with its purpose, so you can pick what fits your needs step by step.  
> If you need more details, you’ll find further explanations in the **API Management** section.

Below is the list of all APIs available on Devaito (SaaS multi-tenant version):

---

## 1. Authentication API
- `/login`
- `/logout`

## 2. User API
- `/user`

## 3. Products API
- `/fetch-all-products`
- `/get-product/{slug}`
- `/popular-products`

## 4. Orders API
- `/get-all-orders`

## 5. Categories API
- `/categories` (GET, POST, PUT, DELETE)
- `/categories/{id}`
- `/fetch-categories`
- `/fetch-categories-product/{permalink}`

## 6. Campaigns API
- `/campaigns` (GET, POST)
- `/campaigns/{id}` (GET, PUT, DELETE)

## 7. Posts API
- `/posts` (GET, POST)
- `/posts/{id}` (GET, PUT, DELETE)
- `/posts/{id}/{job_id}`

## 8. Social Media APIs

### a. Facebook API
- `/facebook/pages`
- `/facebook/publish-post`
- `/facebook/publish-post-job`

### b. Instagram API
- `/instagram/publish-post`
- `/instagram/publish-post-job`

### c. Platform Connections API
- `/platform-connections`

## 9. Templates API
- `/templates` (GET, POST)
- `/templates/{id}` (GET, PUT, DELETE)

## 10. Platforms API
- `/platforms` (GET, POST)
- `/platforms/{id}` (GET, PUT, DELETE)

## 11. Resolutions API
- `/resolutions` (GET, POST)
- `/resolutions/{id}` (GET, PUT, DELETE)

## 12. Gallery & Media APIs
- `/gallery-store`
- `/image-gallery`
- `/video-gallery`
- `/save-image`
- `/save-video`

## 13. Store Settings APIs
- `/get-store-prompt`
- `/get-store-language`
- `/fonts-and-colors`

## 14. Content Generator API
- `/content-generator`