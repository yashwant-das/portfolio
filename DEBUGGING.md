# Debugging Guide: Contentful Not Loading

If your site is falling back to `fallback-data.json` instead of loading Contentful data, follow these steps:

## Step 1: Check Browser Console

1. Open your deployed site (e.g., `https://yashwant-das.github.io/portfolio/`)
2. Open browser Developer Tools (F12 or Cmd+Option+I)
3. Go to the **Console** tab
4. Look for messages starting with `[WARN]` or `[INFO]`

**What to look for:**
- `[WARN] Contentful not configured:` - This means `config.js` is missing or has empty values
- `[INFO] Contentful configured:` - This means config is loaded correctly

## Step 2: Verify GitHub Secrets

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Check if these secrets exist:
   - `CONTENTFUL_SPACE_ID` ✅
   - `CONTENTFUL_ACCESS_TOKEN` ✅

**If secrets are missing:**
- Click **New repository secret**
- Add `CONTENTFUL_SPACE_ID` with your Contentful Space ID
- Add `CONTENTFUL_ACCESS_TOKEN` with your Content Delivery API token
- After adding secrets, **re-run the workflow** or push a new commit

## Step 3: Check Workflow Logs

1. Go to your repository → **Actions** tab
2. Click on the latest workflow run
3. Expand the **"Create config.js from secrets"** step
4. Look for these messages:
   - `✅ Contentful secrets found! Creating config.js with credentials...` - Good!
   - `⚠️ Warning: CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN secrets are not set` - Secrets missing!

**If secrets are missing:**
- The workflow will create an empty `config.js` with empty values
- This causes the site to fall back to JSON

## Step 4: Verify config.js is Accessible

1. Open your deployed site
2. Navigate to: `https://YOUR_USERNAME.github.io/portfolio/config.js`
3. You should see the config file content

**What you should see:**
```javascript
window.CONTENTFUL_CONFIG = {
  spaceId: 'your-space-id',
  accessToken: 'your-access-token',
  environment: 'master'
};
```

**If you see empty values:**
```javascript
window.CONTENTFUL_CONFIG = {
  spaceId: '',
  accessToken: '',
  environment: 'master'
};
```
This means GitHub Secrets are not configured.

**If you get a 404:**
- Check that `.nojekyll` file exists in your repository
- Verify the workflow completed successfully

## Step 5: Verify Contentful Configuration

1. Log in to Contentful
2. Go to **Settings** → **API keys**
3. Verify:
   - Space ID matches what you put in GitHub Secrets
   - Access Token is a **Content Delivery API** token (not Management API)
   - Token is **active** (not revoked)

## Step 6: Check Contentful Content

1. In Contentful, go to **Content**
2. Verify all entries are **Published** (not just saved as draft)
3. Check that you have:
   - At least one `portfolio` entry
   - At least one `experience` entry (optional but recommended)
   - Other content types as needed

## Common Issues

### Issue: Secrets are set but still falling back

**Solution:**
- Re-run the workflow after adding secrets (or push a new commit)
- Secrets are only read during workflow execution
- Check workflow logs to verify secrets were read correctly

### Issue: config.js shows empty values

**Solution:**
- Verify secrets are spelled correctly: `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN`
- Check that secrets are added to the correct repository
- Re-run the workflow

### Issue: config.js returns 404

**Solution:**
- Verify `.nojekyll` file exists in repository root
- Check workflow completed successfully
- Wait a few minutes for GitHub Pages to update

### Issue: Contentful API errors in console

**Solution:**
- Verify Space ID is correct
- Verify Access Token is correct and active
- Check that entries are published in Contentful
- Verify environment name (default is `master`)

## Quick Test

Add `?debug=true` to your URL to enable debug logging:
```
https://yashwant-das.github.io/portfolio/?debug=true
```

This will show detailed logs in the console about Contentful configuration and API calls.

## Still Having Issues?

1. Check the browser console for specific error messages
2. Check GitHub Actions workflow logs
3. Verify `config.js` content on the deployed site
4. Test with `?debug=true` for detailed logs

