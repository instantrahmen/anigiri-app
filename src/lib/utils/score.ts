import { clamp } from './';

export const scoreWithinRange = (min: number, max: number, value: number) => {
	return value >= min && value < max;
};

export const checkScore = {
	veryBad: (score: number) => scoreWithinRange(0, 2, score),
	bad: (score: number) => scoreWithinRange(2, 4, score),
	mixed: (score: number) => scoreWithinRange(4, 6, score),
	good: (score: number) => scoreWithinRange(6, 8, score),
	veryGood: (score: number) => scoreWithinRange(8, 10, score),
};

export const convertScore = (score: number) => {
	return clamp(0, 5, Math.floor(score / 2));
};
