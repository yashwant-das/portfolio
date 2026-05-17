# Personal Portfolio - Yashwant Das

[![Deployment](https://github.com/yashwant-das/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/yashwant-das/portfolio/actions/workflows/deploy.yml)
[![Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://yashwant-das.github.io/portfolio/)

A modern, minimal portfolio website built with TypeScript and vanilla CSS, following Apple-inspired design principles.

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
- **Logic**: Vanilla TypeScript (Strict Mode)
- **Data**: JSON
- **Tooling**: TypeScript Compiler (`tsc`), npm
- **Hosting**: GitHub Pages

## 💻 Local Development

To run the project locally for maintenance or updates:

```bash
# Install reproducible dependencies from package-lock.json
npm ci

# Start TypeScript watcher in one terminal
npm run watch

# Start a local development server in another terminal
python3 -m http.server 8000

# Open http://localhost:8000
```

### Quality Gates & Testing

To maintain high code quality and functional reliability, the following gates are implemented:

```bash
# Run all checks (Types, Lint, and Tests)
npm run validate

# Run individual checks
npm run build    # Compile TypeScript for production
npm run check    # Type validation
npm run lint     # Code quality and style
npm run format:check # Formatting check
npm run audit    # High-severity dependency audit
npm test         # Playwright E2E tests
npm run format   # Auto-format codebase
```

### JSON Data Validation

The content in `data/content.json` is validated against a JSON Schema (`data/schema.json`). This provides real-time validation and autocompletion in your code editor.

### Design Handoff

The current visual system and implementation contract are documented in [`DESIGN-HANDOFF.md`](DESIGN-HANDOFF.md), with a machine-readable map in [`DESIGN-MANIFEST.json`](DESIGN-MANIFEST.json). Use these files as the source of truth for future design changes.

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
├── package.json        # Project config and scripts
├── tsconfig.json       # TypeScript configuration (base)
├── eslint.config.mjs   # Linting rules (v9+)
├── playwright.config.ts # E2E test configuration
├── src/                # TypeScript source files
│   ├── main.ts         # Entry point
│   ├── render.ts       # DOM manipulation
│   ├── theme.ts        # Theme management
│   └── types.ts        # Interface definitions
├── dist/               # Generated JavaScript output (ignored; created by npm run build)
├── tests/              # Playwright E2E tests
├── css/                # Stylesheets
├── data/               # Site content & JSON Schema
├── assets/             # Media and images
├── DESIGN-HANDOFF.md   # Visual system and design implementation contract
├── DESIGN-MANIFEST.json # Machine-readable design map
├── AGENTS.md           # AI agent operating guide
└── .github/            # GitHub Actions CI/CD
```

## Future Enhancements

See [`docs/FUTURE-ENHANCEMENTS.md`](docs/FUTURE-ENHANCEMENTS.md) for scoped, non-blocking improvements that preserve the current architecture and design contract.

## ⚖️ License

© 2024 Yashwant Das. All Rights Reserved.

This repository contains my personal portfolio. The design, content, and media assets are my intellectual property. Unauthorized use, reproduction, or distribution is strictly prohibited.
