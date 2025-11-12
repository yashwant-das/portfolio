# Contentful Quick Setup Guide

**Quick reference** for Contentful content models. For detailed step-by-step instructions, see [CONTENTFUL_GUIDE.md](CONTENTFUL_GUIDE.md).

## Content Types to Create

### 1. Portfolio (Single Entry)
- **Content Type ID**: `portfolio`
- **Fields**:
  - `name` - Short text
  - `subtitle` - Short text  
  - `email` - Short text
  - `website` - Short text (Optional) - Your website URL
  - `resume` - Short text (Optional) - Resume PDF filename (e.g., "resume.pdf")
  - `about` - Rich text (Long text)
  - `heroSummary` - Rich text (Long text) - Hero section summary
  - `avatar` - Media (Image)
  - `socials` - JSON Object
    - **Simple format**: `{"LinkedIn": "url", "GitHub": "url"}`
    - **With custom icons**: `{"LinkedIn": {"url": "url", "icon": "icon-url"}}`
    - Default icons are provided for LinkedIn, GitHub, Medium. Upload custom icons to Contentful Media library and reference them in the icon field.

### 2. Experience (Multiple Entries)
- **Content Type ID**: `experience`
- **Fields**:
  - `role` - Short text
  - `company` - Short text
  - `period` - Short text (e.g., "04/2021 — 06/2024 · Bengaluru, India")
  - `logo` - Media (Image) - Optional
  - `highlights` - Rich text (use bullet lists for multiple items)

### 3. Project (Multiple Entries)
- **Content Type ID**: `project`
- **Fields**:
  - `title` - Short text
  - `description` - Long text
  - `tags` - Rich text (use bullet lists for multiple items)
  - `liveUrl` - Short text - Optional
  - `codeUrl` - Short text - Optional

### 4. Skill Category (Multiple Entries)
- **Content Type ID**: `skillCategory`
- **Fields**:
  - `categoryName` - Short text (e.g., "Test Automation & Frameworks")
  - `skills` - Rich text (use bullet lists for multiple items)

### 5. Education (Multiple Entries)
- **Content Type ID**: `education`
- **Fields**:
  - `degree` - Short text
  - `school` - Short text
  - `period` - Short text - Optional

## Getting Your API Credentials

1. Go to **Settings** → **API keys** in Contentful
2. Copy your **Space ID**
3. Create a new **Content Delivery API** access token (read-only)
4. Copy the **Access Token**

## Configuration

1. Copy `config.example.js` to `config.js`
2. Fill in your credentials:
   ```javascript
   window.CONTENTFUL_CONFIG = {
     spaceId: 'YOUR_SPACE_ID',
     accessToken: 'YOUR_ACCESS_TOKEN',
     environment: 'master'
   };
   ```

## Important Notes

- All entries must be **Published** (not just saved as draft) to appear on the website
- Asset URLs are automatically resolved from Contentful's CDN
- Experience entries are automatically sorted by date (most recent first)
- Skills are grouped by category automatically

