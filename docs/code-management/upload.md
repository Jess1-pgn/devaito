# Upload Methods

## Overview

Devaito v2.0 provides multiple flexible methods for uploading and managing your application code. Whether you're working on a simple website, a complex e-commerce application, or integrating with existing development workflows, we have upload options that fit your needs.

**Key Features:**
- Multiple upload methods to suit different workflows
- Automatic validation and preprocessing
- Version control integration
- Real-time deployment capabilities
- Secure file transfer protocols

## Method Comparison

| Method | Best For | Skill Level | Features |
|--------|----------|-------------|----------|
| Web Interface | Quick uploads, small projects | Beginner | Drag & drop, visual feedback |
| Git Integration | Team projects, CI/CD | Intermediate | Auto-deployment, version control |
| API Upload | Automated workflows, scripts | Advanced | Programmable, batch uploads |
| FTP/SFTP | Large files, legacy workflows | Intermediate | Direct file access, bulk transfer |
| CLI Tool | Developer workflows, automation | Advanced | Command-line integration, scripting |

## 1. Web Interface Upload

The web interface provides the most user-friendly way to upload your code with visual feedback and progress tracking.

### Getting Started

1. **Navigate to Upload Section**
   ```
   Dashboard → Your Application → Code Management → Upload
   ```

2. **Choose Upload Method**
   - Single file upload
   - Multiple file selection
   - Folder upload (Chrome/Edge)
   - Archive upload (.zip, .tar.gz, .rar)

### Single File Upload

**Step-by-step Process:**
1. Click "Choose File" or drag file to upload area
2. Select your file from the file browser
3. File validation occurs automatically
4. Click "Upload" to begin transfer
5. Monitor progress bar for completion status

**Example Usage:**
```html
<!-- Simple HTML file upload -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Devaito App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Welcome to My App</h1>
    <script src="app.js"></script>
</body>
</html>
```

### Folder Upload

**Browser Support:**
- Chrome 21+ ✅
- Firefox 50+ ✅
- Safari 14+ ✅
- Edge 79+ ✅

**How to Upload Folders:**
1. Drag entire project folder to upload area
2. Or click "Upload Folder" and select project directory
3. Review file structure preview
4. Confirm upload to proceed

**Project Structure Example:**
```
my-ecommerce-app/
├── index.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── app.js
│   │   ├── cart.js
│   │   └── products.js
│   └── images/
│       ├── logo.png
│       └── products/
├── api/
│   ├── auth.php
│   ├── products.php
│   └── cart.php
└── config/
    ├── database.php
    └── settings.php
```

### Archive Upload

**Supported Formats:**
- `.zip` (recommended)
- `.tar.gz`
- `.tar.bz2`
- `.rar`
- `.7z`

**Best Practices:**
- Compress your project at the root level
- Exclude unnecessary files (.git, node_modules, .DS_Store)
- Keep archive size under 500MB
- Use descriptive archive names

**Creating a Clean Archive:**
```bash
# Create a clean zip file
zip -r my-app.zip . -x "*.git*" "node_modules/*" ".DS_Store" "*.log"

# Or use tar
tar -czf my-app.tar.gz --exclude='.git' --exclude='node_modules' .
```

### Upload Limitations

**File Size Limits:**
- Single file: 100MB maximum
- Archive file: 500MB maximum
- Total project size: 2GB maximum
- Individual image: 50MB maximum

**File Type Restrictions:**
```javascript
// Allowed file extensions
const allowedExtensions = [
  // Web files
  '.html', '.htm', '.css', '.js', '.jsx', '.ts', '.tsx',
  '.vue', '.svelte', '.scss', '.sass', '.less',
  
  // Backend files
  '.php', '.py', '.rb', '.go', '.java', '.cs', '.cpp',
  '.c', '.h', '.hpp',
  
  // Configuration
  '.json', '.xml', '.yml', '.yaml', '.env', '.ini',
  '.conf', '.config',
  
  // Assets
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico',
  '.woff', '.woff2', '.ttf', '.eot', '.mp4', '.mp3',
  
  // Documentation
  '.md', '.txt', '.pdf'
];
```

## 2. Git Integration

