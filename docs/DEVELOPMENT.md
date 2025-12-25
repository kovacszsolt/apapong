# Development Guide

## 📁 Project Structure

```
apapong/
├── core/                    # Core game logic
│   ├── constants.js        # Game constants and configuration
│   ├── config.js           # Game state variables
│   ├── main.js             # Kaplay initialization
│   ├── sound.js             # Sound system functions
│   ├── collision.js        # Collision detection and handling
│   ├── score.js            # Score system functions
│   ├── gameOver.js         # Game over system functions
│   ├── countdown.js        # Countdown system functions
│   ├── ballCollisions.js  # Ball collision detection and handling
│   └── utils.js            # Utility functions
├── scenes/                  # Game scenes
│   └── gameScene.js        # Main game scene
├── css/                     # Stylesheets
│   ├── common.css          # Common styles
│   ├── index.css           # Main menu styles
│   ├── game.css            # Game screen styles
│   ├── playerNames.css     # Player names page styles
│   ├── paddleColors.css    # Paddle colors page styles
│   ├── settings.css        # Settings page styles
│   └── howto.css           # How to play page styles
├── tests/                   # Unit tests
│   ├── setup.js            # Test setup
│   ├── utils.test.js       # Utility function tests
│   ├── config.test.js      # Config tests
│   └── gameObjects.test.js # Game object tests
├── index.html               # Main menu
├── playerNames.html         # Player name input page
├── paddleColors.html        # Paddle color selection page
├── game.html                # Main game page
├── settings.html            # Settings page (ball color)
├── howto.html              # How to play instructions
└── package.json            # NPM dependencies and scripts
```

## 🛠️ Technologies Used

- **Kaplay.js** (v3001.0.12) - Game framework
- **JavaScript** (ES6+) - Programming language
- **HTML5** - Markup
- **CSS3** - Styling
- **Vitest** - Testing framework

## 🎨 Customization

### Game Constants

All game constants are defined in `core/constants.js`, including:

- **Canvas**: Dimensions, background color
- **Ball**: Size, initial speed, speed increment, bounce angles
- **Paddle**: Width, height, speed, positions
- **Score**: Win score, text size, character width
- **Countdown**: Start value, interval, text size
- **Sound**: Frequencies, durations, types, cooldown
- **Collision**: Cooldown values, ball offset
- **UI**: Line segments, wall thickness, opacity
- **Colors**: Default colors for all game elements
- **Player**: Default names, name length limits

### Modifying Game Settings

To change game behavior, edit `core/constants.js`:

```javascript
const GAME_CONFIG = {
    SCORE: {
        WIN_SCORE: 5,  // Change to 10 for longer games
    },
    BALL: {
        INITIAL_SPEED: 15000,  // Adjust ball speed
        SPEED_INCREMENT: 2000,  // How much faster per hit
    },
    // ... etc
};
```

## 🧹 Code Style

The code follows clean code principles:

- **Single Responsibility**: Each function has one clear purpose
- **DRY (Don't Repeat Yourself)**: No code duplication
- **Meaningful Names**: Clear variable and function names
- **Small Functions**: Functions are focused and concise
- **Constants**: Magic numbers are replaced with named constants
- **JSDoc Comments**: Functions are documented with JSDoc

### Function Documentation

Functions use JSDoc comments:

```javascript
/**
 * Calculates the bounce angle based on where the ball hits the paddle
 * @param {Object} ball - Ball game object
 * @param {Object} paddle - Paddle game object
 * @returns {number} Bounce angle in radians
 */
function calculateBounceAngle(ball, paddle) {
    // ...
}
```

## 🔧 Adding New Features

### Adding a New Scene

1. Create a new file in `scenes/` directory
2. Define the scene using `scene("sceneName", () => { ... })`
3. Add the script tag to `game.html`
4. Navigate to it using `go("sceneName")`

### Adding New Colors

Edit `core/constants.js` or add colors in the HTML files where color selection happens.

### Modifying Game Physics

Edit collision and movement logic in:
- `core/collision.js` - Collision handling
- `core/ballCollisions.js` - Ball collision detection and handling
- `core/countdown.js` - Countdown and ball initialization

## 🧪 Testing

See [tests/README.md](../tests/README.md) for detailed testing information.

### Test Coverage

The project includes test coverage thresholds configured in `vitest.config.js`:
- Code coverage must be above 70% (statements, functions, branches, lines)

## 🐛 Debugging

### Browser Console

Open browser console (F12) to see:
- JavaScript errors
- Game state information
- Debug messages

### Common Issues

1. **Scene not loading**: Check script tag order in `game.html`
2. **Collision not working**: Verify paddle and ball have `area()` component
3. **Sound not playing**: Check browser autoplay policies

## 🚀 Future Improvements

Potential enhancements:

- AI opponent mode
- Different difficulty levels
- Power-ups
- Online multiplayer
- Tournament mode
- Statistics tracking
- Replay system
- Custom themes

## 📝 Contributing

When contributing:

1. Follow the existing code style
2. Add JSDoc comments to new functions
3. Use constants instead of magic numbers
4. Keep functions small and focused
5. Test in multiple browsers
6. Ensure test coverage remains above 70%

## 📄 License

This project is open source and available for personal use.

