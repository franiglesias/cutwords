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

class InseparableGroups {
    private groups = ['bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'kl', 'gr', 'pl', 'pr', 'tr']

    includes(candidate: string) {
        return this.groups.includes(candidate)
    }
}

class Diptongues {
    private diptongues = ['ua', 'ue', 'ui', 'uo', 'ia', 'ie', 'io', 'iu', 'au', 'eu', 'iu', 'ou', 'ai', 'ei', 'oi', 'ui']

    contains(candidate: string) {
        return this.diptongues.includes(candidate)
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
        let candidate = this.nextSubstr(pos, 2);
        return new Digraphs().includes(candidate);
    }

    hasInseparableGroupAfter(pos: number): boolean {
        return new InseparableGroups().includes(this.nextSubstr(pos, 2));
    }

    hasConsonantsAfter(pos: number, size: number) {
        const items = this
            .nextSubstr(pos, size)
            .split('')
            .filter(item => !new Vowels().includes(item))

        return items.length == size
    }

    isDiptongue(pos: number) {
        const candidate = this.word.substring(pos, pos + 2);
        return new Diptongues().contains(candidate);

    }

    private nextSubstr(pos: number, size: number) {
        return this.word.substring(pos + 1, pos + 1 + size);
    }
}

class SyllableCutter {
    private vowels = new Vowels();

    cut(wordToCut: string): string[] {
        const word = new Word(wordToCut)

        let parts = [];
        let part = '';
        const lettersQueue = word.letters()

        while (lettersQueue.length > 0) {
            const letter = lettersQueue.shift()!

            const pos = word.length() - lettersQueue.length - 1

            if (!this.vowels.includes(letter)) {
                part += letter
                continue
            }

            if (word.hasDigraphAfter(pos)) {
                part += letter
            } else if (word.hasInseparableGroupAfter(pos)) {
                part += letter
            } else if (word.isDiptongue(pos)) {
                part += letter + lettersQueue.shift()!
            } else if (word.hasConsonantsAfter(pos, 3)) {
                part += letter + lettersQueue.shift()! + lettersQueue.shift()!;
            } else if (word.hasConsonantsAfter(pos, 2)) {
                part += letter + lettersQueue.shift();
            } else {
                part += letter
            }
            parts.push(part)
            part = ''
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

    describe('Rule 4: four consonants between vowels, separate two - two', () => {
        const examples: { word: string; expected: string[] }[] = [
            {word: 'transplante', expected: ['trans', 'plan', 'te']},
            {word: 'construir', expected: ['cons', 'truir']},
            {word: 'abstracto', expected: ['abs', 'trac', 'to']},
            {word: 'obstruir', expected: ['obs', 'truir']},

        ]

        examples.forEach(
            (example) => {
                it(`should separate ${example.word} as ${example.expected}`, () => {
                    expect(cutter.cut(example.word)).toEqual(example.expected)
                });
            }
        )
    });

    describe('Rule 5: diptongue with i, u', () => {
        const examples: { word: string; expected: string[] }[] = [
            {word: 'fui', expected: ['fui']},
            {word: 'pues', expected: ['pues']},

        ]

        examples.forEach(
            (example) => {
                it(`should separate ${example.word} as ${example.expected}`, () => {
                    expect(cutter.cut(example.word)).toEqual(example.expected)
                });
            }
        )
    });

    describe('Rule 6: hiatus', () => {
        const examples: { word: string; expected: string[] }[] = [
            {word: 'oeste', expected: ['o', 'es', 'te']},
            {word: 'boa', expected: ['bo', 'a']}
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