Git integration provides seamless deployment from your version control repositories with automatic updates and collaboration features.

### GitHub Integration

**Initial Setup:**
1. Go to Application Settings → Git Integration
2. Click "Connect GitHub Account"
3. Authorize Devaito application access
4. Select repository and branch
5. Configure deployment settings

**Repository Configuration:**
```yaml
# .devaito.yml configuration file
version: "1.0"
build:
  commands:
    - npm install
    - npm run build
  output_directory: "dist"
  
deploy:
  branch: "main"
  auto_deploy: true
  
exclude:
  - "node_modules"
  - ".git"
  - "tests"
  - "*.log"
```

**Webhook Setup:**
```javascript
// GitHub webhook payload example
{
  "ref": "refs/heads/main",
  "repository": {
    "name": "my-ecommerce-app",
    "full_name": "username/my-ecommerce-app"
  },
  "commits": [
    {
      "id": "abc123",
      "message": "Add new product features",
      "author": {
        "name": "Developer Name",
        "email": "developer@example.com"
      }
    }
  ]
}
```

### GitLab Integration

**Setup Process:**
```bash
# 1. Generate GitLab access token
# Go to GitLab → User Settings → Access Tokens
# Create token with 'api' and 'read_repository' scopes

# 2. Configure in Devaito
# Settings → Git Integration → GitLab
# Enter repository URL: https://gitlab.com/username/project.git
# Add access token
```

**GitLab CI Integration:**
```yaml
# .gitlab-ci.yml
stages:
  - build
  - deploy

build:
  stage: build
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - dist/

deploy_to_devaito:
  stage: deploy
  script:
    - curl -X POST "https://svelte.devaito.com/api/deploy" 
      -H "Authorization: Bearer $DEVAITO_TOKEN"
      -F "project_id=$PROJECT_ID"
      -F "archive=@dist.zip"
  only:
    - main
```

### Bitbucket Integration

**Configuration Steps:**
1. Create App Password in Bitbucket settings
2. Add repository credentials in Devaito
3. Configure branch and deployment rules
4. Set up automatic deployment triggers

### Private Repository Access

**SSH Key Setup:**
```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -C "devaito-deploy"

# Add public key to your Git provider
# Add private key to Devaito dashboard
```

**HTTPS with Personal Access Token:**
```bash
# Clone with token
git clone https://username:token@github.com/username/repository.git

# Configure in Devaito
Repository URL: https://github.com/username/repository.git
Username: your-username
Password/Token: your-personal-access-token
```

### Branch Management

**Multi-branch Deployment:**
```javascript
// Branch configuration
const branchConfig = {
  "main": {
    "environment": "production",
    "auto_deploy": true,
    "domain": "myapp.devaito.com"
  },
  "staging": {
    "environment": "staging",
    "auto_deploy": true,
    "domain": "myapp-staging.devaito.com"
  },
  "development": {
    "environment": "dev",
    "auto_deploy": false,
    "domain": "myapp-dev.devaito.com"
  }
};
```

## 3. API Upload

The API upload method enables programmatic file uploads and automated deployment workflows.

### Authentication

**API Token Generation:**
```bash
# Generate API token in dashboard
Dashboard → Settings → API Keys → Generate New Token

# Token format
Bearer 11|xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Basic API Upload

**cURL Example:**
```bash
# Upload single file
curl -X POST "https://svelte.devaito.com/api/v1/upload" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@index.html" \
  -F "application_id=your-app-id" \
  -F "path=/public/index.html"

# Upload archive
curl -X POST "https://svelte.devaito.com/api/v1/upload" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -F "file=@project.zip" \
  -F "application_id=your-app-id" \
  -F "extract=true"
```

**Response Format:**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "file_id": "file_abc123",
    "filename": "index.html",
    "size": 2048,
    "path": "/public/index.html",
    "uploaded_at": "2025-01-15T10:30:00Z"
  }
}
```

### Programming Language Examples

