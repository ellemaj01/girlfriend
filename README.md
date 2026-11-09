# Will you be my girlfriend? 💌

A small website to ask someone to be your girlfriend. It is plain HTML, CSS and JavaScript, so there is no build step and it runs on GitHub Pages as is.

## How it works

1. An envelope wiggles on screen until it gets opened.
2. The question appears with a **Yes** and a **No** button.
3. Every time the No-button gets hovered or tapped, it runs away, changes its text and makes the Yes-button bigger.
4. Clicking Yes starts confetti and floating hearts 🥰

## Make it your own

All texts are at the top of [`script.js`](script.js):

- `NAAM`: the name in the greeting
- `SUCCES_BERICHT`: the message shown after "yes"
- `NEE_TEKSTEN`: the texts the No-button cycles through

## Run it

- **Locally:** open `index.html` in a browser.
- **GitHub Pages:** go to *Settings → Pages*, choose *Deploy from a branch*, then pick `main` and `/ (root)`.

## Files

| File | What it does |
| --- | --- |
| `index.html` | The three screens: envelope, question and success |
| `style.css` | Layout, colors and animations |
| `script.js` | Runaway button, confetti and hearts |
