import {Vowels} from "./cutwords/vowels";
import {Word} from "./cutwords/word";

export class SyllableCutter {
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
