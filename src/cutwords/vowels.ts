export class Vowels {
    private vowels = ['a', 'e', 'i', 'o', 'u'];

    includes(candidate: string) {
        return this.vowels.includes(candidate)
    }
}
