# GripGym Deployment Guide

## Overview

GripGym is deployed to **GitHub Pages** - GitHub's built-in static website hosting service. This guide explains how to deploy, configure, and troubleshoot the deployment.

**Production URL:** https://mian-ali.github.io/GymWebsite/

## GitHub Pages Setup

### Prerequisites
- GitHub account with access to the GripGym repository
- Git installed locally
- Basic command line knowledge

### Current Configuration

The GripGym repository is already configured for GitHub Pages:

1. **Repository:** https://github.com/mian-ali/GymWebsite
2. **Source Branch:** `main`
3. **Deployment URL:** https://mian-ali.github.io/GymWebsite/
4. **Build Tool:** None (static HTML/CSS/JS)

### Verify GitHub Pages is Enabled

1. Go to repository **Settings** → **Pages**
2. Confirm **Source** is set to `main` branch
3. Verify status shows: "Your site is live at https://mian-ali.github.io/GymWebsite/"
4. SSL/HTTPS should be enabled automatically

## Deployment Process

### Automated Deployment (Recommended)

GitHub Pages automatically deploys whenever you push to the `main` branch:

```bash
# 1. Make changes locally
# (edit index.html, CSS, JavaScript, etc.)

# 2. Stage changes
git add .

# 3. Commit with descriptive message
git commit -m "feat: update feature name or description"

# 4. Push to remote repository
git push origin main

# 5. Deployment starts automatically
# Check status: Go to GitHub repository → Actions tab
# Deployment typically completes in 30-60 seconds
```

### Manual Deployment Verification

If changes don't appear immediately:

1. **Check deployment status:**
   - Visit repository → **Actions** tab
   - Look for recent deployment workflow
   - Verify workflow completed successfully (green checkmark)

2. **Clear browser cache:**
   ```bash
   # Hard refresh in browser (bypass cache)
   # Windows/Linux: Ctrl + Shift + R
   # Mac: Cmd + Shift + R
   ```

3. **Verify DNS propagation:**
   - Changes typically appear within 1-5 minutes
   - If using custom domain, verify CNAME record

## SSL/HTTPS Configuration

### Current Status
- **HTTPS:** Enabled automatically
- **Certificate:** Let's Encrypt (provided by GitHub)
- **Auto-renewal:** Yes, GitHub handles automatically

### Enforce HTTPS
GitHub Pages automatically redirects HTTP to HTTPS. To verify:

1. Navigate to http://mian-ali.github.io/GymWebsite/ (note http://)
2. You should automatically redirect to https://
3. Check browser address bar for secure lock icon

## Custom Domain Setup (Optional - Future v1.1)

If you want to use a custom domain (e.g., www.gripgym.com):

### Prerequisites
- Custom domain purchased and registered
- Access to domain registrar's DNS settings

### Steps

1. **Add custom domain to GitHub Pages:**
   - Repository → **Settings** → **Pages**
   - Enter custom domain in "Custom domain" field
   - Save (GitHub creates CNAME file automatically)
   - Commit and push the CNAME file

2. **Update DNS records at domain registrar:**
   - Create A records pointing to GitHub Pages IP addresses:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or create CNAME record pointing to: `mian-ali.github.io`

3. **Wait for DNS propagation:**
   - DNS changes can take 24-48 hours
   - Use `nslookup` or `dig` to check:
   ```bash
   nslookup yourdomain.com
   # Should return GitHub Pages IP addresses
   ```

4. **Verify custom domain:**
   - Return to GitHub Pages settings
   - Confirm domain shows as verified
   - HTTPS certificate should auto-renew for custom domain

## Troubleshooting

### Issue: Site not updating after push

**Symptoms:** Changes committed but not visible online

**Solutions:**
1. Check Actions tab for failed deployment
2. Hard refresh browser (Ctrl+Shift+R)
3. Clear browser cookies/cache
4. Wait 2-3 minutes for DNS propagation
5. Check git log to verify commit was pushed: `git log --oneline | head -5`

### Issue: 404 errors on subpages

