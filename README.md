# dotenv-flexible

> flexible dotenv parser. Think dotenv + dotenv-expand + env overrides (flexibility)

[![Build Status](https://travis-ci.org/osdevisnot/dotenv-flexible.svg?branch=master)](https://travis-ci.org/osdevisnot/dotenv-flexible) [![Coverage Status](https://coveralls.io/repos/github/osdevisnot/dotenv-flexible/badge.svg?branch=master)](https://coveralls.io/github/osdevisnot/dotenv-flexible?branch=master) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
yarn add dotenv-flexible
```

## How it works?

`dotenv-flexible` loads `.env` file into `process.env` with support for environment specific overrides and support for variable expansion/interpolations.

In your code, load and configure dotenv-flexible

```js
require('dotenv-flexible')();
```

then create a `.env` file in project root

```
PORT=8080
HOST=something.com
# optionally add comments to document your options
```

`process.env` now has values you defined in your `.env` file

## Overrides

### overrides using environment files

create a `.env.developement` file in project root with overrides

```
HOST=localhost
```

`process.env` now has values from `.env` and your overrides if `process.env.NODE_ENV === development`

### Overrides from command line.

To override values defined in `.env` and `.env.development`, try passing them from node command line. For example:

```bash
cross-env HOST=klick.js.org node <script>.js
```

`process.env` now has the overrides from command line even if HOST was defined in `.env` or `.env.development`

## Options

### dir

---

default: `process.cwd()`

pass reference to directory if you would like to store `.env` files in a separate config folder.

Note: the dir is resolved from `process.cwd()`

## Contributing

Scaffolded using [`tslib-cli`](https://www.npmjs.com/package/tslib-cli).

Run `yarn` or `npm install` in root folder to setup your project.

### Available Commands:

```bash
yarn build # builds the package
yarn test # run tests for the package
yarn coverage # run tests and generate coverage reports
yarn pub # publish to NPM
yarn format # prettier format
yarn lint # lint pkg files
yarn setup # clean setup
```

## License

**`dotenv-flexible`** is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@osdevisnot](https://github.com/osdevisnot) and [all contributors](https://github.com/osdevisnot/dotenv-flexible/graphs/contributors).
