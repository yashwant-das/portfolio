# Contentful Setup Guide

Complete guide for setting up Contentful CMS with this portfolio template.

## Quick Start

1. **Create Contentful Account**: Sign up at [contentful.com](https://www.contentful.com)
2. **Create Space**: Choose "Create an empty space" → Name it → Select "Free" plan
3. **Create Content Models**: Follow the content types below
4. **Get API Credentials**: Settings → API keys → Copy Space ID and create Access Token
5. **Configure**: Add credentials to GitHub Secrets (for deployment) or `config.js` (for local dev)

## Content Types

### 1. Portfolio (Single Entry)
**API ID**: `portfolio`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | Short text | Yes | Your full name |
| `subtitle` | Short text | Yes | Your job title |
| `email` | Short text | Yes | Your email address |
| `website` | Short text | No | Your website URL |
| `resume` | Short text | No | Resume PDF filename (e.g., "resume.pdf") |
| `about` | Rich text | Yes | About section content |
| `heroSummary` | Rich text | No | Hero section summary |
| `avatar` | Media | No | Profile picture (recommended: 800x800px) |
| `socials` | JSON Object | No | Social media links |

**Socials JSON Format:**
```json
{
  "LinkedIn": "https://linkedin.com/in/username",
  "GitHub": "https://github.com/username",
  "Medium": "https://medium.com/@username"
}
```

**With Custom Icons:**
```json
{
  "LinkedIn": {
    "url": "https://linkedin.com/in/username",
    "icon": "https://cdn.contentful.com/..."
  }
}
```

### 2. Experience (Multiple Entries)
**API ID**: `experience`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `role` | Short text | Yes | Job title |
| `company` | Short text | Yes | Company name |
| `period` | Short text | Yes | Format: "MM/YYYY — MM/YYYY · Location" |
| `logo` | Media | No | Company logo |
| `highlights` | Rich text | No | Use bullet lists for multiple items |

### 3. Project (Multiple Entries)
**API ID**: `project`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | Short text | Yes | Project title |
| `description` | Long text | Yes | Project description |
| `tags` | Rich text | No | Use bullet lists for multiple tags |
| `liveUrl` | Short text | No | Live demo URL |
| `codeUrl` | Short text | No | Source code URL |

### 4. Skill Category (Multiple Entries)
**API ID**: `skillCategory`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `categoryName` | Short text | Yes | Category name (e.g., "Test Automation & Frameworks") |
| `skills` | Rich text | Yes | Use bullet lists for multiple skills |

### 5. Education (Multiple Entries)
**API ID**: `education`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `degree` | Short text | Yes | Degree name |
| `school` | Short text | Yes | School name |
| `period` | Short text | No | Education period |

## Creating Content Types

1. Go to **Content model** (left sidebar)
2. Click **"Add content type"** (top right)
3. Enter **Name** and **API identifier** (auto-filled, lowercase)
4. Click **"Create"**
5. Add fields using **"+ Add field"** button
6. Configure each field:
   - **Short text**: For single-line text (name, email, role, etc.)
   - **Long text**: For multi-line text (description)
   - **Rich text**: For formatted text with lists (highlights, tags, skills)
   - **Media**: For images (avatar, logos)
   - **JSON Object**: For structured data (socials)
7. Set **Required** field as needed
8. Click **"Save"** (top right)

## Using Rich Text Lists

For fields that need multiple values (`highlights`, `tags`, `skills`):

1. Select **"Rich text"** field type
2. When editing entries, click the **bullet list icon** in the Rich text toolbar
3. Add each item as a separate list item
4. Press Enter to add new items

## Creating Content Entries

1. Go to **Content** (left sidebar)
2. Click **"Add entry"** (top right)
3. Select the content type
4. Fill in all required fields
5. **Link assets** (avatar, logos) from Media library
6. Click **"Publish"** (top right)

**Important**: Entries must be **Published** (not just saved) to appear on the website.

## Getting API Credentials

1. Go to **Settings** → **API keys**
2. Copy your **Space ID**
3. Click **"Add API key"** (top right)
4. **Name**: `Portfolio Website`
5. **Description**: `Read-only access for portfolio website`
6. **Environment**: `master`
7. Click **"Create access token"**
8. Copy the **Content Delivery API - access token**
9. **Important**: Save this token — you won't see it again

## Configuration

### For GitHub Pages Deployment

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add secrets:
   - `CONTENTFUL_SPACE_ID` → Your Space ID
   - `CONTENTFUL_ACCESS_TOKEN` → Your Access Token
3. (Optional) Add variable:
   - `CONTENTFUL_ENVIRONMENT` → `master` (defaults to `master` if not set)
4. Push to `main` branch or manually trigger workflow

The workflow automatically creates `config.js` during deployment.

### For Local Development

1. Copy the configuration template:
   ```bash
   cp config.example.js config.js
   ```

2. Edit `config.js`:
   ```javascript
   window.CONTENTFUL_CONFIG = {
     spaceId: 'YOUR_SPACE_ID',
     accessToken: 'YOUR_ACCESS_TOKEN',
     environment: 'master'
   };
   ```

3. Start a local server:
   ```bash
   python3 -m http.server 8000
   # or
   npx http-server -p 8000
   ```

4. Open `http://localhost:8000`

## Troubleshooting

### Content Not Loading

- **Check entries are published**: Entries must be **Published**, not just saved
- **Verify API credentials**: Check Space ID and Access Token are correct
- **Check browser console**: Look for errors (add `?debug=true` to URL for detailed logs)
- **For GitHub Pages**: Verify secrets are configured and workflow completed successfully

### Images Not Displaying

- Ensure media assets are **Published** in Contentful
- Verify assets are linked to entries correctly
- Check asset URLs in browser console

### Common Issues

| Issue | Solution |
|-------|----------|
| CORS errors | Use `http://localhost:8000`, not `file://` |
| Empty content | Ensure all entries are **Published** |
| API errors | Verify Space ID and Access Token |
| Social icons not showing | Use exact keys: `LinkedIn`, `GitHub`, `Medium` (case-sensitive) |

## Updating Content

1. Log in to Contentful
2. Navigate to **Content** → Select entry
3. Make changes
4. Click **Publish**
5. Changes appear immediately (no redeployment needed)

## Security Notes

- Content Delivery API token is **read-only** and safe to expose in client-side code
- Never commit `config.js` to version control (it's in `.gitignore`)
- For GitHub Pages, use GitHub Secrets (encrypted and secure)

