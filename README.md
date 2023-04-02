## Development Setup

- `npm i`
- `npm start`
- Go to [http://localhost:3000](http://localhost:3000).

## Runtime Environment Variables

When running `npm start` for development (usually on your local machine), [`.env`](/.env) is used as standard for create-react-app. `process.env` will be checked first when loading configuration, and no further action is needed.

---

When building a docker image to host on nginx, the script [`env.sh`](/env.sh) is used to generate the file
[`public/env-config.js`](/public/env-config.js), which is imported by [`public/index.html`](/public/index.html). [`.env.template`](/.env.template) defines the environment variables, and also serves as a fallback to default Development values.

Since `process.env` does not exist in a static web environment, [`public/env-config.js`](/public/env-config.js) is loaded into `window.env`. This is handled automatically by [`src/config.ts`](/src/config.ts).

---

New Environment Variables must be added to **all files starting with `.env`** to make sure they run across environments.

## Deployment instructions

Refer to the workflows in [`.github`](/.github) and [`deploy`](/deploy) folders, and the [GitHub Actions panel in the repository](https://github.com/bbkpr/charactercrisis/actions).

## Change Log
### 1.1.0: April 1, 2023
* Style and spacing cleanup
* Add sorting by stat to Character List
### 1.0.0: March 31, 2023
* Add view sizes, scroll to top
### 0.9.0: March 28, 2023
* Added CSS classes for sticky positioning and independent scrolling in the CharacterDetails component
* Applied the new CSS classes to the respective columns in the CharacterDetails component, making the first column sticky and the second column independently scrollable
## npm scripts

### `npm start`

Runs the app in development mode. Go to [http://localhost:3000](http://localhost:3000) to view it in the browser. Hot reloading and live error checking are enabled.

### `npm test`

Launches the test runner in watch mode.

#### `npm test:output`

Same as `npm test`, and additionally writes the test results to [`.jest-test-results.json`](/.jest-test-results.json)

### `npm run build`

Builds the minified, optimized app for production to the `build` folder, with React in production mode

### `npm run storybook`

Run Storybook on port (default: 6006).

### `npm run build:storybook`

Runs `npm test:output`, then builds the Storybook in to the [storybook-static](/storybook-static/) folder.

See [src/stories/README.md](/src/stories/README.md) for more notes on Storybooks.