**Python Upload Script:**
```python
import requests
import os
from pathlib import Path

class DevaitoUploader:
    def __init__(self, api_token, app_id):
        self.api_token = api_token
        self.app_id = app_id
        self.base_url = "https://svelte.devaito.com/api/v1"
        self.headers = {
            "Authorization": f"Bearer {api_token}"
        }
    
    def upload_file(self, file_path, remote_path=None):
        """Upload a single file"""
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")
        
        with open(file_path, 'rb') as file:
            files = {'file': file}
            data = {
                'application_id': self.app_id,
                'path': remote_path or f"/{os.path.basename(file_path)}"
            }
            
            response = requests.post(
                f"{self.base_url}/upload",
                headers=self.headers,
                files=files,
                data=data
            )
            
            return response.json()
    
    def upload_directory(self, directory_path, exclude_patterns=None):
        """Upload entire directory"""
        exclude_patterns = exclude_patterns or ['.git', 'node_modules', '.DS_Store']
        results = []
        
        for root, dirs, files in os.walk(directory_path):
            # Filter out excluded directories
            dirs[:] = [d for d in dirs if not any(pattern in d for pattern in exclude_patterns)]
            
            for file in files:
                if any(pattern in file for pattern in exclude_patterns):
                    continue
                
                file_path = os.path.join(root, file)
                relative_path = os.path.relpath(file_path, directory_path)
                
                try:
                    result = self.upload_file(file_path, f"/{relative_path}")
                    results.append(result)
                    print(f"Uploaded: {relative_path}")
                except Exception as e:
                    print(f"Failed to upload {relative_path}: {e}")
        
        return results

# Usage example
uploader = DevaitoUploader("your-api-token", "your-app-id")
uploader.upload_directory("./my-project")
```

**Node.js Upload Script:**
```javascript
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

class DevaitoUploader {
  constructor(apiToken, appId) {
    this.apiToken = apiToken;
    this.appId = appId;
    this.baseURL = 'https://svelte.devaito.com/api/v1';
    this.headers = {
      'Authorization': `Bearer ${apiToken}`
    };
  }

  async uploadFile(filePath, remotePath = null) {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    form.append('application_id', this.appId);
    form.append('path', remotePath || `/${path.basename(filePath)}`);

    try {
      const response = await axios.post(`${this.baseURL}/upload`, form, {
        headers: {
          ...this.headers,
          ...form.getHeaders()
        }
      });
      
      return response.data;
    } catch (error) {
      throw new Error(`Upload failed: ${error.response?.data?.message || error.message}`);
    }
  }

  async uploadArchive(archivePath) {
    const form = new FormData();
    form.append('file', fs.createReadStream(archivePath));
    form.append('application_id', this.appId);
    form.append('extract', 'true');

    try {
      const response = await axios.post(`${this.baseURL}/upload`, form, {
        headers: {
          ...this.headers,
          ...form.getHeaders()
        }
      });
      
      return response.data;
    } catch (error) {
      throw new Error(`Archive upload failed: ${error.response?.data?.message || error.message}`);
    }
  }
}

// Usage
const uploader = new DevaitoUploader('your-api-token', 'your-app-id');

// Upload single file
uploader.uploadFile('./index.html')
  .then(result => console.log('Upload successful:', result))
  .catch(error => console.error('Upload failed:', error));
```

### Batch Upload API

**Multiple File Upload:**
```bash
curl -X POST "https://svelte.devaito.com/api/v1/upload/batch" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -F "files[]=@file1.html" \
  -F "files[]=@file2.css" \
  -F "files[]=@file3.js" \
  -F "application_id=your-app-id"
```

**Response:**
```json
{
  "success": true,
  "message": "Batch upload completed",
  "data": {
    "uploaded": 2,
    "failed": 1,
    "results": [
      {
        "file": "file1.html",
        "success": true,
        "file_id": "file_123"
      },
      {
        "file": "file2.css", 
        "success": true,
        "file_id": "file_124"
      },
      {
        "file": "file3.js",
        "success": false,
        "error": "File type not supported"
      }
    ]
  }
}
```

## 4. FTP/SFTP Upload

FTP/SFTP provides direct file system access for bulk transfers and integration with existing workflows.

### SFTP Configuration

**Connection Details:**
```
Host: sftp.devaito.com
Port: 2022
Protocol: SFTP (SSH File Transfer Protocol)
Username: [Generated per application]
Password: [Generated per application]
Root Directory: /home/[app-id]/
```

