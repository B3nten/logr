import { FormattedString, format, stringGradient } from "./formatting";
import { RGB, gradients } from "./gradients";
import { Message, Writer } from "./writer";

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
			ts.content + " " +this.formattedName.content + (n ? " " + this.levels[n].content : ""),
			...ts.styles,
			...this.formattedName.styles,
			...(n ? this.levels[n].styles : []),
			...msg.content
		);
	}
}
