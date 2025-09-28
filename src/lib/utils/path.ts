/**
 * Normalize a path by collapsing duplicate slashes,
 * removing trailing slashes (except root),
 * and defaulting to "/".
 */
export const normalizePath = (path: string = ""): string => {
	if (!path) return "/";
	return path.replace(/\/{2,}/g, "/").replace(/(.+)\/$/, "$1");
};
