# How to setup delevopment encironment

## Download and install dependencies

```
sudo apt-get install nodejs npm
git clone [url]
cd powerchain-ui
npm install
```

## Build (development)

```
# First, build the dependencies
npm run library

# Run watch
npm run watch
```

## Setup a server 

```
cd dev
python3 -m http.server
```

Then open your browser, the default URL is `http://127.0.0.1:8000`.

