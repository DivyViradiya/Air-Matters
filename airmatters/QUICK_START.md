# 🚀 Air Matters - Quick Start Guide

Get your Air Matters website running in 5 minutes!

---

## 📥 Installation (2 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/air-matters.git
cd air-matters

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open http://localhost:5000 in your browser ✅

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| **README.md** | Full documentation |
| **REQUIREMENTS.md** | All dependencies & system requirements |
| **.env.example** | Environment variable template |
| **package.json** | Project dependencies |

---

## 📱 Features Included

- ✅ Real-time Air Quality Index (geolocation-based)
- ✅ 4 Product Lines (Liquid Plant, Pro, Tree, Hybrid Green)
- ✅ Dark/Light Mode
- ✅ Fully Responsive Design
- ✅ Email Waitlist
- ✅ High Performance (Lighthouse 90+)
- ✅ SEO Optimized

---

## 🔧 Available Commands

```bash
npm run dev       # Development server (hot reload)
npm run build     # Production build
npm run preview   # Preview production build
npm start         # Start production server
```

---

## 📚 Documentation

- **README.md** - Complete project overview
- **REQUIREMENTS.md** - Technical requirements
- **design_guidelines.md** - Design system

---

## 💡 Customization

### Change Brand Colors
Edit `client/src/index.css`:
```css
:root {
  --primary: 142 76% 36%;  /* Main brand color */
  --accent: 142 71% 45%;   /* Secondary color */
}
```

### Update Product Information
Edit `client/src/components/ProductsSection.tsx`

### Add Company Information
Edit `client/src/components/Footer.tsx`

---

## 🔐 Environment Variables

Create `.env.local`:
```
VITE_APP_NAME=Air Matters
VITE_APP_URL=https://yourdomain.com
```

All APIs used are **free** - no additional keys needed!

---

## 📞 Support

- 📖 Read **README.md** for full documentation
- 📋 Check **REQUIREMENTS.md** for technical details

---

## ✅ GitHub Push Instructions

```bash
# Initialize git (if needed)
git init
git remote add origin https://github.com/yourusername/air-matters.git

# Push to GitHub
git add .
git commit -m "Initial commit - Air Matters website"
git branch -M main
git push -u origin main
```

Now you can push your changes to GitHub! 🚀

---

## 🎯 Next Steps

1. ✅ Customize brand colors
2. ✅ Update product information
3. ✅ Add your company details
4. ✅ Push to GitHub
5. ✅ Configure your environment variables

---

**You're all set!** 🚀

For detailed information, see the full documentation in README.md
