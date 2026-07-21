# Contributing to GripGym

Thank you for your interest in contributing to GripGym! We welcome contributions from developers of all skill levels. This guide will help you understand our development process, code standards, and how to submit your changes.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing Requirements](#testing-requirements)
- [Commit Message Format](#commit-message-format)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please:

- Be respectful and constructive in all interactions
- Welcome feedback and different perspectives
- Report inappropriate behavior to maintainers
- Focus on what is best for the community

## Getting Started

### Prerequisites

- Git (for cloning and version control)
- A text editor or IDE (VS Code, Sublime Text, WebStorm, etc.)
- A web browser for testing (Chrome, Firefox, Safari, Edge)
- GitHub account (for creating issues and pull requests)

### First-Time Setup

1. **Fork the repository:**
   - Click "Fork" on GitHub to create your own copy
   - Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/GymWebsite.git
   cd GymWebsite
   ```

2. **Add upstream remote:**
   ```bash
   git remote add upstream https://github.com/mian-ali/GymWebsite.git
   ```

3. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Open index.html in browser to see the site**

## Development Setup

### No Build Process Required

GripGym is a static website with no build step. Simply:

1. Edit HTML/CSS/JavaScript in your text editor
2. Save the file
3. Refresh your browser to see changes

### Recommended Workflow

1. **Use a live reload server (optional but helpful):**
   ```bash
   npx live-server
   # Opens http://localhost:8000 with auto-refresh
   ```

2. **Keep DevTools open:**
   - Press F12 to open Developer Tools
   - Go to Console tab to check for errors
   - Use Elements tab to inspect HTML/CSS
   - Use Network tab to verify all assets load

3. **Test on multiple devices:**
   - Desktop: 1440px width
   - Tablet: 768px width
   - Mobile: 375px width
   - Use DevTools device emulation (Ctrl+Shift+M)

## Code Style Guidelines

### HTML Standards

- Use semantic HTML5 elements (`<header>`, `<section>`, `<article>`, `<footer>`)
- Use meaningful class names (e.g., `section-title`, not `s-t`)
- Keep HTML readable with proper indentation (2 spaces)
- Include `alt` text for all images
- Use `id` attributes for section anchors (#about, #services, etc.)

**Example:**
```html
<section id="about" class="about">
  <div class="container">
    <h2 class="section-title">About Us</h2>
    <div class="cards">
      <!-- Cards content -->
    </div>
  </div>
</section>
```

### CSS Standards

- Use CSS custom properties (variables) for colors and spacing
- Follow mobile-first approach (base styles for mobile, media queries for larger)
- Use semantic class names (`.btn-primary`, `.card-title`, not `.red-button`)
- Keep selectors simple (avoid deep nesting)
- Group related styles together
- Use 2-space indentation
- Comment sections with `/* Section Name */`

**Example:**
```css
/* Header Styles */
.header {
  background: var(--primary-color);
  padding: 20px 0;
  position: sticky;
  top: 0;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .nav-link {
    display: block;
    padding: 15px 20px;
  }
}
```

### JavaScript Standards

- Use vanilla JavaScript (no frameworks in v1.0)
- Use meaningful variable names (`userEmail`, not `x` or `a`)
- Use arrow functions where appropriate: `const handleClick = () => {}`
- Add comments for complex logic
- Avoid global variables (use function scope)
- Use `const` by default, `let` when reassignment needed, avoid `var`
- Add error handling for user inputs

**Example:**
```javascript
// Initialize scroll animations
const initializeAnimations = () => {
  new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: true,
    live: true
  }).init();
};

// Handle form submission
const handleFormSubmit = (event) => {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  if (!name) {
    console.error('Name is required');
    return;
  }
  
  // Process form...
  console.log('Form submitted:', name);
};
```

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| HTML classes | kebab-case | `section-title`, `btn-primary` |
| HTML IDs | kebab-case | `main-nav`, `contact-form` |
| CSS variables | kebab-case | `--primary-color`, `--spacing-lg` |
| JavaScript vars | camelCase | `handleClick`, `userName` |
| JavaScript consts | UPPER_CASE | `MAX_ATTEMPTS = 3` |
| Files | kebab-case | `content-loader.js`, `style.css` |

## Testing Requirements

Before submitting a pull request, test your changes:

### Browser Testing (Required)

Test on these browsers (use BrowserStack if needed):
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Responsive Testing (Required)

Test on three viewports minimum:
- [ ] Mobile: 375px width
- [ ] Tablet: 768px width
- [ ] Desktop: 1440px width

### Manual Testing Checklist

- [ ] All links work and navigate correctly
- [ ] Forms submit without errors
- [ ] Animations trigger on scroll
- [ ] Images load correctly
- [ ] No console errors (F12 Console tab)
- [ ] No broken assets (F12 Network tab)
- [ ] Text is readable at all sizes
- [ ] Buttons are clickable on touch devices

### Performance Testing

- [ ] Page loads in < 3 seconds
- [ ] No console warnings or errors
- [ ] Lighthouse score > 80
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1

## Commit Message Format

Use clear, descriptive commit messages following this format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat:** New feature (new section, new functionality)
- **fix:** Bug fix (corrects broken behavior)
- **refactor:** Code refactoring (no behavior change)
- **style:** CSS or formatting changes (no logic change)
- **perf:** Performance improvement
- **docs:** Documentation only
- **test:** Test-related changes
- **chore:** Configuration, dependency updates

### Examples

```bash
# Good
git commit -m "feat(gallery): add lazy-loading for images"
git commit -m "fix(nav): correct mobile menu alignment on iPhone"
git commit -m "docs(readme): add installation instructions"

