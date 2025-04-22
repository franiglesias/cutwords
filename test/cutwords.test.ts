import {describe, expect, it} from "vitest";


class Vowels {
    private vowels = ['a', 'e', 'i', 'o', 'u'];

    includes(candidate: string) {
        return this.vowels.includes(candidate)
    }
}

class Digraphs {
    private digraphs = ['rr',
        'll',
        'ch'];

    includes(candidate: string) {
        return this.digraphs.includes(candidate)
    }
}

class Word {
    private word: string;

    constructor(word: string) {
        this.word = word;
    }

    length() {
        return this.word.length
    }

    letters(): string[] {
        return this.word.split('')
    }

    hasDigraphAfter(pos: number): boolean {
        const digraphs = new Digraphs()
        let candidate = this.substr(pos, 2);
        return digraphs.includes(candidate);
    }

    hasInseparableGroupAfter(pos: number): boolean {
        const groups = ['bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'kl', 'gr', 'pl', 'pr', 'tr']
        return groups.includes(this.substr(pos, 2));
    }

    private substr(pos: number, size: number) {
        return this.word.substring(pos + 1, pos + 1 + size);
    }

    hasConsonantsAfter(pos: number, size: number) {
        const vowels = new Vowels();
        const items = this
            .substr(pos, size)
            .split('')
            .filter(item => !vowels.includes(item))

        return items.length == size
    }
}

class SyllableCutter {
    private vowels = new Vowels();

    cut(wordToCut: string): string[] {
        let parts = [];
        let part = '';
        const word = new Word(wordToCut)
        const lettersQueue = word.letters()

        while (lettersQueue.length > 0) {
            const letter = lettersQueue.shift()!

            part += letter;

            const pos = word.length() - lettersQueue.length - 1

            if (this.vowels.includes(letter)) {
                if (word.hasDigraphAfter(pos)) {
                    part += ''
                } else if (word.hasInseparableGroupAfter(pos)) {
                    part += ''
                } else if (word.hasConsonantsAfter(pos, 3)) {
                    part += lettersQueue.shift()! + lettersQueue.shift()!;
                } else if (word.hasConsonantsAfter(pos, 2)) {
                    part += lettersQueue.shift();
                }
                parts.push(part)
                part = ''
            }
        }

        const remaining = part + lettersQueue.join('')
        parts[parts.length - 1] += remaining;

        return parts
    }
}

describe('SyllableCutter', () => {
    const cutter = new SyllableCutter()

    describe('Rule 1: consonant + vowel go in the same syllable', () => {
        const examples: { word: string; expected: string[] }[] = [
            {word: 'maraca', expected: ['ma', 'ra', 'ca']},
            {word: 'tijera', expected: ['ti', 'je', 'ra']},
        ]

        examples.forEach(
            (example) => {
                it(`should separate ${example.word} as ${example.expected}`, () => {
                    expect(cutter.cut(example.word)).toEqual(example.expected)
                });
            }
        )
    });

    describe('Rule 1.b: dígrafos + vowel go in the same syllable', () => {
        const examples: { word: string; expected: string[] }[] = [
            {word: 'chorro', expected: ['cho', 'rro']},
            {word: 'chillar', expected: ['chi', 'llar']},

        ]

        examples.forEach(
            (example) => {
                it(`should separate ${example.word} as ${example.expected}`, () => {
                    expect(cutter.cut(example.word)).toEqual(example.expected)
                });
            }
        )
    });

    describe('Rule 2: two consonants between vowels go into different syllables', () => {
        const examples: { word: string; expected: string[] }[] = [
            {word: 'campo', expected: ['cam', 'po']},
            {word: 'salto', expected: ['sal', 'to']},
            {word: 'harto', expected: ['har', 'to']},
            {word: 'anda', expected: ['an', 'da']},
        ]

        examples.forEach(
            (example) => {
                it(`should separate ${example.word} as ${example.expected}`, () => {
                    expect(cutter.cut(example.word)).toEqual(example.expected)
                });
            }
        )
    });

    describe('Rule 3: three consonants between vowels, separate two - one', () => {
        const examples: { word: string; expected: string[] }[] = [
            {word: 'insta', expected: ['ins', 'ta']},
            {word: 'obstinado', expected: ['obs', 'ti', 'na', 'do']},
        ]

        examples.forEach(
            (example) => {
                it(`should separate ${example.word} as ${example.expected}`, () => {
                    expect(cutter.cut(example.word)).toEqual(example.expected)
                });
            }
        )
    });

    describe('Rule 2-3: manage inseparable groups', () => {
        const examples: { word: string; expected: string[] }[] = [
            {word: 'tecla', expected: ['te', 'cla']},
            {word: 'sacro', expected: ['sa', 'cro']},
            {word: 'madre', expected: ['ma', 'dre']},
        ]

        examples.forEach(
            (example) => {
                it(`should separate ${example.word} as ${example.expected}`, () => {
                    expect(cutter.cut(example.word)).toEqual(example.expected)
                });
            }
        )
    });
})