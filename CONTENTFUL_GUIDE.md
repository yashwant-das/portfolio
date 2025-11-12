# Complete Contentful Setup Guide (with Field Types)

## Part 1: Account and Space Setup

### Step 1: Create Contentful Account
1. Go to [contentful.com](https://www.contentful.com)
2. Click "Get started" or "Sign up"
3. Sign up with email or Google/GitHub
4. Verify your email if required

### Step 2: Create a Space
1. After login, click "Create space"
2. Choose "Create an empty space"
3. Name it (e.g., "Portfolio")
4. Select "Free" plan
5. Click "Create space"

---

## Part 2: Create Content Models

### Content Model 1: Portfolio

1. Go to **Content model** (left sidebar)
2. Click **"Add content type"** (top right)
3. **Name**: `Portfolio`
4. **API identifier**: `portfolio` (auto-filled, lowercase)
5. **Description**: "Main portfolio information" (optional)
6. Click **"Create"**

#### Add Fields to Portfolio:

**Field 1: Name**
- Click **"+ Add field"**
- In the modal, click **"Text"** (icon with capital 'T')
- **Field name**: `Name`
- **API identifier**: `name` (auto-filled)
- Click **"Create and configure"**
- **Required**: Yes
- Click **"Save"**

**Field 2: Subtitle**
- Click **"+ Add field"**
- Click **"Text"**
- **Field name**: `Subtitle`
- **API identifier**: `subtitle`
- Click **"Create and configure"**
- **Required**: Yes
- Click **"Save"**

**Field 3: Email**
- Click **"+ Add field"**
- Click **"Text"**
- **Field name**: `Email`
- **API identifier**: `email`
- Click **"Create and configure"**
- **Required**: Yes
- Click **"Save"**

**Field 4: Website**
- Click **"+ Add field"**
- Click **"Text"**
- **Field name**: `Website`
- **API identifier**: `website`
- Click **"Create and configure"**
- **Required**: No (optional)
- Click **"Save"**

**Field 5: Resume**
- Click **"+ Add field"**
- Click **"Text"**
- **Field name**: `Resume`
- **API identifier**: `resume`
- Click **"Create and configure"**
- **Required**: No (optional)
- **Help text**: "Resume PDF filename (e.g., 'resume.pdf')" (optional)
- Click **"Save"**

**Field 6: About**
- Click **"+ Add field"**
- Click **"Rich text"** (recommended for formatting)
- **Field name**: `About`
- **API identifier**: `about`
- Click **"Create and configure"**
- **Required**: Yes
- Click **"Save"**

**Field 7: Hero Summary**
- Click **"+ Add field"**
- Click **"Rich text"**
- **Field name**: `Hero Summary`
- **API identifier**: `heroSummary`
- Click **"Create and configure"**
- **Required**: No (optional)
- Click **"Save"**

**Field 8: Avatar**
- Click **"+ Add field"**
- Click **"Media"** (icon with picture frame and mountain)
- **Field name**: `Avatar`
- **API identifier**: `avatar`
- Click **"Create and configure"**
- **Required**: No (can add later)
- **Allowed media types**: Select "Images" (optional)
- Click **"Save"**

**Field 9: Socials**
- Click **"+ Add field"**
- Click **"JSON object"** (icon with curly braces `{}`)
- **Field name**: `Socials`
- **API identifier**: `socials`
- Click **"Create and configure"**
- **Required**: No
- Click **"Save"**

**Save the Content Type:**
- Click **"Save"** (top right corner)

---

### Content Model 2: Experience

1. Click **"Add content type"**
2. **Name**: `Experience`
3. **API identifier**: `experience`
4. **Description**: "Work experience entries"
5. Click **"Create"**

#### Add Fields to Experience:

**Field 1: Role**
- Click **"+ Add field"**
- Click **"Text"**
- **Field name**: `Role`
- **API identifier**: `role`
- Click **"Create and configure"**
- **Required**: Yes
- Click **"Save"**

**Field 2: Company**
- Click **"+ Add field"**
- Click **"Text"**
- **Field name**: `Company`
- **API identifier**: `company`
- Click **"Create and configure"**
- **Required**: Yes
- Click **"Save"**

**Field 3: Period**
- Click **"+ Add field"**
- Click **"Text"**
- **Field name**: `Period`
- **API identifier**: `period`
- Click **"Create and configure"**
- **Required**: Yes
- **Help text**: "Format: MM/YYYY — MM/YYYY · Location" (optional)
- Click **"Save"**

**Field 4: Logo**
- Click **"+ Add field"**
- Click **"Media"**
- **Field name**: `Logo`
- **API identifier**: `logo`
- Click **"Create and configure"**
- **Required**: No
- **Allowed media types**: Select "Images" (optional)
- Click **"Save"**

**Field 5: Highlights**
- Click **"+ Add field"**
- Click **"Rich text"** (icon with document and lines)
- **Field name**: `Highlights`
- **API identifier**: `highlights`
- Click **"Create and configure"**
- **Required**: No
- Click **"Save"**
- **Note**: When editing entries, use the bullet list icon to add multiple highlights

**Save the Content Type:**
- Click **"Save"** (top right)

---

### Content Model 3: Project

1. Click **"Add content type"**
2. **Name**: `Project`
3. **API identifier**: `project`
4. Click **"Create"**

#### Add Fields to Project:

**Field 1: Title**
- Click **"+ Add field"**
- Click **"Text"**
- **Field name**: `Title`
- **API identifier**: `title`
- Click **"Create and configure"**
- **Required**: Yes
- Click **"Save"**

**Field 2: Description**
- Click **"+ Add field"**
- Click **"Text"** (or **"Rich text"** for formatting)
- **Field name**: `Description`
- **API identifier**: `description`
- Click **"Create and configure"**
- **Required**: Yes
- Click **"Save"**

**Field 3: Tags**
- Click **"+ Add field"**
- Click **"Rich text"** (icon with document and lines)
- **Field name**: `Tags`
- **API identifier**: `tags`
- Click **"Create and configure"**
- **Required**: No
- Click **"Save"**
- **Note**: When editing entries, use the bullet list icon to add multiple tags

**Field 4: Live URL**
- Click **"+ Add field"**
- Click **"Text"**
- **Field name**: `Live URL`
- **API identifier**: `liveUrl`
- Click **"Create and configure"**
- **Required**: No
- Click **"Save"**

**Field 5: Code URL**
- Click **"+ Add field"**
- Click **"Text"**
- **Field name**: `Code URL`
- **API identifier**: `codeUrl`
- Click **"Create and configure"**
- **Required**: No
- Click **"Save"**

**Save the Content Type:**
- Click **"Save"**

---

### Content Model 4: Skill Category

1. Click **"Add content type"**
2. **Name**: `Skill Category`
3. **API identifier**: `skillCategory`
4. Click **"Create"**

#### Add Fields to Skill Category:

**Field 1: Category Name**
- Click **"+ Add field"**
- Click **"Text"**
- **Field name**: `Category Name`
- **API identifier**: `categoryName`
- Click **"Create and configure"**
- **Required**: Yes
- Click **"Save"**

**Field 2: Skills**
- Click **"+ Add field"**
- Click **"Rich text"** (icon with document and lines)
- **Field name**: `Skills`
- **API identifier**: `skills`
- Click **"Create and configure"**
- **Required**: Yes
- Click **"Save"**
- **Note**: When editing entries, use the bullet list icon to add multiple skills

**Save the Content Type:**
- Click **"Save"**

---

### Content Model 5: Education

1. Click **"Add content type"**
2. **Name**: `Education`
3. **API identifier**: `education`
4. Click **"Create"**

#### Add Fields to Education:

**Field 1: Degree**
- Click **"+ Add field"**
- Click **"Text"**
- **Field name**: `Degree`
- **API identifier**: `degree`
- Click **"Create and configure"**
- **Required**: Yes
- Click **"Save"**

**Field 2: School**
- Click **"+ Add field"**
- Click **"Text"**
- **Field name**: `School`
- **API identifier**: `school`
- Click **"Create and configure"**
- **Required**: Yes
- Click **"Save"**

**Field 3: Period**
- Click **"+ Add field"**
- Click **"Text"**
- **Field name**: `Period`
- **API identifier**: `period`
- Click **"Create and configure"**
- **Required**: No
- Click **"Save"**

**Save the Content Type:**
- Click **"Save"**

---

## Part 3: Upload Media Assets

### Upload Avatar
1. Go to **Media** (left sidebar)
2. Click **"Add asset"** (top right)
3. Upload your avatar image (recommended: square, 800x800px)
4. **Title**: `Avatar`
5. **Description**: (optional)
6. Click **"Publish"**

### Upload Company Logos
1. Click **"Add asset"**
2. Upload each company logo
3. **Title**: e.g., `Tech Corp Logo`
4. Click **"Publish"**
5. Repeat for each logo

---

## Part 4: Create Content Entries

### How to Use Rich Text Lists

When editing Rich text fields (`highlights`, `tags`, `skills`):

1. **Click in the Rich text field** - You'll see a toolbar appear
2. **Click the bullet list icon** - This creates a bulleted list
3. **Type your first item** and press Enter
4. **Type your second item** and press Enter
5. **Continue adding items** - Each Enter creates a new list item
6. **To finish**, click outside the field or press Enter twice

**Example for Highlights:**
```
- Led QA & Test Automation for Pilot Flying J...
- Directed quality strategy, execution...
- Built scalable Playwright frameworks...
```

**Visual Guide:**
- Look for the toolbar icons: **B** (bold), *I* (italic), bullet list icon, **1.** (numbered list)
- The bullet list icon is usually in the middle of the toolbar
- After clicking it, you'll see a bullet appear, then start typing

---

### Create Portfolio Entry

1. Go to **Content** (left sidebar)
2. Click **"Add entry"** (top right)
3. Select **"Portfolio"**
4. Fill in the fields:
   - **Name**: `John Doe`
   - **Subtitle**: `Senior QA Automation Engineer`
   - **Email**: `john.doe@example.com`
   - **Website**: `https://github.com/johndoe` (optional)
   - **Resume**: `resume.pdf` (optional)
   - **About**: `Experienced Quality Assurance Engineer specializing in test automation frameworks and CI/CD integration. Passionate about building scalable testing solutions that improve software quality and accelerate delivery cycles.`
   - **Hero Summary**: `I design and implement comprehensive test automation strategies that enable teams to ship high-quality software with confidence.` (optional)
   - **Avatar**: Click **"Link existing asset"** → Select your avatar
   - **Socials**: Click the JSON editor and paste:
     ```json
     {
       "LinkedIn": "https://linkedin.com/in/johndoe",
       "GitHub": "https://github.com/johndoe",
       "Medium": "https://medium.com/@johndoe"
     }
     ```
5. Click **"Publish"** (top right)

---

### Create Experience Entries

**Experience Entry 1:**
1. Click **"Add entry"** → Select **"Experience"**
2. Fill in:
   - **Role**: `QA Lead`
   - **Company**: `Tech Corp`
   - **Period**: `01/2023 — Present · San Francisco, CA`
   - **Logo**: Click **"Link existing asset"** → Select company logo
   - **Highlights**: Click the **bullet list icon** in the Rich text editor, then add each highlight as a list item:
     - `Led test automation initiatives for multiple product teams, reducing manual testing effort by 60%.`
     - `Established CI/CD pipelines integrating automated tests, improving release velocity and quality.`
3. Click **"Publish"**

**Experience Entry 2:**
1. Click **"Add entry"** → Select **"Experience"**
2. Fill in:
   - **Role**: `Senior QA Engineer`
   - **Company**: `Startup Inc`
   - **Period**: `06/2020 — 12/2022 · Remote`
   - **Logo**: Link company logo
   - **Highlights**: Add all highlights
3. Click **"Publish"**

Repeat for additional experience entries.

---

### Create Project Entries

**Project Entry 1:**
1. Click **"Add entry"** → Select **"Project"**
2. Fill in:
   - **Title**: `Test Automation Framework`
   - **Description**: `Comprehensive test automation framework supporting web, API, and mobile testing with parallel execution and detailed reporting.`
   - **Tags**: Click the **bullet list icon** in the Rich text editor, then add each tag as a list item:
     - `Playwright`
     - `TypeScript`
     - `Allure`
   - **Live URL**: (leave empty or add URL)
   - **Code URL**: (leave empty or add URL)
3. Click **"Publish"**

**Project Entry 2:**
1. Click **"Add entry"** → Select **"Project"**
2. Fill in:
   - **Title**: `Visual Regression Testing Tool`
   - **Description**: `Custom visual regression testing solution for pixel-perfect UI validation across multiple browsers and devices.`
   - **Tags**: Click the **bullet list icon** and add: `Percy`, `BrowserStack`, `Visual Testing`
3. Click **"Publish"**

**Project Entry 3:**
1. Click **"Add entry"** → Select **"Project"**
2. Fill in:
   - **Title**: `API Testing Suite`
   - **Description**: `Automated API testing suite with contract testing, performance monitoring, and comprehensive test coverage.`
   - **Tags**: Click the **bullet list icon** and add: `REST Assured`, `Postman`, `API Testing`
3. Click **"Publish"**

---

### Create Skill Category Entries

**Skill Category Entry 1:**
1. Click **"Add entry"** → Select **"Skill Category"**
2. Fill in:
   - **Category Name**: `Test Automation & Frameworks`
   - **Skills**: Click the **bullet list icon** in the Rich text editor, then add each skill as a list item:
     - `Selenium`
     - `Playwright`
     - `Appium`
     - `WebdriverIO`
     - `Cypress`
     - `Puppeteer`
     - `UI Automator`
     - `Cucumber`
     - `BDD`
     - `TestNG`
     - `JUnit`
     - `Jest`
     - `Unittest`
     - `FitNesse`
     - `REST Assured`
     - `WireMock`
3. Click **"Publish"**

**Skill Category Entry 2:**
1. Click **"Add entry"** → Select **"Skill Category"**
2. Fill in:
   - **Category Name**: `CI/CD & DevOps`
   - **Skills**: Click the **bullet list icon** and add all CI/CD skills as list items
3. Click **"Publish"**

**Continue for all categories:**
- `Media QC & Streaming`
- `Performance & Security`
- `UI/UX & Debugging`
- `Platforms & Devices`
- `Programming Languages`
- `Test Management`

---

### Create Education Entry

1. Click **"Add entry"** → Select **"Education"**
2. Fill in:
   - **Degree**: `Bachelor of Science in Computer Science`
   - **School**: `University Name`
   - **Period**: `2016 — 2020` (optional)
3. Click **"Publish"**

---

## Part 5: Get API Credentials

1. Go to **Settings** (left sidebar) → **API keys**
2. Copy your **Space ID** (e.g., `abc123xyz`)
3. Click **"Add API key"** (top right)
4. **Name**: `Portfolio Website`
5. **Description**: `Read-only access for portfolio website`
6. **Environment**: `master`
7. Click **"Create access token"**
8. Copy the **Content Delivery API - access token** (starts with something like `abc123...`)
9. **Important**: Save this token — you won't see it again

---

## Part 6: Configure Your Website

1. In your project folder, copy the config template:
   ```bash
   cp config.example.js config.js
   ```

2. Open `config.js` and fill in:
   ```javascript
   window.CONTENTFUL_CONFIG = {
     spaceId: 'YOUR_SPACE_ID_HERE',
     accessToken: 'YOUR_ACCESS_TOKEN_HERE',
     environment: 'master'
   };
   ```

3. Replace:
   - `YOUR_SPACE_ID_HERE` with your Space ID
   - `YOUR_ACCESS_TOKEN_HERE` with your Access Token

---

## Part 7: Test Locally

1. Start a local server:
   ```bash
   python3 -m http.server 8000
   ```
   Or:
   ```bash
   npx http-server -p 8000
   ```

2. Open `http://localhost:8000` in your browser

3. Open browser console (F12) and check:
   - No errors about Contentful
   - Content loads from Contentful
   - If you see "Contentful not configured", check `config.js`

---

## Quick Field Type Reference

| Field Name | Field Type | Notes |
|------------|------------|-------|
| name, subtitle, email, role, company, period, title, categoryName, degree, school | **Text** | Single line text |
| about, description | **Text** (or Rich text) | Can use Rich text for formatting |
| avatar, logo | **Media** | Images/files |
| socials | **JSON object** | JSON data |
| highlights, tags, skills | **Rich text** | Use bullet lists for multiple items |

---

## Field Type Selection Guide

When you click **"+ Add field"**, you'll see a modal with these options:

### Available Field Types:

1. **Rich text** - Text formatting with references and media
   - Use for: Formatted text with links, bold, etc. (optional)

2. **Text** - Titles, names, paragraphs, list of names
   - Use for: Most text fields (name, subtitle, email, role, company, etc.)
   - Enable "Multiple values" for: highlights, tags, skills

3. **Number** - ID, order number, rating, quantity
   - Not used in this setup

4. **Date and time** - Event dates
   - Not used in this setup

5. **Location** - Coordinates: latitude and longitude
   - Not used in this setup

6. **Media** - Images, videos, PDFs and other files
   - Use for: avatar, logo fields

7. **Boolean** - Yes or no, 1 or 0, true or false
   - Not used in this setup

8. **JSON object** - Data in JSON format
   - Use for: socials field

9. **Reference** - For example, a blog post can reference its author(s)
   - Not used in this setup

---

## Important Notes

### Using Rich Text for Lists
For fields that need multiple values (`highlights`, `tags`, `skills`):
1. Select **"Rich text"** field type (not "Text")
2. When editing entries, click the **bullet list icon** in the Rich text toolbar
3. Add each item as a separate list item
4. The code will automatically extract list items and convert them to arrays

### Media Field Configuration
For media fields (`avatar`, `logo`):
1. Select **"Media"** field type
2. Click **"Create and configure"**
3. Optionally restrict to **"Images"** only
4. This ensures only image files can be uploaded

### JSON Object Field
For the `socials` field:
1. Select **"JSON object"** field type
2. When editing entries, you'll see a JSON editor
3. Paste your JSON directly into the editor

---

## Common Issues and Solutions

### Issue: Content not appearing
- **Solution**: Ensure all entries are **Published** (not just saved as draft)

### Issue: Images not loading
- **Solution**: Ensure media assets are **Published**

### Issue: API errors in console
- **Solution**: Verify Space ID and Access Token in `config.js`

### Issue: CORS errors
- **Solution**: Use `http://localhost:8000`, not `file://`

### Issue: Social icons not showing
- **Solution**: Use exact keys: `LinkedIn`, `GitHub`, `Medium` (case-sensitive)

### Issue: Lists not showing correctly
- **Solution**: Ensure you're using bullet lists in Rich text fields, not plain paragraphs

---

## Checklist

- [ ] Created Contentful account
- [ ] Created space
- [ ] Created all 5 content types with correct API IDs
- [ ] Added all fields with correct field types
- [ ] Used Rich text field type for highlights, tags, and skills
- [ ] Uploaded avatar and logos to Media library
- [ ] Created Portfolio entry and published
- [ ] Created Experience entries and published
- [ ] Created Project entries and published
- [ ] Created Skill Category entries and published
- [ ] Created Education entry and published
- [ ] Got Space ID and Access Token
- [ ] Created `config.js` with credentials
- [ ] Tested locally and content loads

---

## Next Steps

After setup:
1. Test locally to verify content loads
2. Deploy to GitHub Pages (see README.md)
3. Update content anytime in Contentful — changes appear immediately

---

## Quick Reference: Content Type Summary

| Content Type | API ID | Fields | Notes |
|--------------|--------|--------|-------|
| Portfolio | `portfolio` | name, subtitle, email, website, resume, about, heroSummary, avatar, socials | Single entry only |
| Experience | `experience` | role, company, period, logo, highlights | Multiple entries |
| Project | `project` | title, description, tags, liveUrl, codeUrl | Multiple entries |
| Skill Category | `skillCategory` | categoryName, skills | Multiple entries |
| Education | `education` | degree, school, period | Multiple entries |

---

This guide includes the exact field types from your Contentful interface. Follow each step carefully and your portfolio will be connected to Contentful!

