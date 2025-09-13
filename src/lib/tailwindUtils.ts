import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const mergeClasses = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};
