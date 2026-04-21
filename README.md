# KKR TV

KKR TV is a modern, high-performance IPTV web application built with React and Vite. It allows users to browse and stream thousands of free IPTV channels from around the world.

### **Developer :- Kaustav Kanti Ray @iamkkronly**

---

## 🚀 Features

- **Live Streaming:** Direct video playback for M3U8 streams using `hls.js`.
- **Global Reach:** Access to thousands of channels across various categories and languages.
- **Advanced Filtering:** Filter channels by category and language to find exactly what you want.
- **Fast Search:** Instant search functionality to find your favorite channels.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Privacy Focused:** Direct playback without revealing stream URLs to the end user.

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Video Playback:** [hls.js](https://github.com/video-dev/hls.js/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** CSS3 with modern variables

## 📊 Data Source

All channel and stream information is dynamically fetched from the [iptv-org API](https://iptv-org.github.io/api/).

## 💻 Local Development

To run KKR TV locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd kkr-tv
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173`.

## 🌐 Deployment on Render

This project is pre-configured for automatic deployment on [Render](https://render.com/).

### Automatic Deployment with Blueprint

1. Push your code to a GitHub/GitLab repository.
2. Connect your Render account to your repository.
3. Render will automatically detect the `render.yaml` file and set up the static site.

### Manual Configuration (if needed)

If you prefer manual setup on Render:

- **Service Type:** Static Site
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`
- **Routes:** Add a rewrite rule for `/*` to `/index.html` (for SPA support).

---

**Developed with ❤️ by Kaustav Kanti Ray (@iamkkronly)**
