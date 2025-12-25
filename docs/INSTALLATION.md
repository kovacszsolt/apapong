# Installation Guide

## Play Online

The game is available online at: [https://kovacszsolt.github.io/apapong/](https://kovacszsolt.github.io/apapong/)

## Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- No installation required - runs directly in the browser

## Quick Installation

1. Clone or download this repository:
   ```bash
   git clone https://github.com/kovacszsolt/apapong.git
   cd apapong
   ```

2. Open `index.html` in your web browser
3. That's it! The game will start automatically

## Running Locally with a Web Server

For the best experience, you can use a local web server:

### Using Python 3

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### Using Node.js (http-server)

```bash
# Install http-server globally (optional)
npm install -g http-server

# Or use npx to run without installing
npx http-server
```

Then open `http://localhost:8080` in your browser.

### Using PHP

```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Using VS Code Live Server

If you're using Visual Studio Code:
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Troubleshooting

### Game Not Loading

- Make sure all files are in the correct directory structure
- Check browser console for any errors (F12 → Console)
- Ensure you're using a modern browser
- Try clearing your browser cache

### Sound Not Playing

Some browsers require user interaction before playing sounds:
1. Click anywhere on the page first
2. Then the sounds will work properly

### CORS Errors

If you see CORS (Cross-Origin Resource Sharing) errors:
- Use a local web server instead of opening the file directly
- See "Running Locally with a Web Server" section above

## System Requirements

- **Browser**: Modern browser with JavaScript enabled
- **Screen**: Minimum 800x600 resolution recommended
- **Internet**: Required only for loading Kaplay.js from CDN (first load)

## Offline Usage

To use the game offline:
1. Download Kaplay.js locally
2. Update the script tag in `game.html` to point to the local file
3. The game will work completely offline

