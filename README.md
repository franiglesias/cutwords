# Spanish Syllable Separator

This is an exercise to practice TDD focusing on the selection of examples. The nature of the problem adds some difficult to choose the right examples. This happens because several separation rules can be applied to the same word. This can require more than one reason for a test to fail.

The goal of the exercise is to help you to develop a sense for identifying good examples for making new tests which can fail for a unique reason.

## The Challenge

Imagine that you are working in some text visualization tool that requires hyphenation. To achieve that, you will need and algorithm to separate Spanish words into syllables.

Spanish language has a bunch of rules for separating a word into Syllables. They are described in different ways depending on the source of information. We decided to use the following, adapted from this document by [Instituto Cervantes](https://cvc.cervantes.es/aula/didactired/anteriores/octubre_08/06102008_05.htm)

### Rule 1

A consonant and the following vowel are pronounced in the same syllable, for example:

```
ma–ra-ca
ti–je-ra
```

Remember that the letter `h` is not pronounced except when combined with the letter `c` to form `ch`. Keep in mind that `ch`, `ll`, and `rr`, although written as two letters each (hence called "digraphs"), are pronounced as a single sound each, and this is what counts when dividing syllables, for example:

```
chi-llar
cho-rro
```

### Rule 2

When two consonants are found between two vowels, the first generally forms a syllable with the preceding vowel and the second forms a syllable with the following vowel, for example:

```
cam-po
sal-to
har-to
an-da
```

### Rule 3

When three consonants are found between two vowels, the first two generally form a syllable with the preceding vowel, and the third forms a syllable with the following vowel, for example:


```
ins-ta
obs-ti-na-do
su-pers-ti-ción
```

### Exceptions to Rules 2 and 3

The following consonant pairs (consonant groups) are normally pronounced as a single syllable: `bl, br, cl, cr, dr, fl, fr, gl, kl, gr, pl, pr, tr`. Examples:


```
ha-blar
te-cla
sa-cro
si-glo
ma-dre
de-trás
a-grio
hom-bre
in-flar
san-gre
du-pli-ca-do
com-pren-der
en-trar
```

### Rule 4

When four consonants are found between two vowels, the first two form a syllable with the preceding vowel, and the last two form a syllable with the following vowel, for example:

```
cons-truir
trans–plan-te
abs-trac-to
obs-truir
```

### Rule 5

When an `i` or a `u` are next to another vowel, they are usually pronounced as a single syllable, for example:

```
hay 
fui
pues
cual
```

### Rule 6

When two vowels come together, but neither of them is `i` nor `u`, they are usually pronounced in a different syllable, for example: 

```
a-é-re-o
O-es-te
bo-a
Bil-ba-o
```

## Variants

For starting, we suggest to forgot about tildes and capitalized words.

## Prerequisites

- Node.js (version 18 or higher recommended)
- npm (version 8 or higher recommended)

## Installation

```bash
npm install
```

## Available Commands

- `npm run build`: Compile TypeScript files to JavaScript
- `npm run test`: Run tests with Vitest
- `npm run lint`: Run Biome linter
- `npm run format`: Format code with Biome

## Development

The project uses:
- TypeScript for type-safe JavaScript
- Vitest for testing
- Biome for linting and formatting

Source code goes in `src/` directory and tests in `test/` directory.
