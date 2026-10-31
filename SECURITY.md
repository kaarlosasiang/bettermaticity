# Security Policy

## Supported Versions

Only the version currently deployed at [bettermati.org](https://bettermati.org) receives fixes. The current version is shown in the site footer and in [`version.json`](version.json).

| Version | Supported |
| ------- | --------- |
| 1.9.x   | Yes       |
| < 1.9   | No        |

## Reporting a Vulnerability

We take security seriously at BetterMati.org. If you discover a security vulnerability, please report it responsibly.

### How to Report

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, please email: **volunteer@bettermati.org**

Include in your report:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

| Action             | Timeframe             |
| ------------------ | --------------------- |
| Acknowledgment     | Within 48 hours       |
| Initial Assessment | Within 7 days         |
| Resolution Target  | Within 30 days        |
| Public Disclosure  | After fix is deployed |

## Security Measures

### Current Implementations

**Server Security:**

- HTTPS enforced via `.htaccess`
- HTTP Strict Transport Security (HSTS)
- Content Security Policy (CSP) headers
- X-Frame-Options to prevent clickjacking
- X-Content-Type-Options to prevent MIME sniffing
- Referrer-Policy for privacy

**Application Security:**

- The site is static HTML, prerendered at build time and hydrated by React in the browser
- No server-side code, database, or user accounts
- No forms that send or store data; the volunteer invitation opens an email (`mailto:`)
- Fonts and scripts are self-hosted, apart from the third-party services listed below
- The only runtime data file is `data/news.json`, fetched from the same site
- `admin/news-editor.html` runs entirely in the browser: it loads `news.json`, and saves edits by downloading a new file for a maintainer to upload. It cannot write to the server.
- Browser storage holds only display preferences: the chosen language and whether the volunteer invitation was seen (`localStorage`), and a dismissed install prompt (`sessionStorage`)

**Data Security:**

- All data is sourced from public government portals
- No personal information about visitors is collected or stored by the site

### Third-Party Services

| Service              | Purpose                     | Data Shared                                         |
| -------------------- | --------------------------- | --------------------------------------------------- |
| Google Analytics 4   | Usage statistics            | Anonymous page views                                |
| Open-Meteo API       | Weather data                | Location (Mati)                                     |
| Exchange-rate API    | Currency rates              | None                                                |
| OpenStreetMap        | Map tiles                   | None                                                |
| Facebook Page plugin | City posts on the News page | Loaded from Facebook, which may set its own cookies |

## Best Practices for Contributors

When contributing code:

1. **Never commit secrets** - API keys, passwords, or credentials. CI secrets (deploy and Facebook tokens) live only in GitHub Actions secrets
2. **Validate inputs** - Sanitize any user-facing inputs
3. **Use HTTPS** - All external resources must use HTTPS
4. **Review dependencies** - Check `npm audit` for known vulnerabilities
5. **Follow CSP** - New scripts, styles, fonts or connections must comply with the Content Security Policy in `.htaccess`; prefer self-hosting over adding a host

## Scope

This security policy covers:

- The BetterMati.org website
- The GitHub repository
- Associated build tools, scripts, and CI workflows

Out of scope:

- Third-party services (Google Analytics, Facebook, APIs)
- User's local environment
- Social media accounts

## Contact

For security concerns: **volunteer@bettermati.org**

For general inquiries: Open a GitHub issue or join our [Discord](https://discord.com/invite/qeSu7RJkjQ)

---

Thank you for helping keep BetterMati.org secure for the community.
