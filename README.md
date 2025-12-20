# Portfolio Website - Pulkit Khowal

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. Features smooth animations, 3D effects, and a fully functional contact form.

## 🚀 Features

- **Fully Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Smooth Animations** - Powered by Framer Motion and Lottie animations
- **Interactive 3D Effects** - Tilt effects and smooth scrolling
- **Contact Form** - Integrated with EmailJS for form submissions
- **Modern UI/UX** - Terminal-style design with green accents
- **Tech Stack Showcase** - Interactive tech stack display
- **Project Portfolio** - Grid layout showcasing projects

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lottie React** - JSON animations
- **Locomotive Scroll** - Smooth scrolling
- **EmailJS** - Contact form handling

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your EmailJS credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Set up an email service (Gmail, Outlook, etc.)
3. Create an email template with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
4. Get your Service ID, Template ID, and Public Key from the dashboard
5. Add them to your `.env` file

### Resume Download

Place your resume PDF file in the `public` folder as `resume.pdf`, or update the download URL in `src/components/Navbar.jsx`.

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Import project in [Netlify](https://netlify.com)
3. Add environment variables in Netlify dashboard
4. Build command: `npm run build`
5. Publish directory: `dist`

### Environment Variables for Deployment

Make sure to add these environment variables in your hosting platform:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

## 📁 Project Structure

```
portfolio/
├── public/              # Static assets
│   ├── *.png           # Tech stack and project images
│   └── resume.pdf      # Resume file (add your own)
├── src/
│   ├── assets/         # Fonts and Lottie animations
│   ├── components/     # React components
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── LandingPage.jsx
│   │   ├── Navbar.jsx
│   │   ├── Project.jsx
│   │   └── Tech.jsx
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore file
├── package.json        # Dependencies
└── vite.config.js      # Vite configuration
```

## 🎨 Customization

### Colors
- Primary Green: `#00ff00` (terminal-style elements)
- Gradient Green: `from-green-400 to-green-600` (headings)
- Background: `black`

### Fonts
- Custom font: `Doto` (loaded from `src/assets/fonts/`)

### Update Content
- **Projects**: Edit `src/components/Project.jsx`
- **Tech Stack**: Edit `src/components/Tech.jsx`
- **About Section**: Edit `src/components/About.jsx`
- **Social Links**: Edit `src/components/Contact.jsx`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Pulkit Khowal**
- Portfolio: [Your Portfolio URL]
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)

## 🙏 Acknowledgments

- [Lottie Files](https://lottiefiles.com/) for animations
- [EmailJS](https://www.emailjs.com/) for contact form
- [Framer Motion](https://www.framer.com/motion/) for animations
