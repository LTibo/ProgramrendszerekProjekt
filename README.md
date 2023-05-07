# ProgramrendszerekProjekt

## Indítás

1. Gyökérmappában "npm install"
2. .\server mappában "npm install"
3. .\angular/PRF mappában "npm install"
4. .\angular\PRF\src\app\environment.ts fájlba a WEATHER_API_KEY értékének a mellékelt API kulcs másolása (percenként 60 hívásos limit van rajta)
5. .\server "docker run --name weatherMongo -p 27017:27017 -v ./mongo:/data/db -d mongo"
6. .\server mappában "node .\server\server.js"
7. .\angular/PRF mappában "ng serve" (vagy "npx ng serve" ha nincs globálisan installálva)

Ezek után <http://localhost:4200> -on fog futni a frontend

## Projekt célja

Egyszerű városonkénti időjárás lekérése akár 5 napos előrejelzéssel.

## Használat

Indításkor a következő felület jelenik meg:
![Hmepage](./screenshots/homepage.jpg)

A login gombbal (jobb felső sarok) lehet bejelentkezni. Az adatbázihoz való kapcsolódásnál létrjött 3 db user account:

- (admin account) email: "admin@adminmail.com", pw: "admin123"
- (user account)  email: "asd@asd.com", pw: "asd"
- (user account)  email: "asd2@asd.com", pw: "asd

Az admin accounttal való bejelentkezés után, visszatér a home felületre, ahol egy szeged kártya fog megjelenni. Az input mezőben bármilyen városra rá tudunk keresni, a "Get Weather" gombbal hozzáadhatunk városokat a kezdőképernyőhöz, az utoljára megjelenített városok a következő bejelentezéskor is meg fognak jelenni. A város kártyákra kattintáskor egy másik felületre kerülünk, ahol 5 napos előrejezést láthatunk az adott várásról.
![Hmepage](./screenshots/forecast_5day.jpg)

A "Back" gombbal tudunk visszalépni a kezdőképernyőre. A "Favorites" gombbal egy kedvencek felületre vezet, ahol láthatóak a  saját (és másik felhasználók)  kedvenc városai.
![Hmepage](./screenshots/favorit_page.jpg)

Amennyiben az admin accounttal vagyunk bejelentkezve, a jobb felső sarokban látható egy Admin gomb is, ami az admin oldalra visz. Itt kitörölehtünk bármely felhasználót, az Admin felhasználón kívül.
![Hmepage](./screenshots/admin_page.jpg)

A "Register" gombbal új felhasználót is létrehozhatunk, de ezek alap, nem admin felhasználók lesznek.

## Követelmények

## Backend

- Angular dinamikusan hostolja a frontendet
- Az alkalmazás kapcsolódik egy mongodb instance-hoz
- Az alkalmazás képes bootstrappelni, vagyis MongoDB-t alap userekkel feltölteni (user és FavoriteCity sémákat is)
- A szerver megvalósít legalább két modellt, melyek sémája egyértelműen definiált (user és FavoriteCity)
- Adott legalább két olyan adatbázis hook, amelyek a modellek mentése vagy lekérése közben futnak le (jelszó mentésénél titkosítás)
- A szerver megvalósít egy lokális autentikációs stratégiát  (passportjs segítségével)
- A szerver kezeli a login sessiont (szintén passportjs)
- A szerver rendelkezik a két kezelt modell CRUD interfészeivel, illetve egy login, logout, register route-tal  (a két Mongo sémára, authRoutes.js)

## Frontend

- A frontend kommunikál a backenddel (pl loginnál és regisztrációnál, auth.service.ts fájlban)
- A frontend rendelkezik legalább egy regisztráció, egy login, egy főoldal/terméklista, egy admin felület, egy termék részletező és egy egyéb komponenssel, melyek fel vannak töltve megfelelő tartalommal (admin.component.html, favorites.component.html, forecast.component.html, login.component.html, registration.component.html)
- A frontend a bejelentkezéshez a backend megfelelő végpontjait szólítja meg (auth.service.ts, authRoutes.js)
- A backenddel való kommunikáció elemei ki vannak szervezve service-ekbe (auth.service.ts, favorites.service.ts, weather.service.ts)
- Van authguard, amely védi a login, register utáni route-okat és az admin felületét (auth.guard.ts, fav.guard.ts)

## Dokumentáció

- Tartalmazza a fejlesztési naplót, mely logokkal bemutatja a fejlesztés menetét (GitHub commit history)
- Mindkét komponens létrejött és nem csak órai kódok másolata / üres template, a logokból és a forráskódokból is látszódik a befektetett munka (legtöbb létrejött fájl)
- Vannak képernyőképek és leírások, a dokumentációból egyértelmű a projekt célja, működése és használata (fentebb)
