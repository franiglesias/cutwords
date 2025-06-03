import {describe, expect, it} from "vitest";
import {SyllableCutter} from "../src/syllableCutter";


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
