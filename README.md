# Static html pages with Webpack 5

## Prerequisites

- [Install `node` (comes with `npm`)](https://nodejs.org/).

## Development

- `npm i` - install dependencies
- `npm start` - start development server
- `npm run cy:run` - run Cypress functional/browser/e2e tests. Works only when running website locally (`npm start` or `npm run preview`)

## Production

- `npm run build` to prepare `html`, `css`, `js` files in `dist/` directory
- `npm run preview` - run build and serve production files locally
- `npm run publish` - build project and publish `dist/` directory to `gh-pages` branch
- `npm run push-build` - push content of `dist/` directory to `gh-pages` branch
