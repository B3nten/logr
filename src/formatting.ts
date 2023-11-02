import { interpolateRGB, type RGB } from "./gradients";

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
