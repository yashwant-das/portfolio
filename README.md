# Portfolio Website Template

[![Deploy to GitHub Pages](https://github.com/yashwant-das/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/yashwant-das/portfolio/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen)](https://yashwant-das.github.io/portfolio/)
[![Open Source](https://img.shields.io/badge/Open%20Source-Yes-success)](https://github.com/yashwant-das/portfolio)

A modern, Apple-inspired portfolio website template with Contentful CMS integration. Fully responsive, dark mode support, and optimized for GitHub Pages deployment.

## Features

- **Contentful CMS Integration** - Manage all content through Contentful without code changes
- **Apple-Inspired Design** - Clean, minimal design following Apple's Human Interface Guidelines
- **Fully Responsive** - Works seamlessly on all devices
- **Dark Mode** - Built-in dark mode with system preference detection
- **GitHub Pages Ready** - Automated deployment via GitHub Actions
- **Zero Hardcoded Data** - All content loaded dynamically

## Quick Start

### 1. Contentful Setup

See [CONTENTFUL.md](CONTENTFUL.md) for complete setup instructions.

**Quick steps:**
1. Create account at [contentful.com](https://www.contentful.com)
2. Create space and content models (see CONTENTFUL.md)
3. Get API credentials (Space ID and Access Token)
4. Configure GitHub Secrets or local `config.js`

### 2. Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Copy configuration template
cp config.example.js config.js

# Edit config.js with your Contentful credentials
# (See CONTENTFUL.md for details)

# Start local server
python3 -m http.server 8000
# or
npx http-server -p 8000

# Open http://localhost:8000
```

### 3. GitHub Pages Deployment

1. **Configure GitHub Secrets**:
   - Go to repository **Settings** → **Secrets and variables** → **Actions**
   - Add `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN`

2. **Enable GitHub Pages**:
   - Go to **Settings** → **Pages**
   - Select source: **GitHub Actions**

3. **Deploy**:
   - Push to `main` branch or manually trigger workflow
   - Site available at `https://yourusername.github.io/portfolio/`

## Content Management

### Content Sources

- **Primary**: Contentful CMS (when configured)
- **Fallback**: `data/fallback-data.json` (when Contentful unavailable)

### Updating Content

1. Log in to Contentful
2. Edit entries in **Content** section
3. Click **Publish**
4. Changes appear immediately (no redeployment needed)

### Adding New Content

- **Experience**: Create new `experience` entry
- **Projects**: Create new `project` entry
- **Skills**: Create new `skillCategory` entry
- **Education**: Create new `education` entry

## File Structure

```
portfolio/
├── index.html          # Main HTML structure
├── styles.css          # Stylesheet
├── script.js           # Contentful integration & content loader
├── config.example.js   # Configuration template
├── .nojekyll           # Disables Jekyll processing
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions workflow
├── data/
│   └── fallback-data.json  # Fallback content
├── assets/             # Images, logos, avatars
│   ├── avatars/        # Profile avatars
│   └── logos/          # Company logos
├── CONTENTFUL.md        # Complete Contentful setup guide
└── DEBUGGING.md        # Troubleshooting guide
```

## Documentation

- **[CONTENTFUL.md](CONTENTFUL.md)** - Complete Contentful setup guide
- **[DEBUGGING.md](DEBUGGING.md)** - Troubleshooting and debugging

## Troubleshooting

### Content Not Loading

1. Check browser console for errors (add `?debug=true` to URL for detailed logs)
2. Verify Contentful entries are **Published** (not just saved)
3. Check API credentials are correct
4. For GitHub Pages: Verify secrets are configured and workflow completed

### Common Issues

- **CORS errors**: Use `http://localhost:8000`, not `file://`
- **Empty content**: Ensure entries are **Published** in Contentful
- **Images not loading**: Verify media assets are published and linked correctly

See [DEBUGGING.md](DEBUGGING.md) for detailed troubleshooting.

## Security

- Content Delivery API token is **read-only** and safe to expose client-side
- `config.js` is excluded from version control (`.gitignore`)
- GitHub Secrets are encrypted and only accessible to workflows

## License

Open source - available for personal use.
