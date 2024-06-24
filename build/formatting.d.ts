export type RGB = [b: number, g: number, r: number];
export type Gradients = {
    [key: string]: [a: RGB, b: RGB];
};
export declare const gradients: {
    purple: [[number, number, number], [number, number, number]];
    sunset: [[number, number, number], [number, number, number]];
    gray: [[number, number, number], [number, number, number]];
    orange: [[number, number, number], [number, number, number]];
    lime: [[number, number, number], [number, number, number]];
    blue: [[number, number, number], [number, number, number]];
    red: [[number, number, number], [number, number, number]];
};
export declare function interpolateRGB(startColor: RGB, endColor: RGB, t: number): RGB;
export type FormattedString = {
    content: string;
    styles: string[];
};
type StyleOptions = {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    foreground?: RGB;
    background?: RGB;
    size?: number;
};
export declare function formatAnsi(string: string, styles?: StyleOptions): FormattedString;
export declare function format(string: string, options?: StyleOptions): FormattedString;
export declare function stringGradient(str: string, gradient: [a: RGB, b: RGB], options?: StyleOptions): FormattedString;
export {};
