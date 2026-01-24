# Aplikacija za praćenje rezervacija u frizerskom salonu

Moderna web aplikacija za upravljanje frizerskim salonom. Sistem omogućava klijentima lako zakazivanje termina u realnom vremenu, dok administratorima pruža kompletan alat za upravljanje poslovanjem, frizerima i uslugama.



---

## Glavne Funkcionalnosti

### Za Klijente
* **Jednostavno za navigaciju:** Pregled svih ličnih rezervacija i njihovih statusa.
* **Automatizovano zakazivanje:** Sistem automatski prikazuje slobodne termine na osnovu radnog vremena frizera i trajanja izabrane usluge.
* **Statusi uživo:** Praćenje da li je termin potvrđen, završen ili otkazan.
* **Lako otkazivanje:** Mogućnost odustajanja od termina uz automatsko oslobađanje slota u kalendaru.

### Za Admine
* **Centralni panel:** Pregled svih rezervacija u salonu na jednom mestu.
* **Upravljanje statusima:** Potvrđivanje (`confirmed`), označavanje završenog posla (`completed`) ili beleženje nedolaska (`no-show`).
* **Menadžment usluga:** Brzo dodavanje novih usluga, promena cena i trajanja tretmana.
* **Kontrola korisnika:** Upravljanje bazom klijenata i zaposlenih frizera.

### Za Frizere
* **Pregled radnog vremena:** Jasna vidljivost sopstvenih smena i slobodnih dana.
* **Personalizovani raspored:** Direktan uvid u sopstvenu radnu listu i zakazane termine po danima.


---

## Koriscene tehnologije

| Deo Sistema | Tehnologija |
| :--- | :--- |
| **Frontend** | React.js (Vite) |
| **Stilizacija** | Tailwind CSS |
| **Backend** | Laravel 11 |
| **Baza podataka** | MySQL |
| **Autentifikacija** | Laravel Sanctum |



---

## Instalacija i Pokretanje

### Backend (Laravel)
1. Instaliraj zavisnosti: `composer install`
2. Podesi `.env` fajl sa podacima tvoje baze.
3. Pokreni migracije i seedere:
   ```bash
   php artisan migrate --seed
4. Pokreni server `php artisan serve`

### Frontend (React)
1. Intsaliraj pakete: `npm install`
2. Pokreni aplikaciju: `npm run dev`
