import { FormattedString, RGB } from "./formatting";
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
export declare abstract class Writer {
    name: string;
    level: number;
    constructor(name: string, level: number);
    abstract write(msg: Message): void;
}
export type WriterPrototype = new (name: string, level: number) => Writer;
/****************************************************************************************
 * FancyConsoleWriter
 *****************************************************************************************/
export declare class FancyConsoleWriter implements Writer {
    name: string;
    level: number;
    formattedName: FormattedString;
    levels: Record<string, FormattedString>;
    constructor(name: string, level: number, color?: [RGB, RGB]);
    write(msg: Message): void;
}
/****************************************************************************************
 * SimpleConsoleWriter
 *****************************************************************************************/
export declare class SimpleConsoleWriter implements Writer {
    name: string;
    level: number;
    constructor(name: string, level: number);
    write(msg: Message): void;
}
