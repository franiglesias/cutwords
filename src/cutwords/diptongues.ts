export class Diptongues {
    private diptongues = ['ua', 'ue', 'ui', 'uo', 'ia', 'ie', 'io', 'iu', 'au', 'eu', 'iu', 'ou', 'ai', 'ei', 'oi', 'ui']

    includes(candidate: string) {
        return this.diptongues.includes(candidate)
    }
}
