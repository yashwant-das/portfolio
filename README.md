# Personal Portfolio - Yashwant Das

[![Deployment](https://github.com/yashwant-das/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/yashwant-das/portfolio/actions/workflows/deploy.yml)
[![Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://yashwant-das.github.io/portfolio/)

A modern, minimal portfolio website built with vanilla JavaScript and CSS, following Apple-inspired design principles.

## 🚀 Overview

This repository contains the source code for my personal portfolio website. It is designed to be lightweight, performant, and easy to maintain using a decoupled data approach.

### Key Features
- **Apple-Inspired Aesthetics**: Clean typography, subtle gradients, and smooth micro-animations.
- **Dynamic Content**: Powered by a local JSON data source for easy updates without touching the HTML.
- **Responsive & Accessible**: Optimized for all screen sizes and follows accessibility best practices.
- **Dark Mode**: Automatic system preference detection with a manual toggle.
- **Automated Deployment**: Integrated with GitHub Actions for seamless updates to GitHub Pages.

## 🛠️ Technology Stack
- **Structure**: HTML5
- **Styling**: Vanilla CSS3 (Liquid Glass effects, CSS Grid/Flexbox)
- **Logic**: Modern JavaScript (ES6+)
- **Data**: JSON
- **Hosting**: GitHub Pages

## 💻 Local Development

To run the project locally for maintenance or updates:

```bash
# Start a local development server
python3 -m http.server 8000

# Open http://localhost:8000
```

## 📝 Content Management

All profile data, experience, and project details are managed in:
`data/content.json`

To update the site content, simply modify the JSON fields. The changes will be reflected immediately upon refresh (when running locally) or after the next deployment.

### Assets
- **Avatars**: Store profile photos in `assets/avatars/`.
- **Logos**: Store company/project logos in `assets/logos/`.

## 🚀 Deployment

The site is automatically deployed to GitHub Pages whenever changes are pushed to the `main` branch via the [GitHub Actions workflow](.github/workflows/deploy.yml).

## 📁 Project Structure

```
portfolio/
├── index.html          # Main entry point
├── css/
│   └── style.css       # Core styles
├── js/
│   └── main.js         # UI logic and content loader
├── data/
│   └── content.json    # Site content source
├── assets/             # Media and images
│   ├── avatars/        # Profile photos
│   └── logos/          # Project/Company logos
└── .github/
    └── workflows/
        └── deploy.yml  # Automated deployment
```

## ⚖️ License

© 2024 Yashwant Das. All Rights Reserved.

This repository contains my personal portfolio. The design, content, and media assets are my intellectual property. Unauthorized use, reproduction, or distribution is strictly prohibited.