# Less Clear (avoid)
git commit -m "update stuff"
git commit -m "WIP"
git commit -m "fixed"
```

## Pull Request Process

### Before You Start

1. Create an issue first to discuss major changes
2. Discuss approach in the issue before coding
3. Get approval for significant features

### Steps to Submit

1. **Update your branch with latest changes:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your feature branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request on GitHub:**
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template:

   ```markdown
   ## Description
   Brief description of changes
   
   ## Motivation & Context
   Why is this change needed?
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation
   - [ ] Other (describe)
   
   ## Testing Done
   What testing was performed?
   
   ## Screenshots (if applicable)
   Add before/after screenshots
   
   ## Related Issues
   Closes #123
   ```

4. **Respond to review feedback:**
   - Make requested changes
   - Push updates (they auto-appear in PR)
   - Resolve conversations once addressed

5. **Squash commits (if requested):**
   ```bash
   git rebase -i upstream/main
   # Mark commits to squash with 's' instead of 'pick'
   git push origin feature/your-feature-name --force
   ```

### PR Review Process

- Maintainers will review within 3-5 days
- Code must pass all checks (lint, tests, deployment preview)
- At least one maintainer approval required
- All conversations must be resolved
- Merges only to `main` branch

### After Merge

- Delete your feature branch: `git branch -d feature/your-feature-name`
- Pull latest from main: `git pull upstream main`
- Your changes will auto-deploy to production (GitHub Pages)

## Reporting Issues

### When to Report

Report issues for:
- Bugs (broken functionality, errors)
- Security vulnerabilities (report privately)
- Documentation improvements
- Performance problems
- Browser compatibility issues

### How to Report

1. **Search existing issues first** to avoid duplicates
2. **Create new issue** with:
   - Clear title: "Navigation menu not working on mobile"
   - Description: What happened, what should have happened
   - Steps to reproduce (if applicable)
   - Browser/device info: "Chrome 95, iPhone 12"
   - Screenshots or video (if helpful)

**Example Issue:**
```markdown
## Bug: Hero CTA button not clickable on mobile

### Description
The "Join Now" button in the hero section is not clickable on mobile devices.

### Steps to Reproduce
1. Open site on mobile (iPhone 12)
2. Scroll to hero section
3. Try to click "Join Now" button
4. Button does not respond

### Expected Behavior
Button should be clickable and navigate to pricing section

### Actual Behavior
Button appears but doesn't respond to clicks

### Environment
- Browser: Safari iOS 15
- Device: iPhone 12
- Viewport: 390px

### Additional
Works fine on desktop Chrome
```

## Feature Requests

### How to Suggest Features

1. **Check existing requests** to avoid duplicates
2. **Describe the feature:**
   - What problem does it solve?
   - How would users interact with it?
   - Rough design/mockup (if applicable)

3. **Label and discuss:**
   - Maintainers will triage and prioritize
   - Can be incorporated into roadmap

**Example Feature Request:**
```markdown
## Feature: Instructor Profiles

### Motivation
Users want to know more about our fitness instructors before joining a class.

### Proposed Solution
Add instructor profile cards showing:
- Photo
- Bio
- Specialties
- Class schedule
- Member reviews

### Example Design
[Describe or attach mockup]

### Related to v2.0 Roadmap
This aligns with content expansion goals
```

## Architecture & Design References

For technical details and design decisions:
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design and tech stack
- [DEPLOYMENT.md](DEPLOYMENT.md) - How the site is hosted
- [README.md](README.md) - Project overview

## Questions?

- **Documentation:** See [README.md](README.md), [ARCHITECTURE.md](ARCHITECTURE.md)
- **Deployment:** See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Roadmap:** See [ROADMAP-v2.0.md](ROADMAP-v2.0.md)
- **Issues:** [GitHub Issues](https://github.com/mian-ali/GymWebsite/issues)
- **Discussions:** [GitHub Discussions](https://github.com/mian-ali/GymWebsite/discussions)

---

## License

By contributing to GripGym, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors who have multiple merged PRs will be recognized:
- Listed in Contributors section of README.md
- Thanked in release notes
- Featured in CHANGELOG.md

---

**Thank you for contributing to GripGym! 💪**

Last updated: July 21, 2026  
Version: 1.0
