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