# Dr. Stephen Choi - Learning Platform

A secure, password-protected online learning platform for students to access course materials and participate in discussions.

## Features

### 🔐 **Secure Access**
- Password-protected entry (only students with the access code can enter)
- Session-based authentication
- Secure logout functionality

### 📚 **Course Materials**
- **Lectures**: Video content and presentations organized by week
- **Documents**: PDFs including syllabus, reading lists, and study guides  
- **Assignments**: Course assignments with due dates and descriptions
- Organized in an easy-to-browse grid layout

### 💬 **Student Bulletin Board**
- Post messages, questions, and announcements
- Real-time discussion board for student interaction
- Clean, modern interface for easy communication
- Automatic timestamp tracking

### 📱 **Responsive Design**
- Works perfectly on desktop, tablet, and mobile devices
- Modern, professional UI with smooth animations
- Accessible and user-friendly interface

## Quick Start

### For Dr. Stephen Choi (Administrator)

1. **Change the Access Password**:
   - Open `script.js`
   - Find line with `accessPassword: 'DrChoi2024!'`
   - Change to your preferred password
   - Save the file

2. **Customize Course Materials**:
   - Edit `index.html` to update course content
   - Replace sample lectures, documents, and assignments with your actual materials
   - Add links to your actual files/resources

3. **Deploy Online**:
   - Upload all files to a web hosting service (Netlify, GitHub Pages, etc.)
   - Share the website URL and password with your students

### For Students

1. Visit the website URL provided by Dr. Choi
2. Enter the access password when prompted
3. Browse course materials and participate in discussions
4. Use the bulletin board to connect with classmates

## File Structure

```
dr-choi-learning-platform/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript functionality
├── netlify.toml        # Deployment configuration
└── README.md           # This documentation
```

## Customization Guide

### Adding New Course Materials

1. **To add a new lecture**:
   ```html
   <div class="material-item">
       <i class="fas fa-play-circle"></i>
       <div class="material-info">
           <h4>Your Lecture Title</h4>
           <p>Brief description</p>
           <span class="material-date">Week X</span>
       </div>
   </div>
   ```

2. **To add a new document**:
   ```html
   <div class="material-item">
       <i class="fas fa-file-pdf"></i>
       <div class="material-info">
           <h4>Document Title</h4>
           <p>Document description</p>
           <span class="material-date">PDF</span>
       </div>
   </div>
   ```

3. **To add a new assignment**:
   ```html
   <div class="material-item">
       <i class="fas fa-clipboard-list"></i>
       <div class="material-info">
           <h4>Assignment Title</h4>
           <p>Assignment description</p>
           <span class="material-date">Due: Date</span>
       </div>
   </div>
   ```

### Changing the Password

In `script.js`, modify this line:
```javascript
accessPassword: 'DrChoi2024!',  // Change this to your preferred password
```

### Customizing Colors and Styling

The main colors can be changed in `styles.css`:
- Primary color: `#667eea` (blue gradient start)
- Secondary color: `#764ba2` (purple gradient end)
- Accent color: `#e74c3c` (red for logout/errors)

## Deployment Options

### Option 1: Netlify (Recommended)
1. Create account at netlify.com
2. Drag and drop the entire project folder
3. Your site will be live instantly with a custom URL

### Option 2: GitHub Pages
1. Create a GitHub repository
2. Upload all files
3. Enable GitHub Pages in repository settings

### Option 3: Any Web Host
1. Upload all files to your web hosting provider
2. Ensure `index.html` is in the root directory

## Security Notes

- The password is stored in JavaScript (client-side)
- For basic classroom use, this provides adequate protection
- For sensitive content, consider server-side authentication
- Change the default password before deployment
- The site uses HTTPS when deployed (recommended)

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Support

For technical issues or customization help, contact the platform developer or refer to the code comments in each file.

## License

This project is created for educational use by Dr. Stephen Choi and his students.