**Obtaining Credentials:**
1. Navigate to Application Settings → FTP Access
2. Click "Generate SFTP Credentials"
3. Save credentials securely
4. Test connection using provided details

### Command Line SFTP

**Basic Connection:**
```bash
# Connect to SFTP server
sftp -P 2022 your-app-username@sftp.devaito.com

# Navigate and upload
cd /public
put index.html
put -r assets/
ls -la
quit
```

**Batch Upload Script:**
```bash
#!/bin/bash
# upload_to_devaito.sh

SFTP_HOST="sftp.devaito.com"
SFTP_PORT="2022"
SFTP_USER="your-app-username"
SFTP_PASS="your-app-password"
LOCAL_DIR="./build"
REMOTE_DIR="/public"

# Create batch command file
cat > sftp_commands.txt << EOF
cd $REMOTE_DIR
lcd $LOCAL_DIR
put -r *
quit
EOF

# Execute SFTP commands
sshpass -p "$SFTP_PASS" sftp -P $SFTP_PORT -b sftp_commands.txt $SFTP_USER@$SFTP_HOST

# Cleanup
rm sftp_commands.txt

echo "Upload completed successfully!"
```

### GUI FTP Clients

**FileZilla Configuration:**
```
Protocol: SFTP - SSH File Transfer Protocol
Host: sftp.devaito.com
Port: 2022
Logon Type: Normal
User: your-app-username
Password: your-generated-password
```

**WinSCP Configuration (Windows):**
```
File protocol: SFTP
Host name: sftp.devaito.com
Port number: 2022
User name: your-app-username
Password: your-generated-password
```

**Cyberduck Configuration (Mac):**
```
Connection: SFTP (SSH File Transfer Protocol)
Server: sftp.devaito.com
Port: 2022
Username: your-app-username
Password: your-generated-password
```

### Directory Structure

**SFTP Directory Layout:**
```
/home/your-app-id/
├── public/           # Web-accessible files
│   ├── index.html
│   ├── assets/
│   └── api/
├── private/          # Private files (configs, logs)
├── logs/            # Application logs
├── backups/         # Automatic backups
└── temp/            # Temporary files
```

**File Permissions:**
- Public files: 644 (readable by web server)
- Directories: 755 (executable/searchable)
- Scripts: 755 (if executable)
- Private files: 600 (owner only)

## 5. CLI Tool Upload

The Devaito CLI provides powerful command-line tools for developers who prefer terminal-based workflows.

### Installation

**NPM Installation:**
```bash
# Install globally
npm install -g @devaito/cli

# Or install locally in project
npm install --save-dev @devaito/cli
```

**Python Installation:**
```bash
# Using pip
pip install devaito-cli

# Using pipx (recommended)
pipx install devaito-cli
```

**Manual Installation:**
```bash
# Download binary (Linux/Mac)
curl -L https://releases.devaito.com/cli/latest/devaito-linux -o /usr/local/bin/devaito
chmod +x /usr/local/bin/devaito

# Windows PowerShell
Invoke-WebRequest -Uri "https://releases.devaito.com/cli/latest/devaito-windows.exe" -OutFile "devaito.exe"
```

### Initial Setup

**Authentication:**
```bash
# Login with credentials
devaito login

# Or use API token
devaito auth --token "your-api-token"

# Verify authentication
devaito whoami
```

**Project Initialization:**
```bash
# Initialize in existing project
cd your-project
devaito init

# Create new project
devaito create my-new-app
cd my-new-app
```

### Basic Commands

**Upload Commands:**
```bash
# Upload current directory
devaito upload

# Upload specific files
devaito upload index.html styles.css

# Upload with environment specification
devaito upload --env production

# Upload and deploy immediately
devaito upload --deploy

# Upload with exclusions
devaito upload --exclude "node_modules,*.log,.git"
```

**Advanced Upload Options:**
```bash
# Upload with progress bar
devaito upload --progress

# Upload with verification
devaito upload --verify

# Dry run (show what would be uploaded)
devaito upload --dry-run

# Upload compressed
devaito upload --compress

# Upload with custom remote path
devaito upload --path "/custom/path" file.html
```

### Configuration File

