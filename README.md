# Poké Birthday

A small React app that maps a date to a Pokémon by converting the date into an ID (month * 100 + day) and querying the PokéAPI. For example: Jan 1 → 101, Aug 31 → 831.

This project is a lightweight single-page app (created with a standard React toolchain) and includes a small component `src/BirthdayPokemon.jsx` that handles the date input, ID computation, and fetch to the PokéAPI.

## What it does

- Prefills the date input with today’s date.
- Converts the chosen date to an ID using `month * 100 + day`.
- Fetches Pokémon data from the PokéAPI at `https://pokeapi.co/api/v2/pokemon/{id}` and displays the sprite and basic info.

Key implementation detail: the component uses `String(...).padStart(2, '0')` for month/day so the date value is in `YYYY-MM-DD` format required by `<input type="date">`.

## Files of interest

- `src/BirthdayPokemon.jsx` — main component that computes the ID and performs the API request.
- `src/App.js` — app bootstrap (renders the component).

## Requirements

- Node.js (recommended 14+ or current LTS)
- npm (or yarn)

## Run locally

1. Install dependencies

```bash
npm install
```

2. Start the dev server

```bash
npm start
```

Open http://localhost:3000 in your browser (Create React App default). If your project uses a different dev server or port, follow the output from `npm start`.

## Build and test

Build for production:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Troubleshooting

- No Pokémon found for a date: The app maps date → ID and queries that ID on the PokéAPI. Many IDs above the current Pokémon count will return 404. If you try a date with a large ID (for example 12/31 → 1231), the API may return "Pokémon not found." The UI surfaces a friendly error message in that case.
- API rate limits or downtime: PokéAPI is a free public API. If requests fail, check the API status or try again later.
- polyfills: `String.prototype.padStart` is supported in modern browsers. If you must support very old browsers, add a small polyfill.

## Notes & next steps

- You can change the ID mapping function in `src/BirthdayPokemon.jsx` if you'd prefer a different mapping from date → Pokémon.
- Consider caching successful lookups locally to avoid repeated API calls for the same date.

## License

This repository doesn't specify a license. Add one if you plan to publish the project.

---

If you want, I can also:

- add a brief automated test that checks the ID computation for a few dates,
- include a sample screenshot or demo gif in the README,
- or add a small polyfill helper for `padStart` to the project.

