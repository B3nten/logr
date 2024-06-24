import { FormattedString, format, stringGradient, RGB, gradients } from "./formatting";

/****************************************************************************************
 * Writer
 *****************************************************************************************/

export type Message = {
	content: unknown[];
	timestamp: Date;
	type: {
		name?: string;
		level: number;
	};
};

export abstract class Writer {
	constructor(
		public name: string,
		public level: number
	) {}
	abstract write(msg: Message): void;
}

export type WriterPrototype = new (name: string, level: number) => Writer;

/****************************************************************************************
 * FancyConsoleWriter
 *****************************************************************************************/

export class FancyConsoleWriter implements Writer {
	formattedName: FormattedString;
	levels: Record<string, FormattedString>;
	constructor(
		public name: string,
		public level: number,
		color: [RGB, RGB] = gradients.sunset
	) {
		this.formattedName = stringGradient(`[ ${name} ]`, color);
		this.levels = {
			DEBUG: stringGradient("DEBUG", gradients.gray, { size: 12 }),
			INFO: stringGradient("INFO", gradients.blue),
			WARN: stringGradient("WARN", gradients.orange),
			SUCCESS: stringGradient("SUCCESS", gradients.lime),
			ERROR: stringGradient("ERROR", gradients.red, { bold: true }),
			CRITICAL: format("  CRITICAL  ", {
				background: [255, 0, 0],
				size: 20,
			}),
		};
	}
	write(msg: Message): void {
		const n = msg.type.name;
		const ts = format(String(msg.timestamp.getMilliseconds()), {
			foreground: [100, 100, 100],
		})
		console.log(
			this.formattedName.content + (n ? " " + this.levels[n].content : ""),
			...this.formattedName.styles,
			...(n ? this.levels[n].styles : []),
			...msg.content
		);
	}
}

/****************************************************************************************
 * SimpleConsoleWriter
 *****************************************************************************************/

export class SimpleConsoleWriter implements Writer {
	constructor(
		public name: string,
		public level: number
	) {}
	write(msg: Message): void {
		console.log(
			`[${this.name}]`,
			msg.type.name,
			...msg.content
		);
	}
}
