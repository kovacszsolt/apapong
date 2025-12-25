# Unit Tests

Ez a könyvtár az apaPong játék unit tesztjeit tartalmazza.

## Telepítés

A tesztek futtatásához először telepítsd a függőségeket:

```bash
npm install
```

## Tesztek futtatása

### Összes teszt futtatása
```bash
npm test
```

### Tesztek futtatása egyszer (watch mód nélkül)
```bash
npm test -- --run
```

### Tesztek futtatása UI-val
```bash
npm run test:ui
```

### Code coverage generálása
```bash
npm run test:coverage
```

## Teszt struktúra

- `utils.test.js` - Tesztek a core modulok funkcióihoz:
  - `sound.js` - Hangrendszer funkciók
  - `collision.js` - Ütközési rendszer (calculateBounceAngle, handlePaddleCollision)
  - `score.js` - Pontszám rendszer (createScoreString, updateScore)
  - `gameOver.js` - Játék vége rendszer (checkGameOver)

- `gameObjects.test.js` - Tests for core game object modules:
  - `countdown.js` - Countdown system (getRandomDirection, getRandomBallAngle, updateCountdown)
  - `ballCollisions.js` - Ball collision detection (checkPaddleCollision, handleWallCollision, handleScorePoint)

## Technológia

- **Vitest** - Modern, gyors teszt framework
- **jsdom** - DOM környezet szimuláció

