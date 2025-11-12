# QA Engineer Portfolio

A modern, Apple-inspired portfolio website template. Content is managed through Contentful CMS (or fallback JSON) and deployed to GitHub Pages. Fully reusable with zero hardcoded data.

## Features

- **Contentful CMS Integration**: All content is managed through Contentful, allowing easy updates without code changes
- **Apple-Inspired Design**: Clean, minimal design following Apple's Human Interface Guidelines
- **Responsive**: Fully responsive design that works on all devices
- **Dark Mode**: Built-in dark mode support with system preference detection
- **GitHub Pages Ready**: Optimized for static hosting on GitHub Pages

## Setup

### 1. Contentful Setup

> **Quick Start**: For a quick reference, see [CONTENTFUL_SETUP.md](CONTENTFUL_SETUP.md). For detailed step-by-step instructions, see [CONTENTFUL_GUIDE.md](CONTENTFUL_GUIDE.md).

1. **Create a Contentful Account**
   - Sign up at [contentful.com](https://www.contentful.com)
   - Create a new space (free tier is sufficient)

2. **Create Content Models**

   Create the following content types in your Contentful space:

   #### Portfolio (Single Entry)
   - **API ID**: `portfolio`
   - **Fields**:
     - `name` (Short text) - Your full name
     - `subtitle` (Short text) - Your job title
     - `email` (Short text) - Your email address
     - `website` (Short text, Optional) - Your website URL
     - `resume` (Short text, Optional) - Resume PDF filename (e.g., "resume.pdf")
     - `about` (Rich text) - About section content
     - `heroSummary` (Rich text, Optional) - Hero section summary
     - `avatar` (Media) - Profile picture
     - `socials` (JSON Object) - Social media links
       - **Simple format**: `{"LinkedIn": "https://linkedin.com/in/...", "GitHub": "https://github.com/..."}`
       - **With custom icons**: `{"LinkedIn": {"url": "https://linkedin.com/in/...", "icon": "https://cdn.contentful.com/..."}}`
       - **Note**: Use exact keys (LinkedIn, GitHub, Medium) for automatic icon matching. Custom icons override defaults.

   #### Experience (Multiple Entries)
   - **API ID**: `experience`
   - **Fields**:
     - `role` (Short text) - Job title
     - `company` (Short text) - Company name
     - `period` (Short text) - Employment period (e.g., "04/2021 — 06/2024 · Bengaluru, India")
     - `logo` (Media) - Company logo
     - `highlights` (Rich text) - Achievement highlights (use bullet lists)

   #### Project (Multiple Entries)
   - **API ID**: `project`
   - **Fields**:
     - `title` (Short text) - Project title
     - `description` (Long text) - Project description
     - `tags` (Rich text) - Technology tags (use bullet lists)
     - `liveUrl` (Short text) - Live demo URL (optional)
     - `codeUrl` (Short text) - Source code URL (optional)

   #### Skill Category (Multiple Entries)
   - **API ID**: `skillCategory`
   - **Fields**:
     - `categoryName` (Short text) - Category name (e.g., "Test Automation & Frameworks")
     - `skills` (Rich text) - List of skills in this category (use bullet lists)

   #### Education (Multiple Entries)
   - **API ID**: `education`
   - **Fields**:
     - `degree` (Short text) - Degree name
     - `school` (Short text) - School name
     - `period` (Short text) - Education period (optional)

3. **Get API Credentials**
   - Go to **Settings** → **API keys**
   - Copy your **Space ID**
   - Create a new **Content Delivery API** access token (read-only)
   - Copy the **Access Token**

4. **Populate Content**
   - Create entries for each content type
   - Upload assets (avatar, logos) to the Media library
   - Link assets to entries where needed
   - Publish all entries

### 2. Configure the Website

1. **Copy the configuration template**:
   ```bash
   cp config.example.js config.js
   ```

2. **Edit `config.js`** with your Contentful credentials:
   ```javascript
   window.CONTENTFUL_CONFIG = {
     spaceId: 'YOUR_SPACE_ID',
     accessToken: 'YOUR_CONTENT_DELIVERY_API_ACCESS_TOKEN',
     environment: 'master'
   };
   ```

3. **Important**: `config.js` is in `.gitignore` and will not be committed to version control. This keeps your credentials secure.

### 3. Local Development

1. **Start a local server** (required for Contentful API calls):
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js
   npx http-server -p 8000
   
   # Using PHP
   php -S localhost:8000
   ```

2. **Open in browser**: `http://localhost:8000`

3. The site will fetch content from Contentful and display it. If Contentful is not configured or unavailable, it will automatically fall back to `fallback-data.json`.

## Deployment to GitHub Pages

### Using GitHub Actions (Recommended)

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically deploys your site to GitHub Pages.

#### Setup Steps

1. **Configure GitHub Secrets** (for Contentful integration):
   - Go to your repository **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret** and add:
     - **Name**: `CONTENTFUL_SPACE_ID`
     - **Value**: Your Contentful Space ID (from Contentful Settings → API keys)
   - Click **New repository secret** again and add:
     - **Name**: `CONTENTFUL_ACCESS_TOKEN`
     - **Value**: Your Content Delivery API access token (read-only)
   - (Optional) Go to **Variables** tab and add:
     - **Name**: `CONTENTFUL_ENVIRONMENT`
     - **Value**: `master` (or your custom environment name)
     - If not set, defaults to `master`

2. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Under "Build and deployment", select source: **GitHub Actions**
   - The workflow will automatically deploy on every push to `main` branch

3. **Deploy**:
   - Push any commit to the `main` branch, or
   - Manually trigger the workflow: **Actions** → **Deploy to GitHub Pages** → **Run workflow**

4. **Your site will be available at**: `https://YOUR_USERNAME.github.io/portfolio/`

#### How It Works

- The workflow automatically creates `config.js` from GitHub Secrets during deployment
- If secrets are not configured, the site will use `fallback-data.json` instead
- No need to commit `config.js` to the repository (it's in `.gitignore` for security)
- The Content Delivery API token is read-only and safe to expose in client-side code

#### Manual Deployment (Alternative)

If you prefer not to use GitHub Actions:

1. **Create `config.js` locally** with your Contentful credentials (see Local Development section)
2. **Force-add `config.js`** to the repository:
   ```bash
   git add -f config.js
   git commit -m "Add Contentful configuration"
   git push
   ```
3. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Select source branch: **main** (or your default branch)
   - Select folder: **/ (root)**
   - Click **Save**

## Content Management

### Content Sources

The website uses a **two-tier content system**:

1. **Primary**: Contentful CMS (when configured)
2. **Fallback**: `fallback-data.json` (used when Contentful is unavailable or not configured)

All content is loaded dynamically via JavaScript. The HTML file contains only the structure and semantic markup for SEO and accessibility.

### Editing Fallback Content

To update the fallback content (used when Contentful is unavailable), edit `fallback-data.json`:

```json
{
  "name": "Your Name",
  "subtitle": "Your Title",
  "email": "your@email.com",
  "website": "https://yourwebsite.com",
  "resume": "your-resume.pdf",
  "avatar": "assets/avatar.svg",
  "about": "Your about text...",
  "heroSummary": "Your hero summary...",
  "experience": [...],
  "projects": [...],
  "skills": {...},
  "education": [...],
  "socials": {...}
}
```

**Note**: The `website` and `resume` fields are optional. If `resume` is provided, the "Download Resume" button will be displayed. The logo mark (initials) is automatically generated from the `name` field.

### Media Assets

All media assets (images, icons) are managed in Contentful's Media library:

- **Avatar**: Upload your profile picture and link it to the Portfolio entry's `avatar` field
- **Company Logos**: Upload company logos and link them to Experience entries' `logo` field
- **Social Icons**: 
  - Default icons are provided automatically for LinkedIn, GitHub, and Medium
  - For custom icons, upload SVG or PNG files to Contentful Media library
  - Reference them in the `socials` JSON object: `{"LinkedIn": {"url": "...", "icon": "https://cdn.contentful.com/..."}}`
  - Or use the full CDN URL from Contentful's asset details page

All assets are automatically served from Contentful's CDN with optimized URLs.

### Updating Content

1. Log in to your Contentful space
2. Navigate to **Content** → Select the entry you want to edit
3. Make your changes
4. Click **Publish**
5. Changes will appear on your website immediately (no redeployment needed)

### Adding New Content

- **New Experience**: Create a new `experience` entry
- **New Project**: Create a new `project` entry
- **New Skill Category**: Create a new `skillCategory` entry
- **New Education**: Create a new `education` entry

All entries are automatically fetched and displayed on the website.

## File Structure

```
portfolio/
├── index.html          # Main HTML file (minimal structure, content loaded via JS)
├── styles.css          # Stylesheet
├── script.js           # JavaScript (Contentful integration + fallback JSON loader)
├── fallback-data.json  # Fallback content (used when Contentful unavailable)
├── config.js           # Contentful credentials (local dev only, not in git)
├── .nojekyll           # Disables Jekyll processing on GitHub Pages
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions deployment workflow
├── config.example.js   # Configuration template
├── .gitignore          # Git ignore rules
├── README.md           # This file
└── assets/
    ├── avatar.svg      # Fallback avatar (if Contentful unavailable)
    └── logos/          # Fallback company logos (if Contentful unavailable)
```

## Troubleshooting

### Content Not Loading

1. **Check browser console** for errors
2. **For GitHub Pages**:
   - Verify GitHub Secrets are configured correctly (`CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN`)
   - Check workflow logs in **Actions** tab to see if `config.js` was created successfully
   - Verify `config.js` is accessible at `https://YOUR_USERNAME.github.io/portfolio/config.js`
3. **For local development**:
   - Verify `config.js` exists and has correct credentials
4. **Check Contentful**:
   - Ensure entries are published (not just saved as draft)
   - Verify API token has read permissions
   - Check Space ID is correct

### CORS Errors

- Contentful CDA API supports CORS, but ensure you're accessing via `http://` or `https://`, not `file://`
- Use a local server for development (see Local Development section)

### Assets Not Displaying

- Ensure assets are uploaded to Contentful Media library
- Verify assets are linked to entries correctly
- Check that assets are published

## Security Notes

- The Content Delivery API token is **read-only** and safe to expose in client-side code
- Never commit your Content Management API token (used for writing content)
- **For GitHub Pages deployment**: Use GitHub Secrets to store credentials securely. The workflow automatically creates `config.js` during deployment without exposing secrets in logs or repository
- **For local development**: `config.js` is excluded from version control via `.gitignore` to prevent accidental commits
- GitHub Secrets are encrypted and only accessible to GitHub Actions workflows

## License

This portfolio template is open source and available for personal use.

## Support

For issues or questions:
- Check Contentful documentation: https://www.contentful.com/developers/docs/
- Review GitHub Pages documentation: https://docs.github.com/pages

