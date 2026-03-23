# UTM Link Builder

A simple, responsive web app that allows users to create UTM-tagged URLs for marketing campaigns. This project was created as a frontend assignment for the Frontend Developer Internship at Anslation.

## Features

- Clean, minimal, and responsive user interface
- Create UTM links with required and optional parameters
- Copy generated links to clipboard
- Generate QR codes for easy mobile access
- Form validation and error handling
- Reset functionality

## Technologies Used

- React.js (Functional Components & Hooks)
- TailwindCSS for styling
- Vite as the build tool
- QR Code API integration

## Project Structure

```
/src
  /components
    UTMForm.jsx    - Handles user input and form submission
    URLDisplay.jsx - Displays generated URL and copy button
    QRCode.jsx     - Displays QR code for the generated URL
  App.jsx          - Main component that combines everything
  index.css        - Global styles and Tailwind directives
```

## How It Works

1. Users enter their base URL and required UTM parameters
2. The app validates the input and generates a properly formatted UTM link
3. Users can copy the link to clipboard with one click
4. A QR code is automatically generated for the URL
5. Users can reset the form at any time

## API Integration

The app uses the free QR Code API from `https://api.qrserver.com/v1/create-qr-code/` to generate QR codes for the UTM links.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the app in your browser at `http://localhost:5173`

## Build for Production

To build the app for production, run:

```bash
npm run build
```

The build output will be in the `dist` folder, ready to be deployed.te

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
