# Malwa Chemical Conclave 2026 (MCC 2026)

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

**Engineering a Responsible Future**  
*Hosted by the Department of Chemical Engineering, IIT Indore in association with the Bureau of Indian Standards (BIS)*

🌐 **Official Website:** [https://mcc.iiti.ac.in](https://mcc.iiti.ac.in)  
📂 **Repository:** [Daseash/Malwa-Chemical-Conclave](https://github.com/Daseash/Malwa-Chemical-Conclave)

</div>

---

## 📌 Table of Contents

- [About the Conclave](#-about-the-conclave)
- [Key Highlights](#-key-highlights)
- [Website Features](#-website-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture & Structure](#-project-architecture--structure)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Deployment & Domain](#-deployment--domain)
- [Organizers & Contact](#-organizers--contact)

---

## 🔬 About the Conclave

The **Malwa Chemical Conclave (MCC 2026)** is a premier technical symposium hosted by the **Department of Chemical Engineering, Indian Institute of Technology Indore (IIT Indore)** in collaboration with the **Bureau of Indian Standards (BIS)**. 

The conclave bridges academic research, industrial manufacturing, and national standardization benchmarks. By convening global scholars, industry leaders, policymakers, and budding researchers, MCC 2026 fosters sustainable process innovation, green chemistry, and circular economy practices across Central India's thriving industrial landscape.

### Core Objectives:
1. **Regional Relevance:** Connecting cutting-edge chemical engineering research directly to the industrial corridors of the Malwa region.
2. **BIS Standardization:** Demystifying national quality benchmarks, regulatory adherence, and safety standards in chemical processing.
3. **The Malwa Consortium:** Establishing a durable academia–industry consortium for technical synergy, research commercialization, and skill development.

---

## ✨ Key Highlights

- **Distinguished Speakers:** Keynote addresses and plenary panels by eminent academics, scientists, and industry leaders.
- **Multi-Track Sessions:** Dedicated tracks covering process engineering, clean energy, waste valorization, smart materials, and standards compliance.
- **Interactive Workshops:** Practical sessions on BIS standard formulation, process safety, and quality assurance.
- **Student & Scholar Forum:** Poster presentations, paper sessions, and networking with industrial recruiters and researchers.

---

## 🚀 Website Features

- **Institutional Design System:** Tailored navy-and-gold academic aesthetic with modern typography (Outfit font), glassmorphism, and responsive layouts.
- **Dynamic Agenda & Schedule:** Chronological session breakdowns by time, speaker, and venue.
- **Online Delegate Registration:** Full-fledged registration workflow with tiered categories (Students, Academicians, Industry Professionals) and real-time fee calculation.
- **Robust Security & Anti-Bot Protection:**
  - In-memory sliding-window IP rate limiting (5 submissions/min/IP).
  - Anti-bot honeypot field.
  - Server-side XSS sanitization and strict regex validation (email, phone).
  - MongoDB Atlas database persistence for attendee submissions.
- **Interactive Regional Guide:** Curated guide to campus amenities at IIT Indore (Simrol campus) and historical/cultural landmarks in the Malwa region (Mahakaleshwar Ujjain, Omkareshwar, Rajwada, Mandu).
- **Interactive UI Components:** Smooth reveals via Framer Motion, announcement tickers, brochure download modal, and responsive mobile navigation.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & [PostCSS](https://postcss.org/) |
| **Icons & Visuals** | [Lucide React](https://lucide.dev/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Database** | [MongoDB Node Driver](https://www.mongodb.com/) (MongoDB Atlas) |
| **Fonts** | Google Fonts (`Outfit`) via `next/font` |
| **Hosting / Domain** | [https://mcc.iiti.ac.in](https://mcc.iiti.ac.in) |

---

## 📁 Project Architecture & Structure

```text
Malwa-Chemical-Conclave/
├── app/                              # Next.js App Router
│   ├── about/                        # About page (vision, mission, BIS collaboration)
│   ├── accommodation-venue/          # IIT Indore venue details, travel & local attractions
│   ├── api/                          # Backend API Route handlers
│   │   └── registration/             # POST handler for conference registration
│   ├── contact/                      # Contact details & location map
│   ├── organizers/                   # Organizing committee & faculty leads
│   ├── registration/                 # Registration form & pricing tiers
│   ├── schedule/                     # Detailed event itinerary & timelines
│   ├── speakers/                     # Keynote and invited speakers list
│   ├── sponsors/                     # Sponsorship tiers & partner benefits
│   ├── globals.css                   # Global styles & Tailwind v4 theme directives
│   ├── layout.tsx                    # Root layout (Metadata, Fonts, Navbar, Footer)
│   └── page.tsx                      # Landing page (Hero, Stats, Highlights, Ticker)
├── components/                       # Modular UI Components
│   ├── AboutHeroVideo.tsx            # Video hero background banner
│   ├── AnnouncementTicker.tsx        # Real-time event announcements bar
│   ├── BrochureModal.tsx             # Interactive brochure viewer/download modal
│   ├── Button.tsx                    # Reusable button with style variants
│   ├── CampusMap.tsx                 # Interactive Google Map embed of IIT Indore
│   ├── CountUpStat.tsx               # Animated statistics counter
│   ├── Footer.tsx                    # Institutional footer with quick links & socials
│   ├── GlassSection.tsx              # Frosted glass card wrapper
│   ├── MemberCard.tsx                # Committee member profile card
│   ├── Navbar.tsx                    # Responsive navigation bar with mobile drawer
│   ├── PageHero.tsx                  # Standardized hero banner for subpages
│   ├── PlacesToVisit.tsx             # Malwa tourist attractions card grid
│   └── Reveal.tsx                    # Scroll-triggered entrance animations
├── lib/                              # Utilities and shared configurations
│   ├── cn.ts                         # Class merging utility (clsx + tailwind-merge)
│   └── mongodb.ts                    # Cached singleton MongoDB client connection
├── public/                           # Static assets
│   ├── images/                       # Photos, campus images, speaker headshots
│   ├── logos/                        # IIT Indore, BIS, and event logos
│   └── favicon.ico                   # Browser icons and touch icons
├── .env.local                        # Local environment variables (ignored by Git)
├── next.config.mjs                   # Next.js configuration
├── package.json                      # Dependencies and npm scripts
├── postcss.config.mjs                # PostCSS configuration
└── tsconfig.json                     # TypeScript compiler options
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root to configure required services:

```env
# MongoDB Atlas connection string for delegate registrations
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net"

# Optional configuration
# NODE_ENV="development"
```

---

## 💻 Getting Started

### Prerequisites

- **Node.js**: Version 20.x or higher installed
- **npm**: Version 10.x or higher (or `pnpm` / `yarn`)
- **MongoDB Atlas cluster** (or local MongoDB instance)

### 1. Clone the repository

```bash
git clone https://github.com/Daseash/Malwa-Chemical-Conclave.git
cd Malwa-Chemical-Conclave
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env.local` in the project root:

```bash
cp .env.example .env.local    # if .env.example exists, or create manually
```

Add your `MONGODB_URI` string as described above.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm run start
```

---

## 📡 API Reference

### Registration API

- **Endpoint:** `POST /api/registration`
- **Content-Type:** `application/json`

#### Request Body:
```json
{
  "name": "Dr. Jane Doe",
  "email": "jane.doe@institution.edu",
  "phone": "+919876543210",
  "category": "Academician",
  "organization": "Indian Institute of Technology Indore",
  "designation": "Associate Professor",
  "message": "Interested in session on clean hydrogen processes.",
  "totalAmount": 2500,
  "website": ""
}
```

> **Note on Security:** `website` is a honeypot field. If populated, the request is flagged as a bot submission and silently rejected.

#### Response Codes:
- `201 Created`: Registration successfully saved to database.
- `400 Bad Request`: Validation failure (missing required fields, malformed email, or invalid phone).
- `429 Too Many Requests`: Rate limit exceeded (>5 requests in 60 seconds from the same IP).
- `500 Internal Server Error`: Server or database connection error.

---

## 🌐 Deployment & Domain

The official production portal is hosted at:

🔗 **[https://mcc.iiti.ac.in](https://mcc.iiti.ac.in)**

All domain routing, SSL certificates, and institutional DNS records are configured under the official Indian Institute of Technology Indore domain (`iiti.ac.in`).

---

## 🏛️ Organizers & Contact

- **Host:** Department of Chemical Engineering, Indian Institute of Technology Indore
- **Venue:** IIT Indore Campus, Khandwa Road, Simrol, Indore 453552, Madhya Pradesh, India
- **Partner:** Bureau of Indian Standards (BIS)
- **Email:** [mcc@iiti.ac.in](mailto:mcc@iiti.ac.in)
- **Websites:**
  - Conclave Portal: [https://mcc.iiti.ac.in](https://mcc.iiti.ac.in)
  - Department Portal: [https://chemical.iiti.ac.in](https://chemical.iiti.ac.in)
  - Institute Portal: [https://www.iiti.ac.in](https://www.iiti.ac.in)

---

<div align="center">

&copy; 2026 Malwa Chemical Conclave | Indian Institute of Technology Indore. All rights reserved.

</div>
