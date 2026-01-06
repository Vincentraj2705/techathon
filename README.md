# InHack 2025 - College Internal Hackathon Website

A modern, responsive website for your college internal hackathon, inspired by Smart India Hackathon.

## Features

- **Responsive Design**: Works perfectly on all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Complete Sections**:
  - Hero section with event statistics
  - About the hackathon
  - Problem themes/domains
  - Event timeline
  - Prizes and recognition
  - Team registration form
  - FAQ accordion
  - Contact information
  - Social media integration

## Tech Stack

- HTML5
- CSS3 (with modern features like Grid, Flexbox, animations)
- Vanilla JavaScript
- Font Awesome icons

## How to Use

1. Open `index.html` in your web browser
2. Customize the content according to your needs
3. Update dates, prizes, and contact information
4. Add your college logo and branding
5. Deploy to your preferred hosting platform

## Customization Guide

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #4f46e5;
    --secondary-color: #06b6d4;
    --dark-color: #1e293b;
    /* ... more colors */
}
```

### Content
1. **Event Details**: Update dates and times in the Timeline section
2. **Prizes**: Modify prize amounts in the Prizes section
3. **Themes**: Add or remove problem domains in the Themes section
4. **Contact Info**: Update email, phone, and address in the Contact section

### Forms
The registration form currently logs data to console. To make it functional:
1. Set up a backend server (Node.js, PHP, etc.)
2. Create a database to store registrations
3. Update the form submission handler in `script.js`

## Deployment

### Option 1: GitHub Pages
1. Create a GitHub repository
2. Push your code
3. Enable GitHub Pages in repository settings

### Option 2: Netlify
1. Sign up on Netlify
2. Drag and drop your project folder
3. Your site will be live instantly

### Option 3: Traditional Web Hosting
1. Upload files via FTP
2. Point your domain to the hosting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Features to Add

Consider adding these enhancements:
- Backend integration for form submissions
- Database for storing registrations
- Email notifications
- Admin dashboard
- Live countdown timer display
- Photo gallery from previous events
- Testimonials section
- Blog/News section
- Real-time registration count

## License

Free to use and modify for your college hackathon!

## Support

For any questions or customization help, feel free to reach out!

---

**Happy Hacking! 🚀**
