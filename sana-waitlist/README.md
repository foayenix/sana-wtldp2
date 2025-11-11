# SANA Waitlist Landing Page

A high-converting, minimal waitlist landing page for SANA - the platform that makes healing measurable.

## Features

### Core Functionality
- **Inline Email Capture** - Form expands without page redirects
- **Referral Tracking** - Unique referral links with position tracking
- **Local Storage** - Waitlist data persists in browser
- **Mobile Responsive** - Optimized for all screen sizes
- **Smooth Animations** - Professional transitions and hover effects

### Conversion Optimization
- Single primary CTA (Join the Waitlist)
- Social proof (testimonials, stats, practitioner grid)
- Urgency signals (waitlist position, founding member pricing)
- Trust indicators (data-secure, evidence-based)
- Referral incentives (3 referrals = move up 10 spots)

### Sections
1. **Hero** - Left-aligned text with SANA Health Graph visual
2. **What is SANA?** - Three value propositions (Clients, Practitioners, Research)
3. **Health Graph** - Interactive visualization explainer
4. **Social Proof** - Testimonials, practitioner grid, and stats
5. **Waitlist Benefits** - Early access, pricing, product shaping
6. **Final CTA** - Large centered call-to-action
7. **Footer** - Minimal footer with links

## Project Structure

```
sana-waitlist/
├── index.html          # Main landing page
├── style.css           # All styles and responsive design
├── script.js           # Form handling, referral tracking, analytics
├── README.md           # This file
└── assets/
    ├── images/         # Placeholder for images
    └── icons/          # Placeholder for icons
```

## Quick Start

### Option 1: Local Development

1. **Clone or download** the project folder

2. **Open in browser**
   ```bash
   # Navigate to the project directory
   cd sana-waitlist

   # Open index.html in your default browser
   open index.html  # macOS
   start index.html # Windows
   xdg-open index.html # Linux
   ```

3. **Or use a local server** (recommended)
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx http-server -p 8000

   # Using PHP
   php -S localhost:8000
   ```

4. **Visit** http://localhost:8000

### Option 2: Deploy to Production

#### Netlify (Recommended)

1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop the `sana-waitlist` folder
3. Done! Your site is live

Or use CLI:
```bash
npm install -g netlify-cli
cd sana-waitlist
netlify deploy --prod
```

#### Vercel

```bash
npm install -g vercel
cd sana-waitlist
vercel --prod
```

#### GitHub Pages

1. Create a new repository
2. Upload all files
3. Go to Settings → Pages
4. Select branch and save
5. Your site will be live at `https://username.github.io/repo-name`

## Configuration

### Update Waitlist Count

Edit `/script.js` line 7:
```javascript
let waitlistData = {
    count: 1200,  // Change this number
    users: []
};
```

### Update Copy

All text content is in `index.html`. Search for the text you want to change and update it directly.

### Update Colors

Edit `/style.css` variables (lines 7-17):
```css
:root {
    --primary-green: #0A5C3E;      /* Main brand color */
    --success-green: #10B981;       /* Success states */
    --text-dark: #1A2B4A;           /* Body text */
    /* ... */
}
```

### Connect to Email Service

Replace the mock backend function in `/script.js` (line 168):

```javascript
function sendToBackend(user) {
    // Mailchimp example
    fetch('https://YOUR_DOMAIN.us1.list-manage.com/subscribe/post-json?u=YOUR_U&id=YOUR_ID', {
        method: 'POST',
        body: JSON.stringify({
            EMAIL: user.email,
            FNAME: user.firstName,
            USERTYPE: user.userType
        })
    });

    // Or ConvertKit
    fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            api_key: 'YOUR_API_KEY',
            email: user.email,
            first_name: user.firstName,
            fields: { user_type: user.userType }
        })
    });
}
```

### Add Analytics

Add to the `<head>` section of `index.html`:

**Google Analytics:**
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

**Plausible (privacy-friendly):**
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

Then update the `trackEvent` function in `/script.js` (line 177):
```javascript
function trackEvent(eventName, data = {}) {
    // Google Analytics
    gtag('event', eventName, data);

    // Or Plausible
    plausible(eventName, { props: data });
}
```

## Customization Guide

### Add Your Own Health Graph Visual

