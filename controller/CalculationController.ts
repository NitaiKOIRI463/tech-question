import { Series } from "../types";

export function fibonacci(n: number, series: Series = {}): number {
    if (n <= 1) {
        return n;
    } else if (!(n in series)) {
        series[n] = fibonacci(n - 1, series) + fibonacci(n - 2, series);
    }
    return series[n];
}

export function getBalancedSubstrings(S: string): string[] {
    const result: string[] = [];
    // Iterate through all substrings
    for (let i = 0; i < S.length - 1; i++) {
        for (let j = i + 1; j < S.length; j++) {
            const substring = S.substring(i, j + 1);
            if (isBalanced(substring)) {
                result.push(substring);
            }
        }
    }
    // Find the longest balanced substrings
    const maxLength = result.reduce((max, str) => Math.max(max, str.length), 0);
    return result.filter(str => str.length === maxLength);
}

export function migrateRings(N: number, A: number[], B: number[], C: number[]): string[] {
    const steps: string[] = [];
    // Helper function to move a ring from one plate to another
    const moveRing = (from: number[], to: number[], ring: number): void => {
        from.splice(from.indexOf(ring), 1);
        to.push(ring);
        steps.push(`${ring}: ${from === A ? 'A' : from === B ? 'B' : 'C'} to ${to === A ? 'A' : to === B ? 'B' : 'C'}`);
    };
    // Recursive function to move N rings from source to destination using auxiliary
    const towerOfHanoi = (n: number, source: number[], destination: number[], auxiliary: number[]): void => {
        if (n === 1) {
            moveRing(source, destination, source[0]);
        } else {
            towerOfHanoi(n - 1, source, auxiliary, destination);
            moveRing(source, destination, source[0]);
            towerOfHanoi(n - 1, auxiliary, destination, source);
        }
    };
    
    towerOfHanoi(N, A, B, C);
    return steps;
}

// Helper function to check if a string is balanced
const isBalanced = (substring: string): boolean => {
    const charCount = new Map<string, number>();
    for (const char of substring) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    const counts = Array.from(charCount.values());
    return counts.length === 2 && counts[0] === counts[1];
};

