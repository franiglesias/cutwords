export class InseparableGroups {
    private groups = ['bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'kl', 'gr', 'pl', 'pr', 'tr']

    includes(candidate: string) {
        return this.groups.includes(candidate)
    }
}
