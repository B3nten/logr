import { FancyConsoleWriter } from "./fancy-writer";
import { gradients, type RGB } from "./gradients";
import { SimpleConsoleWriter } from "./simple-writer";
import { Writer, type WriterPrototype } from "./writer";

const env =
	globalThis.process?.env ||
	// @ts-expect-error
	import.meta.env ||
	// @ts-expect-error
	globalThis.Deno?.env.toObject() ||
	// @ts-expect-error
	globalThis.__env__;

export const isColorSupported =
	(!env.NO_COLOR && !env.FORCE_COLOR) || !(env.TERM === "dumb") || !env.CI;

class Logger {
	static LogLevels = {
		DEBUG: 0,
		INFO: 1,
		SUCCESS: 1,
		WARN: 2,
		ERROR: 3,
		CRITICAL: 4,
		PRODUCTION: 5,
	} as const;
	constructor(options: {
		name: string;
		level: (typeof Logger.LogLevels)[keyof typeof Logger.LogLevels];
		writer: WriterPrototype;
		color?: [RGB, RGB];
	}) {
		this.name = options.name;
		this.level = options.level;
		// @ts-expect-error
		this.writer = new options.writer(this.name, this.level, options.color);
	}
	log(
		input: unknown[],
		level: number = Logger.LogLevels.INFO,
		name?: string
	) {
		if (level < this.level) return;
		this.writer?.write({
			content: input,
			timestamp: new Date(),
			type: {
				level,
				name,
			},
		});
	}
	name: string;
	level: number;
	writer?: Writer;

	debug = (...msg: unknown[]) =>
		this.log(msg, Logger.LogLevels.DEBUG, "DEBUG");
	info = (...msg: unknown[]) => this.log(msg, Logger.LogLevels.INFO, "INFO");
	success = (...msg: unknown[]) =>
		this.log(msg, Logger.LogLevels.SUCCESS, "SUCCESS");
	warn = (...msg: unknown[]) => this.log(msg, Logger.LogLevels.WARN, "WARN");
	error = (...msg: unknown[]) =>
		this.log(msg, Logger.LogLevels.ERROR, "ERROR");
	critical = (...msg: unknown[]) =>
		this.log(msg, Logger.LogLevels.CRITICAL, "CRITICAL");

	shout = (...msg: unknown[]) => this.log(msg, 999);
	speak = (...msg: unknown[]) => this.log(msg, Logger.LogLevels.WARN);
	whisper = (...msg: unknown[]) => this.log(msg, Logger.LogLevels.INFO);
}

function createLogger(config: {
	name: string;
	level: (typeof Logger.LogLevels)[keyof typeof Logger.LogLevels];
	writer?: WriterPrototype;
	color?: [RGB, RGB];
}) {
	return new Logger({
		name: config.name,
		level: config.level,
		writer:
			config.writer ??
			(isColorSupported ? FancyConsoleWriter : SimpleConsoleWriter),
		color: config.color ?? gradients.orange,
	});
}

const Levels = Logger.LogLevels;

export {
	gradients,
	RGB,
	Writer,
	WriterPrototype,
	FancyConsoleWriter,
	SimpleConsoleWriter,
	Logger, 
	Levels,
	createLogger,
};