# Troubleshooting Guide

Quick troubleshooting guide for common issues.

## Content Not Loading

### Check Browser Console

1. Open Developer Tools (F12 or Cmd+Option+I)
2. Go to **Console** tab
3. Look for errors or warnings
4. Add `?debug=true` to URL for detailed logs

### Verify Configuration

**For GitHub Pages:**
1. Check repository **Settings** → **Secrets and variables** → **Actions**
2. Verify `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` exist
3. Check workflow logs in **Actions** tab
4. Verify `config.js` is accessible at: `https://yourusername.github.io/portfolio/config.js`

**For Local Development:**
1. Verify `config.js` exists in project root
2. Check credentials match Contentful API keys
3. Ensure using `http://localhost:8000`, not `file://`

### Check Contentful

1. Log in to Contentful
2. Verify entries are **Published** (not just saved as draft)
3. Check **Settings** → **API keys**:
   - Space ID matches configuration
   - Access Token is **Content Delivery API** (not Management API)
   - Token is active (not revoked)

## Common Issues

| Issue | Solution |
|-------|----------|
| **CORS errors** | Use `http://localhost:8000`, not `file://` |
| **Empty content** | Ensure all entries are **Published** in Contentful |
| **API errors** | Verify Space ID and Access Token are correct |
| **Images not loading** | Check media assets are published and linked |
| **config.js 404** | Verify `.nojekyll` exists and workflow completed |
| **Social icons missing** | Use exact keys: `LinkedIn`, `GitHub`, `Medium` |

## Debug Mode

Add `?debug=true` to your URL for detailed console logs:
```
https://yourusername.github.io/portfolio/?debug=true
```

This shows:
- Contentful configuration status
- API request details
- Content loading process
- Error details

## Still Having Issues?

1. Check browser console for specific error messages
2. Review GitHub Actions workflow logs
3. Verify `config.js` content on deployed site
4. Test with `?debug=true` for detailed logs
5. See [CONTENTFUL.md](CONTENTFUL.md) for setup verification
