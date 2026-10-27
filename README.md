# The One Above Them

Strona z postaciami (fursonami) i projektami. Statyczna, bez zależności z zewnątrz, hostowana na GitHub Pages.

- `index.html` + `styles.css` — strona główna: postacie, projekty (muzyka, TTRPG, przyszłe streamy), kontakt
- `vince.html`, `chip.html`, `ragnar.html`, `toro.html` — strony postaci z Cancrosa Files
- `myr.html`, `zarin.html` — strony postaci z Cancrosa Verse (głęboki kosmos, kanon roboczy)
- `<postać>.css` — każda postać ma własny styl (np. `toro.css`); wspólna mechanika jest w `char.css`
- `char.js` — wspólny skrypt: przełącznik PL/EN (zapamiętywany, wspólny ze stroną główną), komunikaty,
  podgląd obrazków, pojawianie się sekcji przy przewijaniu, podświetlanie menu
- `img/` — portrety i arty (zawsze z podpisem autora)
- `fonts/` — czcionki (SIL Open Font License, pliki licencji obok); reguły `@font-face` są w `fonts/fonts.css`

Teksty są w dwóch językach: każdy fragment ma parę `<span lang="en">…</span><span lang="pl">…</span>`
(albo dwa akapity z `lang`), a CSS pokazuje tylko wybrany język. Teksty z JS idą przez `CHAR.t({ en, pl })`.

Miejsca do uzupełnienia są oznaczone ✎ albo komentarzem w kodzie.

Własna domena: plik `CNAME` z nazwą domeny + rekordy DNS według
https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site
