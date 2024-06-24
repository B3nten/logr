<div align="center">
<br />

![Logger](.github/banner.jpg)

<h3>LOGGER 📝</h3>

#### Gorgeous isomorphic logging

[![Npm package yearly downloads](https://badgen.net/npm/dy/express)](https://npmjs.com/package/express)
[![GitHub stars](https://img.shields.io/github/stars/freeCodeCamp/freeCodeCamp.svg?style=social&label=Star&maxAge=2592000)](https://github.com/freeCodeCamp/freeCodeCamp)
[![NuGet stable version](https://badgen.net/nuget/v/newtonsoft.json)](https://nuget.org/packages/newtonsoft.json)

*A tiny, beautiful logger for all JavaScript runtimes.*
</div>

## Usage

```sh
pnpm i @benstack/logger
```

```js
import {
  createLogger,
  Levels,
  gradients
} from "@benstack/logger";

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

## License

Made with 💛

Published under [MIT License](./LICENSE).