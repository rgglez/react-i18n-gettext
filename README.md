# react-i18n-gettext

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

[gettext](https://www.gnu.org/software/gettext/) translations for
[React](https://react.dev/): a provider and a hook with live language
switching. Built on [@rgglez/i18n-gettext](https://github.com/rgglez/i18n-gettext),
the same core as [svelte-i18n-gettext](https://github.com/rgglez/svelte-i18n-gettext)
and [astro-i18n-gettext](https://github.com/rgglez/astro-i18n-gettext), so the
same `.json` catalogs work everywhere.

## Install

```bash
npm install @rgglez/react-i18n-gettext
```

Requires React 18 or later.

## Usage

Wrap the tree once:

```tsx
import { GettextProvider } from "@rgglez/react-i18n-gettext";
import de from "./i18n/de-DE/messages.json";
import es from "./i18n/es-MX/messages.json";

const catalogs = { "de-DE": de, "es-MX": es };

export function App() {
  return (
    <GettextProvider lang="es-MX" catalogs={catalogs}>
      <Page />
    </GettextProvider>
  );
}
```

Translate anywhere below it:

```tsx
import { sprintf, useGettext } from "@rgglez/react-i18n-gettext";

function Page() {
  const { _, _n, lang, setLang } = useGettext();
  return (
    <>
      <p>{_("This is an example of a static string")}</p>
      <p>{sprintf(_("Hello %s, you won $%s"), name, prize)}</p>
      <p>{sprintf(_n("One file deleted", "%d files deleted", n), n)}</p>
      <button onClick={() => setLang("de-DE")}>Deutsch</button>
    </>
  );
}
```

`setLang` re-renders every consumer with the new language. A new `lang` prop
on the provider (for example after a route change) replaces any language set
with `setLang`. Define `catalogs` outside the component or memoize it: a new
object on every render rebuilds the translator.

The language is React state, not a module global, so the provider is safe for
server rendering (Next.js, Remix, React Router) with concurrent requests.

## API

| Export | Description |
| :----- | :---------- |
| `<GettextProvider lang catalogs>` | Provides translations to its subtree |
| `useGettext()` | `{ _, _n, lang, setLang, hasTranslations }`; throws outside a provider |
| `sprintf`, `vsprintf` | Re-exported from the core |

```ts
_(msgid, msgctxt = "app")
_n(msgid, msgidPlural = "", count = 0, msgctxt = "app")
```

Missing translations return the msgid. Locales resolve exactly first, then by
primary language (`es` ↔ `es-MX`).

## Catalogs

Catalogs are gettext `.po` files converted to gettext-parser JSON with
[gettext-po2json](https://github.com/rgglez/gettext-po2json) and the `app`
context. Extract strings with `xgettext` (gettext 0.23+ for `-L TSX`):

```bash
xgettext -o messages.pot -L TSX --from-code=utf-8 --no-wrap \
  --keyword=_ --keyword=_n:1,2 src/**/*.tsx
perl po2json.pl --po es-MX.po --json es-MX/messages.json --context app
```

## Development

```bash
bun install
bun test src
bun run build
```

## License

Copyright (c) 2026 Rodolfo González González.

Licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
license. Read the [LICENSE](LICENSE) file.
