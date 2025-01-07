
# Whiteboard Front

## Overview

**Whiteboard Front** is a collaborative drawing application frontend built with Nuxt 3. It features real-time updates using Pusher, state management with Pinia, and a modern UI powered by Tailwind CSS. This project integrates tools for canvas-based drawing, HTTP requests, and responsive design, making it ideal for creating collaborative applications.

---

## Features

- **Nuxt 3**: A modern JavaScript framework for building performant web applications.
- **Pinia**: Lightweight state management.
- **Axios**: Simplified HTTP requests and API interactions.
- **Konva & Canvas**: Robust tools for canvas drawing and graphics manipulation.
- **Pusher**: Real-time event handling.
- **Tailwind CSS**: Utility-first CSS framework for fast styling.
- **Lodash**: A utility library for JavaScript.
- **SweetAlert2**: Customizable alert popups.

---

## Installation

### Prerequisites

Ensure the following are installed on your system:
- **Node.js** (v16 or later recommended)
- **npm** or **yarn**

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd whiteboard-front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Usage

### Development Server
Start the development server:
```bash
npm run dev
```
The application will be accessible at `http://localhost:3000`.

### Build for Production
Create a production-ready build:
```bash
npm run build
```

### Static Site Generation
Generate a static version of the site:
```bash
npm run generate
```

### Preview the Build
Preview the production build locally:
```bash
npm run preview
```

---

## Scripts

| Command           | Description                                |
|-------------------|--------------------------------------------|
| `npm run dev`     | Start the development server.              |
| `npm run build`   | Build the application for production.      |
| `npm run generate`| Generate static files.                     |
| `npm run preview` | Preview the production build.              |

---

## Technologies Used

### Core Dependencies
- **[@pinia/nuxt](https://pinia.vuejs.org/)**: State management for Vue applications.
- **[axios](https://axios-http.com/)**: For API communication.
- **[konva](https://konvajs.org/)**: Canvas drawing and manipulation.
- **[pusher-js](https://pusher.com/)**: Real-time event handling.
- **[tailwindcss](https://tailwindcss.com/)**: Utility-first CSS framework.
- **[vue-router](https://router.vuejs.org/)**: Router for Vue applications.
- **[lodash](https://lodash.com/)**: JavaScript utility functions.

### Development Dependencies
- **[autoprefixer](https://github.com/postcss/autoprefixer)**: Adds vendor prefixes to CSS.
- **[postcss](https://postcss.org/)**: CSS processing tool.
- **[tailwindcss](https://tailwindcss.com/)**: For responsive and utility-based styling.

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin my-feature-branch`.
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.