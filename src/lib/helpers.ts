/**
 * Normalize a path by collapsing duplicate slashes,
 * removing trailing slashes (except root),
 * and defaulting to "/".
 */
export const normalizePath = (path: string = ""): string => {
	if (!path) return "/";
	return path
		.replace(/\/{2,}/g, "/") // collapse multiple slashes anywhere
		.replace(/(.+)\/$/, "$1"); // remove trailing slash (unless the whole string is just "/")
};

/**
 * Seeded PRNG returning values in [0, 1).
 */
export const seededRandom = (seed: number): number => {
	let value = seed % 2147483647;
	value = (value * 16807) % 2147483647;
	return (value - 1) / 2147483646;
};
