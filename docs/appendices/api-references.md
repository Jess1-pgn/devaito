API References
Overview
This section provides detailed references for Devaito v2.0 APIs, including endpoints, parameters, and usage examples. For a list of available APIs, see API List & Descriptions.
API Structure
Devaito APIs follow RESTful conventions:

Base URL: https://api.devaito.com/v2
Authentication: Use API keys in the Authorization header (see API Keys & Permissions).
Formats: JSON for requests and responses.

Common Endpoints

GET /applications: List all applications for the authenticated user.
Parameters: limit, offset
Example: curl -H "Authorization: Bearer <API_KEY>" https://api.devaito.com/v2/applications


POST /applications: Create a new application.
Body: { "name": "MyApp", "description": "Test app" }
Example: curl -X POST -H "Authorization: Bearer <API_KEY>" -d '{"name":"MyApp"}' https://api.devaito.com/v2/applications


GET /applications/{id}/status: Check application status.
Example: curl -H "Authorization: Bearer <API_KEY>" https://api.devaito.com/v2/applications/123/status


POST /webhooks: Create a webhook.
Body: { "url": "https://example.com/webhook", "event": "deployment" }
Example: See Automations & Webhooks.



Best Practices

Rate Limits: Adhere to limits outlined in API Usage.
Error Handling: Handle HTTP status codes (e.g., 429 for rate limits, 401 for auth errors).
Security: Store API keys securely and rotate regularly.

Troubleshooting

Authentication Errors: Verify API key validity (see API Keys & Permissions).
Invalid Requests: Check parameter formats and required fields.
Rate Limit Issues: Optimize request frequency or contact support for higher quotas.

For full API documentation, visit https://api.devaito.com/docs or contact support@devaito.com.