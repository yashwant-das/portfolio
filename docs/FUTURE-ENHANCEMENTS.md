# Future Enhancements

These ideas are intentionally non-blocking. Treat them as options for future product work, not as current requirements.

## Content Model

- Add optional validation rules for `heroStats` value formats, such as numeric values plus suffixes.
- Add structured project screenshots or thumbnails once real project assets are available.
- Add optional `featured` flags for projects so the first row can be curated without reordering the source data.

## Design And UX

- Add a compact project detail view or modal for deeper case-study content.
- Add a printable resume view generated from the same JSON content.
- Add stronger empty states for optional sections when content is intentionally omitted.

## Engineering

- Add JSON Schema validation as an automated script in `npm run validate`.
- Add accessibility automation with axe-core in Playwright.
- Add screenshot comparison for key responsive viewports once the design stabilizes.
- Split `css/style.css` into documented sections or a small token/component stylesheet structure if it grows further.

## Deployment

- Add a separate pull-request CI workflow that runs quality gates without deploying.
- Add dependency review and scheduled dependency audit workflows.
