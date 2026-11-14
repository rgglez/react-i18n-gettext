# React example

Vite + React app using `@rgglez/react-i18n-gettext` from the parent directory,
with `de-DE`, `es-MX` and `fr-FR` catalogs (English is the source language).

```bash
# in the repository root: the package exports dist/
bun install && bun run build

cd example
bun install
bun run dev
```

## Open locally

The site always uses the `/react-i18n-gettext/` base path from
`vite.config.js`, the same one GitHub Pages uses, so add it to the URL:

| Command | URL |
| :------ | :-- |
| `bun run dev` | <http://localhost:5173/react-i18n-gettext/> |
| `bun run build && bun run preview` | <http://localhost:4173/react-i18n-gettext/> |

Vite redirects `/` to the base path, but other URLs without it return 404.

## What it shows

The buttons call `setLang` and re-render the page in the new language
without reloading; the number input shows `_n` choosing the plural form from
each catalog's `Plural-Forms` header (French treats 0 as singular).

The `.po` files in `src/i18n/` are the sources; the `.json` catalogs next to
them are gettext-parser JSON (convert with
[gettext-po2json](https://github.com/rgglez/gettext-po2json)). Regenerate them
after editing a `.po` file:

```bash
perl po2json.pl --po src/i18n/es-MX/messages.po --json src/i18n/es-MX/messages.json --context app
```
