# Merangkai - Indonesian Cultural Heritage Portfolio

A digital archive showcasing Indonesian cultural heritage through interactive generative art and computational design. This project bridges traditional Indonesian art forms with modern web technologies, creating immersive experiences that preserve and celebrate cultural stories.

## 🎨 Featured Projects

### 1. **Paranoia: Digital Ondel-Ondel**
An interactive interpretation of traditional Betawi Ondel-ondel puppets through p5.js. Features:
- 9 dynamic narrative scenes
- Mouse-responsive interactive elements
- Real-time flickering and transformation effects
- Custom parametric character design
- Indonesian guardian folklore in digital form

### 2. **Wayan the Barong**
A digital tribute to Balinese mythology and the sacred Barong dance. Highlights:
- 20+ layered animation system
- Interactive kaleidoscope drawing mode
- Dynamic rotation and transformation effects
- Background music integration with p5.sound
- Collectible sticker generation system
- Balance between good and evil in Balinese tradition

### 3. **Java through Java**
Computational exploration of traditional Javanese batik patterns:
- Generative batik pattern creation
- Translation of centuries-old textile traditions into code
- Cultural preservation through digital design

## 🛠 Tech Stack

- **Frontend Framework**: React 19.2.4
- **Routing**: React Router DOM 7.14.0
- **Build Tool**: Vite 8.0.1
- **Styling**: TailwindCSS 4.2.2
- **Interactive Graphics**: p5.js (embedded in components)
- **Code Quality**: ESLint

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd "MERANGKAI REACT"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🚀 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## 📁 Project Structure

```
MERANGKAI REACT/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ParanoiaSketch.jsx    # Ondel-ondel p5.js integration
│   │   ├── BarongSketch.jsx      # Barong p5.js integration
│   │   ├── WorkCard.jsx          # Project card component
│   │   ├── HatchingGraphic.jsx   # Decorative graphics
│   │   └── ...
│   ├── pages/               # Page components
│   │   └── WorkDetail.jsx   # Individual project view
│   ├── data/                # Project data and content
│   │   └── works.js         # Portfolio projects data
│   ├── hooks/               # Custom React hooks
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Application entry point
├── public/                  # Static assets
│   ├── Wayan Barong/        # Barong project assets
│   ├── batik*.png           # Batik pattern images
│   └── work*.png            # Preview images
└── package.json
```

## 🎭 Interactive Features

### Ondel-Ondel Experience
- **Scene Progression**: Watch the narrative unfold across 9 distinct scenes
- **Mouse Interaction**: Background elements respond to cursor movement
- **Color Transformation**: Dynamic color shifts represent emotional states
- **Cultural Storytelling**: Experience the guardian spirits of Betawi culture

### Barong Experience
- **Kaleidoscope Mode**: Interactive drawing with mirrored patterns
- **Animation Layers**: 20+ image layers create fluid motion
- **Audio Integration**: Immersive background music
- **Sticker Collection**: Generate and save personalized Barong stickers
- **Mythological Narrative**: Explore the protector of Balinese culture

## 🎨 Design Philosophy

**Merangkai** (Indonesian: "to weave together") represents the intersection of:
- 🏛 **Cultural Heritage**: Preserving Indonesian traditions
- 💻 **Modern Technology**: Using contemporary web tools
- 🎨 **Generative Art**: Algorithmic creativity
- 🌏 **Digital Preservation**: Making culture accessible globally
- ✨ **Interactive Storytelling**: Engaging experiences

## 🌐 Typography & Aesthetics

- **Headers**: Playfair Display (elegant serif)
- **Body & Code**: Courier New (monospace, archival feel)
- **Color Palette**: Warm tones with amber accents (#d97706)
- **Layout**: Grid-based, archive-inspired design
- **Animations**: Subtle, culturally respectful

## 📱 Responsive Design

The portfolio is fully responsive with:
- Mobile-optimized layouts
- Touch-friendly interactive elements
- Adaptive typography scaling
- Flexible grid systems

## 🖼 Assets Attribution

This project showcases original interpretations of Indonesian cultural elements:
- Ondel-ondel: Traditional Betawi puppet guardians
- Barong: Sacred Balinese mythological creature
- Batik: Javanese textile art patterns

## 🔧 Development Notes

### Adding New Projects

1. Add project data to `src/data/works.js`
2. Include project images in `public/`
3. For interactive pieces, create a component in `src/components/`
4. Update routing if needed in `Router.jsx`

### p5.js Integration

Interactive sketches are integrated using React components with useEffect hooks. See `ParanoiaSketch.jsx` and `BarongSketch.jsx` for examples.

## 🚢 Deployment

Build for production:
```bash
npm run build
```

The build output will be in the `dist/` folder, ready for deployment to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 📄 License

This project showcases cultural heritage and educational content. Please respect Indonesian cultural traditions when using or adapting this work.

## 🙏 Acknowledgments

Inspired by the rich cultural heritage of Indonesia, including:
- Betawi Ondel-ondel tradition
- Balinese Barong mythology
- Javanese batik craftsmanship

---

**Built with ❤️ for Indonesian cultural preservation**

*Bridging tradition and technology, one pixel at a time.*

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
