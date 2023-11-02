import {
  createLogger,
  Levels,
  gradients
} from "../src";

const logr = createLogger({
  name: "LOGGER",
  level: Levels.DEBUG,
	color: gradients.purple
})

logr.debug("Debug message.")
logr.info("Info.")
logr.success("Same level as info.")
logr.warn("Uh oh.")
logr.error("I don't feel so good...")
logr.critical("I'm done for!")

logr.whisper("I'm quiet, but not that quiet.")
logr.speak("You can normally hear me.")
logr.shout("You can always hear me, even in production.")

console.log("\n")