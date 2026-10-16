import {
  createContext,
  createElement,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createTranslator,
  type Catalogs,
  type Translator,
} from "@rgglez/i18n-gettext";

export {
  sprintf,
  vsprintf,
  type Catalog,
  type Catalogs,
  type Translator,
} from "@rgglez/i18n-gettext";

export interface Gettext extends Translator {
  setLang(lang: string): void;
}

const GettextContext = createContext<Gettext | null>(null);

/**
 * Provide translations to a subtree. The language lives in React state, not a
 * module global, so concurrent server renders cannot leak into each other.
 */
export function GettextProvider({
  lang: langProp,
  catalogs,
  children,
}: {
  lang: string;
  catalogs: Catalogs;
  children?: ReactNode;
}) {
  const [lang, setLang] = useState(langProp);
  // A new `lang` prop (e.g. a route change) wins over a previous setLang call.
  const [previousProp, setPreviousProp] = useState(langProp);
  if (previousProp !== langProp) {
    setPreviousProp(langProp);
    setLang(langProp);
  }
  const value = useMemo(
    () => ({ ...createTranslator(lang, catalogs), setLang }),
    [lang, catalogs]
  );
  return createElement(GettextContext.Provider, { value }, children);
}

/** `{ _, _n, lang, setLang, hasTranslations }` from the nearest provider. */
export function useGettext(): Gettext {
  const gettext = useContext(GettextContext);
  if (!gettext) throw new Error("useGettext() needs a <GettextProvider>.");
  return gettext;
}
