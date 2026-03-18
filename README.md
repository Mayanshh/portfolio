# 🎭 Immersive Creative Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r157-white?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-green?style=for-the-badge&logo=greensock)](https://greensock.com/)

An award-grade, highly animated portfolio experience. This project pushes the boundaries of web transitions, 3D interaction, and creative storytelling using a modern React stack.

## ✨ Key Features

* **🕹️ 3D Immersive Experience:** Integrated R3F (React Three Fiber) with high-quality `.glb` models and custom camera staging.
* **🎬 Professional Animations:** Complex scroll-triggered reveals, text ripples, and image masking via GSAP and Framer Motion.
* **🚀 Performance First:** Optimized for Core Web Vitals using Next.js Dynamic Imports and high-efficiency font loading (Woff2).
* **📈 SEO & Analytics:** Full OpenGraph suite, dynamic Sitemap generation, and session-replay tracking with PostHog.
* **📱 Responsive & Fluid:** Custom smooth-scrolling (Lenis/Locomotive) adapted for both desktop and mobile viewports.

## 📂 Project Structure

```text
├── public/                 # Static assets (3D Models, Videos, Fonts)
├── src/
│   ├── animations/         # Reusable GSAP/Framer motion logic
│   ├── app/                # Next.js App Router (File-based Routing)
│   ├── components/         # Atomic UI components & 3D Scenes
│   ├── hooks/              # Custom React hooks (useIsMobile, etc.)
│   └── utils/              # Smooth scroll & Email logic
🛠️ Tech Stack
Framework: Next.js 15 (App Router)

Language: TypeScript

Styling: Tailwind CSS / PostCSS

Animations: GSAP, Framer Motion

3D Engine: Three.js / React Three Fiber

Analytics: PostHog / Vercel Analytics

Deployment: Vercel

🚀 Getting Started
Prerequisites
Node.js 18.x or higher

npm or pnpm

Installation
Clone the repository:

Bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd client
Install dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env.local file for your analytics and email keys:

Code snippet
NEXT_PUBLIC_POSTHOG_KEY=your_key
NEXT_PUBLIC_POSTHOG_HOST=[https://app.posthog.com](https://app.posthog.com)
Run the development server:

Bash
npm run dev
📦 Deployment & SEO
This project is configured for one-click deployment on Vercel.

Sitemap: Automatically generated at /sitemap.xml

Robots: Configured at /robots.txt

Metadata: Enhanced OpenGraph tags are handled in layout.tsx for optimal social media sharing.

🤝 Contact
Mayansh — [mayanshbangali49@gmail.com] — [Your LinkedIn]


---
