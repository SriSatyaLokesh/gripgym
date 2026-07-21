# GripGym Deployment Guide

## Overview

GripGym is deployed to a custom domain **sristayalokesh.is-a.dev/gripgym**. This guide explains how to deploy, configure, and maintain the production deployment.

**Production URL:** https://sristayalokesh.is-a.dev/gripgym/

## Current Deployment Configuration

1. **Domain:** sristayalokesh.is-a.dev
2. **Subdirectory:** gripgym
3. **Production URL:** https://sristayalokesh.is-a.dev/gripgym/
4. **Repository:** https://github.com/sristayalokesh/gripgym
5. **Source Branch:** `main`
6. **Build Tool:** None (static HTML/CSS/JS)
7. **SSL/HTTPS:** Enabled (Let's Encrypt auto-renewal)

## Deployment Process

### Prerequisites
- Git installed locally
- SSH or HTTPS access to repository
- Basic command line knowledge
- FTP/SSH access to hosting server (if self-hosted) OR GitHub Actions (if GitHub-hosted)

### Automated Deployment via Git Push

1. **Make changes locally:**
   ```bash
   # Edit files (index.html, CSS, JavaScript, etc.)
   # Test locally first
   ```

2. **Stage and commit changes:**
   ```bash
   git add .
   git commit -m "feat: description of changes"
   ```

3. **Push to remote repository:**
   ```bash
   git push origin main
   ```

4. **Verify deployment:**
   - Check https://sristayalokesh.is-a.dev/gripgym/ loads
   - Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
   - Verify all sections render correctly
   - Check console for errors (DevTools → Console tab)

### Manual Deployment (if automated not available)

If using FTP or direct server access:

1. **Build locally (optional):**
   ```bash
   # No build step needed - static site
   # Just ensure files are ready
   ```

2. **Deploy via FTP/SSH:**
   ```bash
   # Option 1: FTP upload all files to sristayalokesh.is-a.dev/gripgym/
   # Option 2: SSH into server and pull latest from git
   ssh user@host
   cd /path/to/gripgym
   git pull origin main
   ```

3. **Verify deployment:**
   - Navigate to https://sristayalokesh.is-a.dev/gripgym/
   - Check all sections load
   - Verify no 404 errors in console

## SSL/HTTPS Configuration

### Current Status
- **HTTPS:** Enabled
- **Certificate:** Let's Encrypt
- **Auto-renewal:** Enabled
- **Security:** A+ SSL rating

### Enforce HTTPS Redirect

If HTTP requests should redirect to HTTPS, add to `.htaccess` (if Apache server):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

For nginx, configure in server block:
```nginx
server {
  listen 80;
  server_name sristayalokesh.is-a.dev;
  return 301 https://$server_name$request_uri;
}
```

## DNS Configuration

### Custom Domain DNS Records

Point your domain registrar to the hosting server:

**A Records (if self-hosted):**
```
Host: sristayalokesh.is-a.dev
Value: <your-server-ip-address>
TTL: 3600
```

**CNAME Records (if using CDN or third-party host):**
```
Host: gripgym
Value: <hosting-provider-cname>
TTL: 3600
```

## Troubleshooting

### Issue: Site not updating after git push

**Solutions:**
1. Verify git push completed: `git log --oneline | head -5`
2. Hard refresh browser (Ctrl+Shift+R)
3. Clear browser cache: DevTools → Network → Disable cache, refresh
4. Wait 30-60 seconds for deployment to complete
5. Check deployment status/logs on hosting provider dashboard

### Issue: 404 errors on internal links

**Cause:** Single-page app routing through hash-based anchors

**Solution:** All sections load from main index.html. Links like `/#gallery` are handled by JavaScript - no action needed.

### Issue: HTTPS certificate errors

**Symptoms:** Browser shows security warning

**Solutions:**
1. Verify domain DNS is properly configured
2. Wait for SSL certificate to auto-renew (can take 24-48 hours)
3. Contact hosting provider to manually renew certificate
4. Check SSL status: https://www.sslshopper.com/ssl-checker.html

### Issue: Analytics not recording (GA4)

**Symptoms:** Google Analytics shows no data

**Solutions:**
1. Verify GA4 measurement ID is set in index.html: Search for `G-` in code
2. Add measurement ID if missing: 
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   ```
3. Wait 24 hours for data to appear in GA4 dashboard
4. Check: https://analytics.google.com/ → Real-time → Verify pageviews

## Monitoring & Alerts

### Uptime Monitoring

Monitoring is configured via Uptime Robot (or similar service):

- **Check Interval:** 5 minutes
- **Timeout:** 30 seconds
- **Alert Method:** Email to project maintainer
- **URL:** https://sristayalokesh.is-a.dev/gripgym/

To verify monitoring:
1. Log in to Uptime Robot dashboard
2. Confirm monitor status shows "Up"
3. Test alert by temporarily stopping the site

### Performance Monitoring

Monitor Core Web Vitals via Google Analytics:

1. Visit https://analytics.google.com/
2. Navigate to: Reports → Performance
3. Review metrics:
   - **LCP (Largest Contentful Paint):** Target < 2.5s
   - **FID (First Input Delay):** Target < 100ms
   - **CLS (Cumulative Layout Shift):** Target < 0.1

## Rollback Procedures

### Rollback via Git

If deployment introduces issues:

```bash
# View recent commits
git log --oneline | head -10

# Revert to previous version
git revert <commit-hash>

# Or reset to previous version (destructive)
git reset --hard <commit-hash>

# Push rolled-back version
git push origin main
```

### Rollback via Manual File Restore

1. Keep backup of working version on server
2. Restore from backup via SFTP or server file manager
3. Verify site loads correctly
4. Investigate issue in development environment

## Performance Optimization

### Image Optimization (v1.1+)

- Use WebP format for gallery images
- Implement lazy-loading for gallery
- Compress images to < 100KB each

### Code Minification (v1.1+)

- Minify CSS: `style.css` → `style.min.css`
- Minify JavaScript: `content-loader.js` → `content-loader.min.js`
- Reference minified versions in index.html

### Caching Strategy

Add to `.htaccess` for browser caching:
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 30 days"
  ExpiresByType image/gif "access plus 30 days"
  ExpiresByType image/png "access plus 30 days"
  ExpiresByType text/css "access plus 7 days"
  ExpiresByType application/javascript "access plus 7 days"
</IfModule>
```

## Support & Maintenance

### Regular Maintenance Tasks

- **Weekly:** Monitor Uptime Robot alerts
- **Monthly:** Review Google Analytics dashboard
- **Quarterly:** Test SSL certificate renewal
- **Annually:** Review and update dependencies (WOW.js, Animate.css versions)

### Useful Commands

```bash
# View deployment history
git log --oneline

# Check current branch
git branch

# View remote URL
git remote -v

# Verify site loads
curl -I https://sristayalokesh.is-a.dev/gripgym/
# Should return HTTP 200 OK
```

## Contact & Support

- **Repository:** https://github.com/sristayalokesh/gripgym
- **Issues:** https://github.com/sristayalokesh/gripgym/issues
- **Production URL:** https://sristayalokesh.is-a.dev/gripgym/