1. Create or export your Health Graph as SVG or PNG
2. Save to `/assets/images/health-graph-detailed.png`
3. Update line 315 in `index.html`:
   ```html
   <img src="assets/images/health-graph-detailed.png" alt="SANA Health Graph">
   ```

### Add Real Practitioner Photos

1. Add photos to `/assets/images/` (e.g., `practitioner-1.jpg`)
2. Update the practitioner grid in `index.html` (around line 405)
3. Or update CSS to use images:
   ```css
   .practitioner-photo {
       background-image: url('../assets/images/practitioner-1.jpg');
       background-size: cover;
   }
   ```

### Change Launch Date

Update line 474 in `index.html`:
```html
<p>Be first to use SANA. Skip the line when we launch in Q2 2025.</p>
```

### Modify Referral Incentive

Update line 93 in `index.html`:
```html
<p class="referral-incentive">For every 3 referrals, move up 10 spots.</p>
```

And update the logic in `/script.js` (line 237):
```javascript
const bonus = Math.floor(referrer.referrals / 3) * 10;  // Change 3 and 10
```

## Testing Checklist

- [ ] All CTAs show the email form
- [ ] Form validation works (try invalid email)
- [ ] Form submission shows success message
- [ ] Copy referral link button works
- [ ] Referral URLs work (`?ref=CODE`)
- [ ] Responsive design on mobile (resize browser)
- [ ] Smooth scrolling works
- [ ] Mobile sticky CTA appears on mobile
- [ ] All links work (footer, etc.)
- [ ] Animations are smooth
- [ ] Text is readable on all backgrounds

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 5+)

## Performance

- **Load Time**: < 1 second
- **First Contentful Paint**: < 0.5s
- **Time to Interactive**: < 1s
- **Lighthouse Score**: 95+

### Optimization Tips

1. **Compress images**: Use TinyPNG or ImageOptim
2. **Minify CSS/JS**: Use a build tool or online minifier
3. **Enable caching**: Configure server headers
4. **Use a CDN**: Cloudflare, AWS CloudFront, etc.

## SEO Checklist

- [x] Title tag (< 60 characters)
- [x] Meta description (< 160 characters)
- [ ] Open Graph tags (add for social sharing)
- [ ] Favicon (add to `/assets/icons/`)
- [ ] Sitemap.xml (if multiple pages)
- [ ] robots.txt (if needed)

### Add Open Graph Tags

Add to `<head>` in `index.html`:
```html
<meta property="og:title" content="SANA - Healing, Now Measurable">
<meta property="og:description" content="Join SANA's waitlist. Connect with verified wellness professionals and use AI to show real data behind your wellbeing.">
<meta property="og:image" content="https://yourdomain.com/assets/images/og-image.jpg">
<meta property="og:url" content="https://yourdomain.com">
<meta name="twitter:card" content="summary_large_image">
```

## Backend Integration

For production, you'll need a backend to:
1. Store waitlist data in a database
2. Send confirmation emails
3. Track referrals persistently
4. Prevent duplicate signups

### Recommended Stack

**Option 1: Serverless (Easy)**
- Netlify Functions or Vercel Edge Functions
- Airtable or Google Sheets as database
- SendGrid or Mailgun for emails

**Option 2: Full Backend (Advanced)**
- Node.js + Express
- PostgreSQL or MongoDB
- Redis for caching
- Email service (SendGrid, AWS SES)

### Example API Endpoint

```javascript
// POST /api/waitlist
{
  "firstName": "John",
  "email": "john@example.com",
  "userType": "client",
  "referralCode": "ABC123"
}

// Response
{
  "success": true,
  "position": 1201,
  "referralCode": "USER123",
  "message": "You're on the waitlist!"
}
```

## Troubleshooting

### Form doesn't submit
- Check browser console for errors
- Ensure JavaScript is enabled
- Try a different browser

### Referral links don't work
- Check URL format: `?ref=CODE`
- Clear localStorage and try again
- Check browser console for errors

### Styles look broken
- Clear browser cache
- Check that `style.css` is loading
- Verify file paths are correct

### Mobile view issues
- Test on real device, not just browser resize
- Check viewport meta tag in `<head>`
- Verify media queries in CSS

## License

© 2025 SANA. All rights reserved.

## Support

For issues or questions:
- Email: support@sana.app
- GitHub Issues: [Create an issue](#)

## Version

**v1.0.0** - January 2025

---

Built with ❤️ for SANA