**devaito.config.js:**
```javascript
module.exports = {
  // Application configuration
  app: {
    id: 'your-app-id',
    name: 'My Devaito App',
    environment: 'production'
  },
  
  // Upload configuration
  upload: {
    exclude: [
      'node_modules/**',
      '.git/**',
      '*.log',
      '.DS_Store',
      'tests/**'
    ],
    include: [
      'public/**',
      'api/**',
      'index.html',
      'package.json'
    ],
    compress: true,
    verify: true
  },
  
  // Build configuration
  build: {
    command: 'npm run build',
    outputDir: 'dist',
    beforeUpload: [
      'npm install',
      'npm run test'
    ]
  },
  
  // Deployment configuration
  deploy: {
    beforeDeploy: ['npm run build'],
    afterDeploy: ['npm run cleanup']
  }
};
```

### Watch Mode

**Auto-upload on Changes:**
```bash
# Watch current directory
devaito watch

# Watch specific files/directories
devaito watch src/ public/

# Watch with custom ignore patterns
devaito watch --ignore "*.tmp,*.log"

# Watch with debounce (wait 2 seconds after changes)
devaito watch --debounce 2000
```

### Scripting and Automation

**GitHub Actions Integration:**
```yaml
name: Deploy to Devaito
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - name: Install dependencies
        run: npm install
        
      - name: Build project
        run: npm run build
        
      - name: Install Devaito CLI
        run: npm install -g @devaito/cli
        
      - name: Deploy to Devaito
        env:
          DEVAITO_TOKEN: ${{ secrets.DEVAITO_TOKEN }}
        run: |
          devaito auth --token $DEVAITO_TOKEN
          devaito upload --deploy
```

**Jenkins Pipeline:**
```groovy
pipeline {
    agent any
    
    environment {
        DEVAITO_TOKEN = credentials('devaito-token')
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'npm install -g @devaito/cli'
                sh 'devaito auth --token $DEVAITO_TOKEN'
                sh 'devaito upload --deploy'
            }
        }
    }
}
```

## Upload Monitoring & Logs

### Real-time Progress

**Web Interface Monitoring:**
- Real-time progress bars
- File-by-file status updates
- Error notifications with details
- Upload speed and ETA display

**CLI Progress Monitoring:**
```bash
# Verbose output
devaito upload --verbose

# Progress with file details
devaito upload --progress --details

# JSON output for parsing
devaito upload --output json
```

### Upload Logs

**Accessing Upload History:**
```bash
# View recent uploads
devaito logs upload --limit 10

# View specific upload details
devaito logs upload --id upload_abc123

# Filter by date
devaito logs upload --since "2025-01-01"

# Export logs
devaito logs upload --export logs.json
```

**Log Format:**
```json
{
  "upload_id": "upload_abc123",
  "timestamp": "2025-01-15T10:30:00Z",
  "method": "web_interface",
  "status": "completed",
  "files_uploaded": 15,
  "files_failed": 0,
  "total_size": "2.3MB",
  "duration": "45s",
  "errors": []
}
```

## Troubleshooting Common Issues

### Connection Problems

**Issue: Cannot connect to upload server**
```bash
# Test connectivity
curl -I https://svelte.devaito.com

# Check DNS resolution
nslookup svelte.devaito.com

# Test SFTP connection
telnet sftp.devaito.com 2022
```

### Authentication Errors

**Issue: Invalid API token**
```bash
# Verify token format
echo "Bearer 11|your-token-here"

# Test token validity
curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://svelte.devaito.com/api/v1/user

# Regenerate token if needed
# Dashboard → Settings → API Keys → Regenerate
```

### File Upload Failures

**Issue: File too large**
- Solution: Compress files or split large uploads
- Use archive format for multiple files
- Consider SFTP for very large files

**Issue: Invalid file type**
- Check allowed extensions list
- Rename files if necessary
- Use generic extensions (.txt for text files)

### Performance Issues

**Slow Upload Speeds:**
```bash
# Test upload speed
devaito upload --test-speed

# Use compression
devaito upload --compress

# Upload during off-peak hours
# Use multiple parallel connections (SFTP)
```

For additional support, contact our technical team or check the FAQ section.