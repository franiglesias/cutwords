# cutwords

A TypeScript project initialized with testing and code quality tools.

## Challenge

Implement a Spanish Syllable Cutter

### Regla 1

Una consonante y la vocal siguiente se pronuncian en una misma sílaba, por ejemplo, ma–ra-ca, ti–je-ra.

Recuerda que la letra h no se pronuncia, salvo cuando se combina con la letra c para formar la ch. Ten en cuenta que la ch, la ll y la rr, aunque se escriben con dos letras  cada una (por lo que se llaman «dígrafos»), se pronuncian como un solo sonido cada una, y eso es lo que cuenta a la hora de dividir las sílabas, por ejemplo, chi-llar, cho-rro.

### Regla 2

Cuando se encuentran dos consonantes entre dos vocales, generalmente la primera forma sílaba con la vocal anterior y la segunda forma sílaba con la vocal siguiente, por ejemplo, cam-po, sal-to, har-to, an-da.

### Regla 3

Cuando se encuentran tres consonantes entre dos vocales, generalmente las dos primeras forman sílaba con la vocal anterior y la tercera forma sílaba con la vocal siguiente, por ejemplo, ins-ta, obs-ti-na-do, su-pers-ti-ción.

### Excepciones a las reglas 2 y 3
  Los siguientes pares de consonantes (grupos consonánticos) se pronuncian normalmente en una sola sílaba: bl, br, cl, cr, dr, fl, fr, gl, kl, gr, pl, pr, tr. Ejemplos:
  ha-blar, te-cla, sa-cro, si-glo, ma-dre, de-trás, a-grio;
  hom-bre, in-flar, san-gre, du-pli-ca-do, com-pren-der, en-trar.

### Regla 4

Cuando se encuentran cuatro consonantes entre dos vocales, las dos primeras forman sílaba con la vocal anterior y las dos últimas forman sílaba con la vocal siguiente, por ejemplo, cons-truir, trans–plan-te, abs-trac-to, obs-truir.

### Regla 5

Cuando una i o una u están junto a otra vocal, normalmente se pronuncian las dos en una sola sílaba, por ejemplo, hay, fui, pues, cual.

### Regla 6

Cuando se juntan dos vocales, pero ninguna de ellas es ni i ni u, normalmente se pronuncian cada una en una sílaba distinta, por ejemplo,  a-é-re-o, O-es-te, bo-a, Bil-ba-o.

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
