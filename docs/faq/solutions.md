Common Solutions
Overview
This section provides solutions to common issues encountered while using Devaito v2.0, from login problems to deployment errors. For additional questions, see Frequently Asked Questions.
Account and Login Issues
Problem: Unable to log in due to incorrect credentials.Solution: 

Verify your email and password.
Use the "Forgot Password" link to reset your password (see Creation / Login).
Clear browser cache or try incognito mode.
Contact support@devaito.com if the issue persists.

Problem: Account locked after multiple failed login attempts.Solution: Wait 15 minutes or contact support to unlock your account.
Application Management
Problem: Deployment fails with a generic error.Solution: 

Check logs in Application Status.
Ensure code passes validation (see Validation & Testing).
Verify integration settings (see Specific Integrations).

Problem: Application is stuck in "Pending" status.Solution: 

Refresh the dashboard or check server status.
Restart the deployment process (see Deployment).
Contact support if unresolved after 30 minutes.

API Issues
Problem: API requests return "401 Unauthorized."Solution: 

Verify the API key is correct and active (see API Keys & Permissions).
Check key permissions align with the API endpoint.
Regenerate the key if compromised.

Problem: API rate limit exceeded.Solution: 

Review rate limits in API Usage.
Optimize requests or request a higher quota from support.

Code and Debugging
Problem: Code upload fails validation.Solution: 

Review validation errors in Validation & Testing.
Ensure code follows Code Formats & Conventions.
Use debugging tools (see Debugging).

Problem: Integration with GitHub not syncing.Solution: 

Verify OAuth token and repository settings (see Specific Integrations).
Check webhook configuration (see Automations & Webhooks).

Collaboration
Problem: Collaborator cannot access application features.Solution: 

Confirm their role in Roles & Permissions.
Ensure they’ve accepted the invitation (see Adding/Removing Collaborators).
Reassign the role if needed.

Problem: Too many collaborators added.Solution: Remove unnecessary collaborators (see Adding/Removing Collaborators).
Advanced Features
Problem: Webhook not delivering to external service.Solution: 

Verify the webhook URL and payload format (see Automations & Webhooks).
Check external service logs for errors.
Test with a simple payload to isolate issues.

Problem: CI/CD pipeline fails at the testing stage.Solution: 

Review test scripts in Validation & Testing.
Check pipeline configuration in CI/CD.
Ensure sufficient resources are allocated.

Still Stuck?
Refer to Frequently Asked Questions for more insights or contact Devaito support at support@devaito.com. Additional resources are available in External Resources.