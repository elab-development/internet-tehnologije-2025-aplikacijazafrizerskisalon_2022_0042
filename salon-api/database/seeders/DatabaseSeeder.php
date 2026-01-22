<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Service;
use App\Models\User;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \Schema::disableForeignKeyConstraints();

        Service::truncate();
        Category::truncate();

        $catSisanje = Category::create(['category_name' => 'Šišanje i feniranje']);
        $catFarbanje = Category::create(['category_name' => 'Farbanje kose']);
        $catTehnike = Category::create(['category_name' => 'Tehnike farbanja']);
        $catNega = Category::create(['category_name' => 'Nega kose']);
        $catSvecane = Category::create(['category_name' => 'Svečane frizure']);
        $catMuski = Category::create(['category_name' => 'Muški program']);
        $catBrada = Category::create(['category_name' => 'Brada i brijanje']);
        $catPaketi = Category::create(['category_name' => 'Muški paketi']);

        $services = [
            ['name' => 'Žensko šišanje', 'price' => 1200, 'category_id' => $catSisanje->id, 'duration_minutes' => 45, 'description' => 'Profesionalno šišanje prilagođeno vašem obliku lica.'],
            ['name' => 'Feniranje (kratka kosa)', 'price' => 1200, 'category_id' => $catSisanje->id, 'duration_minutes' => 30, 'description' => 'Pranje i feniranje na ravno ili volumen.'],
            ['name' => 'Feniranje (srednja kosa)', 'price' => 1500, 'category_id' => $catSisanje->id, 'duration_minutes' => 40, 'description' => 'Oblikovanje kose srednje dužine uz negu.'],
            ['name' => 'Feniranje (duga kosa)', 'price' => 1800, 'category_id' => $catSisanje->id, 'duration_minutes' => 50, 'description' => 'Feniranje duge kose uz maksimalan sjaj.'],
            ['name' => 'Feniranje sa peglom / loknama', 'price' => 300, 'category_id' => $catSisanje->id, 'duration_minutes' => 15, 'description' => 'Dodatno stilizovanje uz osnovnu uslugu feniranja.'],

            ['name' => 'Farbanje izrasta', 'price' => 2500, 'category_id' => $catFarbanje->id, 'duration_minutes' => 90, 'description' => 'Osvežavanje boje korena kose.'],
            ['name' => 'Farbanje cele dužine (kratka kosa)', 'price' => 3000, 'category_id' => $catFarbanje->id, 'duration_minutes' => 100, 'description' => 'Ujednačavanje boje na celoj dužini kratke kose.'],
            ['name' => 'Farbanje cele dužine (srednja kosa)', 'price' => 3500, 'category_id' => $catFarbanje->id, 'duration_minutes' => 110, 'description' => 'Ujednačavanje boje na celoj dužini srednje kose.'],
            ['name' => 'Farbanje cele dužine (duga kosa)', 'price' => 4000, 'category_id' => $catFarbanje->id, 'duration_minutes' => 120, 'description' => 'Kompletna transformacija boje za dugu kosu.'],

            ['name' => 'Pramenovi (kratka kosa)', 'price' => 4000, 'category_id' => $catTehnike->id, 'duration_minutes' => 120, 'description' => 'Klasični pramenovi za kratku kosu.'],
            ['name' => 'Pramenovi (srednja kosa)', 'price' => 5000, 'category_id' => $catTehnike->id, 'duration_minutes' => 150, 'description' => 'Klasični pramenovi za postizanje prirodne dubine.'],
            ['name' => 'Pramenovi (duga kosa)', 'price' => 6000, 'category_id' => $catTehnike->id, 'duration_minutes' => 180, 'description' => 'Klasični pramenovi za dugu kosu.'],
            ['name' => 'Balayage / Ombre / Air Touch', 'price' => 6000, 'category_id' => $catTehnike->id, 'duration_minutes' => 180, 'description' => 'Najmodernije tehnike nijansiranja kose.'],

            ['name' => 'Dubinska nega / maska', 'price' => 800, 'category_id' => $catNega->id, 'duration_minutes' => 20, 'description' => 'Intenzivna hidratacija i oporavak vlasi.'],
            ['name' => 'Keratinska nega', 'price' => 5000, 'category_id' => $catNega->id, 'duration_minutes' => 180, 'description' => 'Dugotrajno ispravljanje i zaglađivanje kose.'],
            ['name' => 'Botoks za kosu', 'price' => 4500, 'category_id' => $catNega->id, 'duration_minutes' => 90, 'description' => 'Tretman za regeneraciju i volumen kose.'],

            ['name' => 'Svečana frizura', 'price' => 3000, 'category_id' => $catSvecane->id, 'duration_minutes' => 60, 'description' => 'Punđe, pletenice ili talasi za posebne prilike.'],
            ['name' => 'Probna frizura', 'price' => 2000, 'category_id' => $catSvecane->id, 'duration_minutes' => 60, 'description' => 'Probno stilizovanje pre važnog događaja.'],
            ['name' => 'Mladenačka frizura', 'price' => 5000, 'category_id' => $catSvecane->id, 'duration_minutes' => 120, 'description' => 'Ekskluzivna frizura za vaš najvažniji dan.'],

            ['name' => 'Muško šišanje', 'price' => 900, 'category_id' => $catMuski->id, 'duration_minutes' => 30, 'description' => 'Klasično muško šišanje uz pranje kose.'],
            ['name' => 'Fade / Skin fade', 'price' => 1200, 'category_id' => $catMuski->id, 'duration_minutes' => 45, 'description' => 'Precizno šišanje sa postepenim prelazom.'],
            ['name' => 'Mašinica (jedna dužina)', 'price' => 600, 'category_id' => $catMuski->id, 'duration_minutes' => 15, 'description' => 'Brzo šišanje mašinicom na istu dužinu.'],
            ['name' => 'Oblikovanje brade mašinicom', 'price' => 600, 'category_id' => $catMuski->id, 'duration_minutes' => 20, 'description' => 'Sređivanje brade bez žileta.'],

            ['name' => 'Klasično brijanje (žilet)', 'price' => 1200, 'category_id' => $catBrada->id, 'duration_minutes' => 30, 'description' => 'Tradicionalno brijanje oštrim žiletom.'],
            ['name' => 'Brijanje i oblikovanje brade', 'price' => 1500, 'category_id' => $catBrada->id, 'duration_minutes' => 40, 'description' => 'Kompletno sređivanje brade i kontura.'],
            ['name' => 'Hot towel shave', 'price' => 1800, 'category_id' => $catBrada->id, 'duration_minutes' => 45, 'description' => 'Uživanje uz tople peškire i brijanje.'],
            ['name' => 'Kompleksna korekcija brade', 'price' => 2000, 'category_id' => $catBrada->id, 'duration_minutes' => 50, 'description' => 'Potpuna promena oblika brade.'],

            ['name' => 'Muško šišanje + brada', 'price' => 1800, 'category_id' => $catPaketi->id, 'duration_minutes' => 60, 'description' => 'Kombinacija šišanja i osnovnog sređivanja brade.'],
            ['name' => 'Fade + brada', 'price' => 2200, 'category_id' => $catPaketi->id, 'duration_minutes' => 70, 'description' => 'Precizan fade uz kompletno sređivanje brade.'],
            ['name' => 'Premium paket', 'price' => 2800, 'category_id' => $catPaketi->id, 'duration_minutes' => 90, 'description' => 'Šišanje, brada i hot towel tretman.'],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
        User::create([
            'first_name' => 'Glavni',
            'last_name' => 'Administrator',
            'email' => 'admin@salon.com',
            'password' => Hash::make('admin123'),
            'phone' => '0601234567',
            'role' => 'admin',
        ]);
    }
}
