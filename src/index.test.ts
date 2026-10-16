import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { GettextProvider, sprintf, useGettext } from "./index";

const catalogs = {
  "es-MX": {
    translations: {
      app: {
        Hello: { msgid: "Hello", msgstr: ["Hola"] },
        "%1$s, welcome": { msgid: "%1$s, welcome", msgstr: ["Bienvenida, %1$s"] },
      },
    },
  },
};

function Greeting() {
  const { _, lang } = useGettext();
  return createElement("p", null, `${lang}:${_("Hello")}:`, sprintf(_("%1$s, welcome"), "Ana"));
}

test("renders translations from the provider's language", () => {
  const render = (lang: string) =>
    renderToString(
      createElement(GettextProvider, { lang, catalogs }, createElement(Greeting))
    );
  assert.match(render("es"), /es:Hola:.*Bienvenida, Ana/);
  assert.match(render("de"), /de:Hello:.*Ana, welcome/);
});

test("useGettext outside a provider fails loudly", () => {
  assert.throws(() => renderToString(createElement(Greeting)), /GettextProvider/);
});
