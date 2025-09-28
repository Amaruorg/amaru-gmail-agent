/**
 * Seeded PRNG returning values in [0, 1).
 */
export const seededRandom = (seed: number): number => {
	let value = seed % 2147483647;
	value = (value * 16807) % 2147483647;
	return (value - 1) / 2147483646;
};
