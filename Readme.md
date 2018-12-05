# How to setup delevopment encironment

## Download and install dependencies

```
git clone https://github.com/BH-Open-Blockchain-XLab/powerchain-ui.git
cd powerchain-ui
npm install
```

## Development

First, compile dependencies. Run this only when dependencies are updated.

```
npm run library
```

Then setup a dev server.

```
npm run start
```

# Release

```
npm run release
```

Released files are under `./dist`.

