This project uses [Vite](https://vite.dev/) with [React](https://react.dev/) and [Vitest](https://vitest.dev/).

It was originally bootstrapped with Create React App and migrated to Vite.

## Available Scripts

In the project directory, you can run:

### `npm start` (or `npm run dev`)

Runs the app in development mode with hot module replacement.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Runs the test suite once and exits — this is what CI uses.<br />
Use `npm run test:watch` for interactive watch mode.

### `npm run build`

Builds the app for production to the `dist` folder.<br />
The build is minified and asset filenames include content hashes.

Source maps are disabled (`build.sourcemap: false` in `vite.config.js`) so that
original source is not published alongside the production bundle. Turn them on
locally if you need to debug a production build.

### `npm run preview`

Serves the contents of `dist` locally, to sanity-check a production build
before deploying.

## Docker

### Development

```sh
docker compose up
```

Starts the dev server on [http://localhost:3000](http://localhost:3000) with the
source bind-mounted. `CHOKIDAR_USEPOLLING` is set because file-change events do
not cross the Docker Desktop bind mount reliably.

Run the tests in the same image:

```sh
docker compose run --rm tests
```

### Production

```sh
docker build -t docker-react .
docker run -p 8080:80 docker-react
```

A multi-stage build: `node:22-alpine` compiles the app, then the static `dist`
output is copied into `nginx:stable-alpine`. Only build artifacts reach the
final image — no source, no `node_modules`, no toolchain.

`.dockerignore` keeps `.git`, `node_modules`, `.env*`, and editor config out of
the build context.

## Project Layout

- `index.html` — the app entry point. Vite serves this from the project root
  (not from `public/`), and it references `/src/main.jsx` directly.
- `public/` — static files copied to the output root verbatim. Reference them
  with absolute paths, e.g. `/favicon.ico`.
- `src/` — application source. Files containing JSX use the `.jsx` extension.

## Notes

- Environment variables exposed to the client must be prefixed `VITE_` and are
  read via `import.meta.env.VITE_FOO` (the CRA equivalent was `REACT_APP_` and
  `process.env`).
- Importing an SVG gives you its URL: `import logo from './logo.svg'`. To import
  one as a component instead, add
  [vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr).

## Learn More

- [Vite documentation](https://vite.dev/guide/)
- [Vitest documentation](https://vitest.dev/guide/)
- [React documentation](https://react.dev/)
