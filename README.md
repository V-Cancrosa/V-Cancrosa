# The One Above Them

Strona z postaciami (fursonami) i projektami. Statyczna, bez zależności z zewnątrz, hostowana na GitHub Pages.

- `index.html` + `styles.css` — strona główna: niebo z konstelacją postaci, ekran wyboru postaci (przebiera się
  w styl każdej z nich), projekty (radio z muzyką, terminal TTRPG, telewizor przyszłych kanałów) i kontakt z kodem QR do Telegrama
- `vince.html`, `chip.html`, `ragnar.html`, `toro.html` — strony postaci z Cancrosa Files
- `myr.html`, `zarin.html` — strony postaci z Cancrosa Verse (głęboki kosmos, kanon roboczy)
- `<postać>.css` — każda postać ma własny styl (np. `toro.css`); wspólna mechanika (też dla strony głównej) jest w `char.css`
- `char.js` — wspólny skrypt: przełącznik PL/EN (zapamiętywany, wspólny ze stroną główną), komunikaty,
  podgląd obrazków, pojawianie się sekcji przy przewijaniu, podświetlanie menu
- `img/` — portrety i arty (zawsze z podpisem autora)
- `fonts/` — czcionki (SIL Open Font License, pliki licencji obok); reguły `@font-face` są w `fonts/fonts.css`

Teksty są w dwóch językach: każdy fragment ma parę `<span lang="en">…</span><span lang="pl">…</span>`
(albo dwa akapity z `lang`), a CSS pokazuje tylko wybrany język. Teksty z JS idą przez `CHAR.t({ en, pl })`.

## Wspólny pas „V Cancrosa”

Trzy strony tworzą jedno uniwersum i mają ten sam cienki pas na górze: **Postacie** (The One Above Them — wejście główne),
**Kanały** (V Cancrosa Entertainment) i — ukryte — **Studio** (V_Cancrosa-YouTube-Create).

- Źródło pasa: folder `uni/` w repo **V_Cancrosa-One-and-Fursonas**. Kopie: `assets/uni/` w Entertainment i `site/uni/` w YouTube-Create.
  Zmieniasz tylko źródło, potem kopiujesz cały folder `uni/` bez zmian.
- Na stronie: `<link rel="stylesheet" href="…/uni/universe.css">` i `<script src="…/uni/universe.js" data-site="fursony|entertainment|studio" defer></script>`.
- Pas chowa się przy przewijaniu w dół, wraca przy przewijaniu w górę i mówi językiem strony.
- Ukryte przejście do studia: pięć szybkich kliknięć w znak (punkt nad trzema kreskami) albo wpisanie na klawiaturze „studio”.
  To ukrycie, nie zabezpieczenie — kto zna adres, wejdzie. Studio ma `noindex`, więc wyszukiwarki go nie pokazują.

Efekty zaadaptowane z CodePen (MIT) i ich autorzy: `CREDITS.md`. W kodzie każda adaptacja ma komentarz ze źródłem.

Miejsca do uzupełnienia są oznaczone ✎ albo komentarzem w kodzie.

Własna domena: plik `CNAME` z nazwą domeny + rekordy DNS według
https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site
