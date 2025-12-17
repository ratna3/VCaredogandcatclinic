# VCare Dog and Cat Clinic - Website

A modern veterinary clinic website built with Next.js and Three.js, featuring animated 3D pet models.

## Features

- 🐾 **Royal Theme** - Elegant purple and gold color scheme with white background
- 🎨 **3D Animated Models** - Interactive pet models using Three.js
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🏥 **Complete Clinic Website** - Home, Services, Shop, About, and Contact pages
- ⚡ **Fast & Modern** - Built with Next.js 14 and React 18

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js with React Three Fiber
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd vcare-dog-cat-clinic
```

2. Install dependencies:

```bash
npm install
```

3. Download 3D models (see `public/models/README.md` for instructions)

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── services/         # Services page
│   └── shop/             # Shop page
├── components/
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Site footer
│   ├── Model3DViewer.tsx # Three.js model viewer
│   └── ModelCarousel.tsx # 3D model carousel
├── data/
│   └── models.ts         # Pet model data with attributions
public/
└── models/               # 3D model files (GLB format)
```

## 3D Model Credits

### Dogs
- **Labrador Dog** by kenchoo - [CC BY](https://skfb.ly/oRvAB)
- **Animated Dog, Shiba Inu** by quander - [CC BY](https://skfb.ly/6SrJO)
- **Animated Pitbull Dog** by Game-animal ripper - [CC BY](https://skfb.ly/pyJyU)
- **Doberman** by kenchoo - [CC BY-NC-ND](https://skfb.ly/oSnnD)
- **Chihuahua** by kenchoo - [CC BY](https://skfb.ly/oRIJB)

### Cats
- **Sphynx Cat** by kenchoo - [CC BY-NC-ND](https://skfb.ly/oS7yP)
- **Cat Walk** by Erina eka syaharani - [CC BY](https://skfb.ly/6S9AO)
- **An Animated Cat** by Evil_Katz - [CC BY](https://skfb.ly/6YPwH)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is for educational/demo purposes. 3D models are licensed under their respective Creative Commons licenses as noted above.

## Contact

VCare Dog and Cat Clinic
- Email: vcaredogandcatcliniclko@gmail.com
- Phone: +91 81880 00557
