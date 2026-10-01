# FRAME/24

Prezentacioni sajt i Vimeo portfolio za video editing studio, sa zaštićenim admin panelom.

## Lokalno pokretanje

```bash
npm install
npm run dev
```

Sajt će biti na `http://localhost:3000`, a admin na `/admin`. Lokalna početna lozinka je `markoadmin`.

Kopirajte `.env.example` u `.env.local` i obavezno podesite jake vrednosti za:

```env
ADMIN_PASSWORD=
SESSION_SECRET=
```

## Video radovi

U admin panelu može da se unese pun Vimeo link ili samo numerički Vimeo ID. Moguće je dodavanje, izmena, brisanje i promena redosleda. Svi radovi prikazuju se na `/work`. Oznaka izdvojenog rada ostaje sačuvana, ali je novi raspored početne stranice ne koristi.

Javne stranice su `/`, `/work` i `/contact`, a admin prijava je `/admin/login`. Stare srpske adrese trajno preusmeravaju na engleske.

## Tekstovi i video u uvodu

Tekstovi početne stranice nalaze se u `src/lib/site-content.ts`.
Polje `hero.videoUrl` prihvata direktan MP4 URL ili lokalnu putanju, npr. `/videos/hero.mp4` za fajl u `public/videos/hero.mp4`.
Polje `hero.poster` određuje zamensku fotografiju. Dok je `videoUrl` prazan, prikazuje se samo fotografija. Video se prikazuje bez zvuka, u petlji, sa kontrolom za pauzu i poštovanjem sistemskog podešavanja za smanjeno kretanje.

Vimeo linkovi za portfolio i dalje se unose kroz admin. Uvodni video je zaseban izvor. Tekstovi studija i formati rada u donjim sekcijama su zamenski sadržaj, ne preporuke stvarnih klijenata.

## Produkcija

Lokalno se koristi SQLite fajl `local.db`. Bez Turso podešavanja Vercel koristi privremenu `/tmp` bazu, što je dovoljno za demonstraciju admina, ali izmene mogu nestati pri sledećem pokretanju serverless instance. Za trajne izmene napravite Turso/libSQL bazu i dodajte sledeće environment promenljive na hostingu:

```env
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=...
ADMIN_PASSWORD=...
SESSION_SECRET=...
```

Zatim pokrenite `npm run build`. Tabela i početni demo radovi biće automatski kreirani pri prvom pristupu praznoj bazi.
