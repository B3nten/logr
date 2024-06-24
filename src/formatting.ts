export type RGB = [b: number, g: number, r: number];

export type Gradients = {
	[key: string]: [a: RGB, b: RGB];
};

export const gradients = {
	purple: [
		[247, 81, 172],
		[55, 0, 231],
	],
	sunset: [
		[231, 0, 187],
		[255, 244, 20],
	],
	gray: [
		[235, 244, 245],
		[181, 198, 224]
	],
	orange: [
		[255, 147, 15],
		[255, 249, 91]
	],
	lime: [
		[89, 209, 2],
		[243, 245, 32]
	],
	blue: [
		[31, 126, 161],
		[111, 247, 232]
	],
	red: [
		[244, 7, 82],
		[249, 171, 143]
	]
} satisfies Gradients;

const lerp = (start: number, end: number, factor: number): number =>
	start + factor * (end - start);

export function interpolateRGB(startColor: RGB, endColor: RGB, t: number): RGB {
	if (t < 0) { return startColor };
	if (t > 1) { return endColor };
	return [
		Math.round(lerp(startColor[0], endColor[0], t)),
		Math.round(lerp(startColor[1], endColor[1], t)),
		Math.round(lerp(startColor[2], endColor[2], t)),
	];
}
function isBrowser(): boolean {
	return (
		//@ts-ignore
		typeof window !== "undefined" && typeof globalThis.Deno === "undefined"
	);
}

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

export function formatAnsi(
	string: string,
	styles: StyleOptions = {}
): FormattedString {
	let c = "";
	if (styles.bold) c += "1;";
	if (styles.italic) c += "3;";
	if (styles.underline) c += "4;";
	if (styles.foreground) c += `38;2;${styles.foreground.join(";")};`;
	if (styles.background) c += `48;2;${styles.background.join(";")};`;
	while (c.endsWith(";")) c = c.slice(0, -1);
	return {
		content: `\x1b[${c}m${string}\x1b[0m\x1b[0m`,
		styles: [],
	};
}

function formatBrowser(
	string: string,
	options: StyleOptions = {}
): FormattedString {
	const styles = [];
	if (options.bold) styles.push("font-weight: bold;");
	if (options.italic) styles.push("font-style: italic;");
	if (options.underline) styles.push("text-decoration: underline;");
	if (options.foreground)
		styles.push(`color: rgb(${options.foreground.join(", ")});`);
	if (options.background)
		styles.push(`background-color: rgb(${options.background.join(", ")});`);
	if (options.size) styles.push(`font-size: ${options.size}px;`);
	return {
		content: `%c${string}`,
		styles: [styles.join("")],
	};
}

export function format(
	string: string,
	options: StyleOptions = {}
): FormattedString {
	if (isBrowser()) return formatBrowser(string, options);
	return formatAnsi(string, options);
}

export function stringGradient(
	str: string,
	gradient: [a: RGB, b: RGB],
	options?: StyleOptions
): FormattedString {
	const result: FormattedString = {
		content: "",
		styles: [],
	};
	if (isBrowser()) {
		result.content = "%c" + str.split("").join("%c");
		for (let i = 0; i < str.length; i++) {
			const g = interpolateRGB(gradient[0], gradient[1], i / str.length);
			result.styles.push(formatBrowser(str[i], { ...options, foreground: g }).styles[0]);
		}
		return result;
	}
	for (let i = 0; i < str.length; i++) {
		result.content += formatAnsi(str[i], {
			...options,
			foreground: interpolateRGB(
				gradient[0],
				gradient[1],
				i / str.length
			),
		}).content;
	}
	return result;
}
