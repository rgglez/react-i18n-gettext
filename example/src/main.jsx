import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { GettextProvider, sprintf, useGettext } from "@rgglez/react-i18n-gettext";

import de from "./i18n/de-DE/messages.json";
import es from "./i18n/es-MX/messages.json";
import fr from "./i18n/fr-FR/messages.json";

// English is the source language: missing translations return the msgid.
const catalogs = { "de-DE": de, "es-MX": es, "fr-FR": fr };
const languages = { "de-DE": "Deutsch", "en-US": "English", "es-MX": "Español", "fr-FR": "Français" };

function Page() {
  const { _, _n, lang, setLang } = useGettext();
  const [files, setFiles] = useState(1);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = _("React gettext example");
  }, [lang, _]);

  return (
    <>
      <h1>react-i18n-gettext</h1>
      <p>{_("This is an example of a static string")}</p>
      <p>{sprintf(_("Hello %s, you won $%s"), "Roger Rabbit", 1000)}</p>

      <label>
        {_("Files:")}{" "}
        <input type="number" min="0" value={files} onChange={e => setFiles(Number(e.target.value))} />
      </label>
      <p>{sprintf(_n("%d file deleted", "%d files deleted", files), files)}</p>

      {Object.entries(languages).map(([code, name]) => (
        <button key={code} onClick={() => setLang(code)} disabled={code === lang}>
          {name}
        </button>
      ))}
      <p>{sprintf(_("Current language: %s"), lang)}</p>
      <hr />
      <a href="https://github.com/rgglez/react-i18n-gettext">https://github.com/rgglez/react-i18n-gettext</a>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GettextProvider lang="es-MX" catalogs={catalogs}>
      <Page />
    </GettextProvider>
  </StrictMode>
);
