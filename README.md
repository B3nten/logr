<div align="center">
<br />

![Logger](.github/banner.jpg)

<h3>LOGGER 📝</h3>

#### Gorgeous isomorphic logging

[![Npm package yearly downloads](https://badgen.net/npm/dy/express)](https://npmjs.com/package/express)
[![GitHub stars](https://img.shields.io/github/stars/freeCodeCamp/freeCodeCamp.svg?style=social&label=Star&maxAge=2592000)](https://github.com/freeCodeCamp/freeCodeCamp)
[![NuGet stable version](https://badgen.net/nuget/v/newtonsoft.json)](https://nuget.org/packages/newtonsoft.json)

*A tiny and beautiful logger for Node, Deno, and the browser.*
</div>

## Usage

Install package:

```sh
# npm
npm install @100x/logger

# yarn
yarn add @100x/logger

# pnpm
pnpm install @100x/logger

# bun
bun install @100x/logger

# deno
import * as logger from "https://esm.sh/@100x/logger"
```

```js
import {
  createLogger,
  Levels,
  gradients
} from "@100x/logger";

const logger = createLogger({
  name: "LOGGER",
  level: Levels.DEBUG,
	color: gradients.purple
})

logger.debug("Debug message.")
logger.info("Info.")
logger.success("Same level as info.")
logger.warn("Uh oh.")
logger.error("I don't feel so good...")
logger.critical("I'm done for!")

logger.whisper("I'm quiet, but not that quiet.")
logger.speak("You can normally hear me.")
logger.shout("You can always hear me, even in production.")

```

![screenshot](/.github/screenshot.PNG)

## Development

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## License

Made with 💛

Published under [MIT License](./LICENSE).