**Symptoms:** Anchor links (/#about, /#services) return 404

**Cause:** GitHub Pages redirects all non-existent URLs to 404.html

**Solution:** Single-page application handling is already configured. No action needed - all sections load from main index.html.

### Issue: HTTPS not working

**Symptoms:** Browser shows unsecure connection or certificate errors

**Solutions:**
1. Verify repository is public (private repos don't get HTTPS by default)
2. Check Pages settings are enabled
3. Wait 5-10 minutes for certificate generation
4. Try accessing from incognito/private browser window
5. Contact GitHub Support if persists

### Issue: Custom domain not working

**Symptoms:** Custom domain not resolving or times out

**Solutions:**
1. Verify DNS records are correct (A records or CNAME)
2. Check CNAME file exists in repository root
3. Ensure domain registrar DNS settings propagated (24-48 hours)
4. Verify custom domain in GitHub Pages settings
5. Use online tools to check DNS (e.g., whatsmydns.net)

### Issue: Too many redirects

**Symptoms:** Browser shows "too many redirects" error

**Cause:** Usually due to incorrect DNS or SSL configuration

**Solutions:**
1. Clear browser cookies for the domain
2. Verify DNS records (don't create redirect records)
3. Remove any Cloudflare/third-party proxies temporarily
4. Use direct GitHub Pages IP (without subdomain redirect)

## Performance Optimization

### Current Performance

- **Page Load Time:** < 3 seconds (global average)
- **Cached Resources:** CSS, fonts, JavaScript bundled
- **Image Optimization:** Using Next-Gen formats where possible

### Future Optimizations (v2.0)

- Image lazy-loading for gallery
- CSS/JavaScript minification and bundling
- WebP format support with fallbacks
- Service Worker for offline capability
- Compression for faster delivery

## Monitoring

### GitHub Actions

View deployment history:
1. Repository → **Actions** tab
2. Select "pages build and deployment" workflow
3. See all past deployments with timestamps and status

### Analytics

Google Analytics 4 tracking is enabled:
- Visit [analytics.google.com](https://analytics.google.com)
- Check real-time data: Real-time → Overview
- View page views, users, events

### Uptime Monitoring

Uptime Robot monitors production site:
- **Monitoring URL:** https://mian-ali.github.io/GymWebsite/
- **Check Interval:** 5 minutes
- **Alerts:** Email notifications on downtime

Visit [uptimerobot.com](https://uptimerobot.com) to view dashboard

## Rollback Procedures

If you need to revert to a previous version:

### Identify Previous Commit

```bash
# View recent commits
git log --oneline -10

# Shows output like:
# abc1234 (HEAD -> main) Latest feature
# def5678 Previous version
# ghi9101 Earlier version
```

### Revert to Previous Version

```bash
# Option 1: Revert specific commit (creates new commit)
git revert abc1234
git push origin main

# Option 2: Reset to previous commit (rewrites history - use with caution)
git reset --hard def5678
git push origin main --force
```

### Verify Rollback

1. Push completes successfully
2. Check GitHub Actions tab for deployment
3. Production site updates (1-5 minutes)
4. Verify changes are reverted by visiting production URL

## Post-Deployment Verification Checklist

After each deployment, verify:

- [ ] Site loads without errors (check DevTools Console)
- [ ] All 9 sections visible and functional:
  - [ ] Header and navigation
  - [ ] Hero section
  - [ ] About section
  - [ ] Services section
  - [ ] Classes section
  - [ ] Schedule section
  - [ ] Pricing section
  - [ ] Gallery section
  - [ ] Footer section
- [ ] Navigation links work (scroll to correct sections)
- [ ] Responsive design works (test mobile, tablet, desktop)
- [ ] Images load correctly
- [ ] Animations trigger on scroll
- [ ] GA4 tracking active (check real-time report)
- [ ] No console errors
- [ ] robots.txt accessible: https://mian-ali.github.io/GymWebsite/robots.txt
- [ ] sitemap.xml accessible: https://mian-ali.github.io/GymWebsite/sitemap.xml

## CI/CD Integration (Optional - Future)

For automated testing and deployment:

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: npm test  # Add your test command
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## Contact & Support

- **Repository Issues:** [GitHub Issues](https://github.com/mian-ali/GymWebsite/issues)
- **Deployment Questions:** See README.md or CONTRIBUTING.md
- **GitHub Pages Docs:** [pages.github.com](https://pages.github.com)

## Related Documentation

- [README.md](README.md) - Project overview and quick start
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical design and structure
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md) - Pre-launch verification

---

**Last updated:** July 21, 2026  
**Deployment Status:** ✅ Active and Live  
**Production URL:** https://mian-ali.github.io/GymWebsite/
