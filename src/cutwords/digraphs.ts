export class Digraphs {
    private digraphs = ['rr',
        'll',
        'ch'];

    includes(candidate: string) {
        return this.digraphs.includes(candidate)
    }
}
