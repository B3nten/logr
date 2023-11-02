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
