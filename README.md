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
     - `about` (Long text) - About section content
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

### Option 1: Using GitHub Actions (Recommended)

1. **The workflow file is already included** (`.github/workflows/deploy.yml`)

2. **Add `config.js` to repository**:
   - Create `config.js` with your Contentful credentials (see Setup section)
   - Since `config.js` is in `.gitignore` (for local development safety), force-add it:
     ```bash
     git add -f config.js
     git commit -m "Add Contentful configuration"
     git push
     ```
   - **Note**: The Content Delivery API token is read-only and safe to expose in client-side code

3. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Under "Build and deployment", select source: **GitHub Actions**
   - The workflow will automatically deploy on every push to `main` branch

4. **Your site will be available at**: `https://YOUR_USERNAME.github.io/portfolio/`

### Option 2: Manual Deployment

1. **Add `config.js` to repository** (required for GitHub Pages):
   - Create `config.js` with your Contentful credentials (see Setup section)
   - Since `config.js` is in `.gitignore` (for local development safety), force-add it:
     ```bash
     git add -f config.js
     git commit -m "Add Contentful configuration"
     git push
     ```
   - **Note**: The Content Delivery API token is read-only and safe to expose in client-side code

2. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Select source branch: **main** (or your default branch)
   - Select folder: **/ (root)**
   - Click **Save**

3. **Your site will be available at**: `https://YOUR_USERNAME.github.io/portfolio/`

### Option 3: Using Environment Variables (Advanced)

For production deployments, you can set Contentful credentials as environment variables and inject them during build. This requires a build step.

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
├── config.js           # Contentful credentials (not in git)
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
2. **Verify `config.js`** exists and has correct credentials
3. **Check Contentful**:
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
- `config.js` is excluded from version control via `.gitignore`

## License

This portfolio template is open source and available for personal use.

## Support

For issues or questions:
- Check Contentful documentation: https://www.contentful.com/developers/docs/
- Review GitHub Pages documentation: https://docs.github.com/pages

