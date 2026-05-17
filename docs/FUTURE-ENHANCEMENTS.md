# Future Enhancements

These ideas are intentionally non-blocking. Treat them as options for future product work, not as current requirements.

## Content Model

- Add optional validation rules for `heroStats` value formats, such as numeric values plus suffixes.
- Add structured project screenshots or thumbnails once real project assets are available.

## Design And UX

- Add a compact project detail view or modal for deeper case-study content.
- Add a printable resume view generated from the same JSON content.
- Integrate a robust contact form (e.g., Formspree or Netlify Forms) to replace the `mailto:` link and prevent bot scraping, while maintaining the Apple-inspired aesthetic.

## Engineering

- Add screenshot comparison for key responsive viewports once the design stabilizes.
- Split `css/style.css` into documented sections or a small token/component stylesheet structure if it grows further.
- Consider migrating to a lightweight build tool (like Vite) for automatic asset hashing and cache-busting, if the zero-dependency architecture is ever outgrown.

## Deployment

- Add dependency review and scheduled dependency audit workflows.
