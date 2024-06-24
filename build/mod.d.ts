import { Writer, type WriterPrototype, FancyConsoleWriter, SimpleConsoleWriter } from "./writer";
import { gradients, type RGB } from "./formatting";
export declare const isColorSupported: boolean;
declare class Logger {
    static LogLevels: {
        readonly DEBUG: 0;
        readonly INFO: 1;
        readonly SUCCESS: 1;
        readonly WARN: 2;
        readonly ERROR: 3;
        readonly CRITICAL: 4;
        readonly PRODUCTION: 5;
    };
    constructor(options: {
        name: string;
        level: (typeof Logger.LogLevels)[keyof typeof Logger.LogLevels];
        writer: WriterPrototype;
        color?: [RGB, RGB];
    });
    log(input: unknown[], level?: number, name?: string): void;
    name: string;
    level: number;
    writer?: Writer;
    debug: (...msg: unknown[]) => void;
    info: (...msg: unknown[]) => void;
    success: (...msg: unknown[]) => void;
    warn: (...msg: unknown[]) => void;
    error: (...msg: unknown[]) => void;
    critical: (...msg: unknown[]) => void;
    shout: (...msg: unknown[]) => void;
    speak: (...msg: unknown[]) => void;
    whisper: (...msg: unknown[]) => void;
}
declare function createLogger(config: {
    name: string;
    level: (typeof Logger.LogLevels)[keyof typeof Logger.LogLevels];
    writer?: WriterPrototype;
    color?: [RGB, RGB];
}): Logger;
declare const Levels: {
    readonly DEBUG: 0;
    readonly INFO: 1;
    readonly SUCCESS: 1;
    readonly WARN: 2;
    readonly ERROR: 3;
    readonly CRITICAL: 4;
    readonly PRODUCTION: 5;
};
export { gradients, RGB, Writer, WriterPrototype, FancyConsoleWriter, SimpleConsoleWriter, Logger, Levels, createLogger, };
