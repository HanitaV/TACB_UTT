# English Practice Website

Ôn tập Tiếng Anh Cơ Bản - Units 1-5

## 🚀 Quick Start

### Local Development
```bash
# Navigate to project directory
cd TACB

# Start local server (Python 3)
python -m http.server 8000

# Open in browser
# http://localhost:8000
```

### GitHub Pages Deployment

1. **Create GitHub Repository**
   - Go to GitHub and create a new repository (e.g., `english-practice`)
   - Make it public

2. **Push Code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: English practice website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/english-practice.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Click Save

4. **Access Your Site**
   - Your site will be live at: `https://YOUR_USERNAME.github.io/english-practice/`
   - Wait 2-3 minutes for initial deployment

## 📚 Features

- **3 Question Types:** Reading, Grammar, Vocabulary
- **5 Units Covered:** Units 1-5 from course material
- **Dark/Light Mode:** Toggle theme preference
- **Progress Tracking:** LocalStorage persistence
- **Streak Counter:** Gamification feature
- **Responsive Design:** Works on mobile & desktop

## 🎯 Question Coverage

### Reading
- Unit 1: Online Forum Posts (10 questions)
- Unit 2: Memory Palace Article (5 questions)
- Unit 3: Food Waste Blog (4 questions)
- Unit 4: Mindset Article (3 questions)
- Unit 5: Email Exchange (4 questions)

### Grammar
- Unit 1: Present Simple/Continuous (5 questions)
- Unit 5: Conditionals (3 questions)

### Vocabulary
- Unit 1: Personality Adjectives (3 questions)
- Unit 5: Extreme Adjectives (6 questions with images)

## 📁 Project Structure

```
TACB/
├── index.html          # Main HTML file
├── style.css           # Styling
├── app.js              # JavaScript logic
├── questions.json      # Question database
├── assets/             # Images
│   ├── 1/              # Unit 1 photos (4 images)
│   ├── 3/              # Unit 2 memory palace
│   ├── 9/              # Unit 4 mindset diagram
│   ├── 12/             # Review spork image
│   └── 14/             # Unit 5 vocabulary (6 images)
└── README.md           # This file
```

## ⚙️ Technical Details

- **Pure Vanilla JS** - No frameworks
- **LocalStorage API** - Progress persistence
- **CSS Variables** - Theme system
- **Responsive Grid** - Mobile-first design
- **GitHub Pages Ready** - Static site, no build needed

## 🐛 Known Limitations

- Some asset folders (3/, 9/, 12/, 14/) may have missing images
- Limited question types (only multiple-choice & fill-in)
- No backend - all data client-side

## 📝 Notes

- Temporary project for week-long use
- All content from "Voices" textbook Units 1-5
- Optimized for quick deployment, not production

---

Made with ⚡ for quick English practice
