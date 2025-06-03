import {Digraphs} from "./digraphs";
import {InseparableGroups} from "./inseparableGroups";
import {Vowels} from "./vowels";
import {Diptongues} from "./diptongues";

export class Word {
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
        return new Diptongues().includes(candidate);
    }

    private nextSubstr(pos: number, size: number) {
        return this.word.substring(pos + 1, pos + 1 + size);
    }
}
