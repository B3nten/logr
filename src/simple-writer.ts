import { Message, Writer } from "./writer";

export class SimpleConsoleWriter implements Writer {
	constructor(
		public name: string,
		public level: number
	) {}
	write(msg: Message): void {
		console.log(
			msg.timestamp,
			`[${this.name}]`,
			msg.type.name,
			...msg.content
		);
	}
}
