Roles & Permissions
Overview
In Devaito v2.0, roles and permissions define what actions collaborators can perform within an application. This section explains the available roles, their associated permissions, and how to manage them effectively to ensure secure and efficient collaboration.
Available Roles
Devaito provides the following predefined roles for collaborators:



Role
Description



Admin
Full access to all application features, including management of collaborators, API keys, and deployments.


Developer
Access to code upload, validation, and debugging, with limited management capabilities.


Tester
Access to testing and validation features, with read-only access to code and configurations.


Viewer
Read-only access to application details, status, and logs, with no modification rights.


Permissions Breakdown
Each role is associated with specific permissions, as outlined below:

Admin:

Add/remove collaborators (see Adding/Removing Collaborators).
Manage API keys and permissions (see API Keys & Permissions).
Deploy applications (see Deployment).
Edit application settings, code, and configurations.
View all logs, statuses, and reports.


Developer:

Upload and manage code (see Code Upload & Management).
Run validation and testing scripts (see Validation & Testing).
Debug applications (see Debugging).
View application status and logs.
Cannot manage collaborators or API keys.


Tester:

Run validation and testing scripts.
View test results and application status.
Read-only access to code and configurations.
Cannot modify code, deploy applications, or manage collaborators.


Viewer:

View application status, logs, and configurations.
Cannot modify any settings, code, or collaborator roles.



Managing Roles
To assign or modify a collaborator’s role:

Navigate to Collaborator Management:

Go to the "My Applications" section and select the relevant application.
Access the "Collaborators" tab (see Adding/Removing Collaborators).


Edit Role:

Locate the collaborator in the list.
Click "Edit Role" or a similar option next to their name.
Select the new role from the dropdown menu (e.g., Admin, Developer).
Save changes to update the collaborator’s permissions.


Verify Changes:

Confirm the role update in the collaborator list.
Notify the collaborator if their permissions have changed significantly.



Best Practices

Least Privilege Principle: Assign the lowest level of access necessary for a collaborator’s tasks. For example, use Viewer for team members who only need to monitor progress.
Regular Role Reviews: Periodically audit collaborator roles to ensure they align with current responsibilities.
Clear Communication: Inform collaborators about their role’s capabilities and limitations when adding them (see Team Best Practices).
Role Transitions: When changing roles (e.g., Developer to Admin), ensure the collaborator is aware of new responsibilities.

Troubleshooting

Permission Denied Errors: Verify the collaborator’s role matches their intended actions. For example, only Admins can manage API keys.
Role Not Updating: Ensure you have Admin rights to modify roles. If issues persist, contact Devaito support.
Unexpected Access: If a collaborator has incorrect permissions, check for overlapping roles or misconfigurations in the collaborator settings.

For further assistance, refer to Frequently Asked Questions or contact Devaito support at support@devaito.com.