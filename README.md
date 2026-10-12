# Muskan A. — Personal Portfolio Website

> **Senior Talent Acquisition Specialist & Technical Recruiter**  
> Expert in SaaS, CPaaS, CCaaS, UCaaS & Strategic Tech Hiring

A premium, high-converting single-page personal portfolio engineered with zero-framework, static web technologies (**HTML5**, **CSS3**, and **Vanilla JavaScript**).

---

## 🌟 Key Features

- **Modern Editorial Design**: Warm Alabaster White background (`#F9F9F7`), Deep Charcoal headings (`#1A1A1A`), Slate Grey body, and refined Sage Green accents.
- **Glassmorphic UI**: Frosted glass sticky navigation bar and cards with `backdrop-filter: blur(14px)`.
- **Lenis Smooth Scroll**: Butter-smooth inertial scrolling integration via CDN.
- **Scroll Reveal Micro-Interactions**: Vanilla JS `IntersectionObserver` with smooth slide-up and fade-in animations.
- **Impact Metrics Counter**: Dynamic number counter animation when metrics scroll into view.
- **Interactive Experience Timeline**: Zero-jank accordion timeline displaying career progression at **HireHub Consultant**.
- **Case Studies Grid**: 4 targeted tech hiring case studies showcasing talent pipeline engineering and executive search.
- **Native `<dialog>` Resume Modal**: Print-ready CV with **Print**, **Download PDF**, and **Copy Text** functionality.
- **Responsive & Accessible**: Seamless fluid layouts across desktop, tablet, and mobile with accessible ARIA landmarks.

---

## 📁 Project Structure

```
├── index.html                   # Main single-page HTML
├── css/
│   └── style.css                # Custom glassmorphic & editorial design system
├── js/
│   └── main.js                  # Vanilla JS (Lenis, Observer, Counters, Accordion, Modal)
├── assets/
│   └── Muskan_A_Resume.pdf      # Original resume PDF
├── server.ps1                   # Lightweight PowerShell local development server
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Local Development
To run the project locally without installing any dependencies:

```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```
Then navigate to `http://localhost:3000/`.

### Deployment
This project is 100% static and zero-build:
- **GitHub Pages**: Go to repository **Settings** > **Pages** > select branch `main` and root `/`.
- **Vercel**: Import the repository and deploy with the **Other (Static HTML)** preset.
