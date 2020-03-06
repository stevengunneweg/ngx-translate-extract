import * as os from 'os';
import * as fs from 'fs';
import * as braces from 'braces';

export function normalizeHomeDir(path: string): string {
	if (path.substring(0, 1) === '~') {
		return `${os.homedir()}/${path.substring(1)}`;
	}
	return path;
}

export function expandPattern(pattern: string): string[] {
	return braces(pattern, { expand: true });
}

export function normalizePaths(patterns: string[], defaultPatterns: string[] = []): string[] {
	return patterns.map(pattern =>
		expandPattern(pattern).map(path => {
			path = normalizeHomeDir(path);
			if (fs.existsSync(path) && fs.statSync(path).isDirectory()) {
				return defaultPatterns.map(defaultPattern => path + defaultPattern);
			}
			return path;
		}).flat()
	).flat();
}
