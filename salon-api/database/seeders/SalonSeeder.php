<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Schedule;
use App\Models\Service;
use App\Models\User;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SalonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'Glavni',
            'email' => 'admin@salon.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        $hairdresser = User::create([
            'first_name' => 'Marko',
            'last_name' => 'Friz',
            'email' => 'marko@salon.com',
            'password' => Hash::make('marko123'),
            'role' => 'hairdresser',
            'specialization' => 'Muško šišanje i brada',
        ]);

        $cat = Category::create(['category_name' => 'Šišanje']);

        $service = Service::create([
            'name' => 'Muško šišanje',
            'description' => 'Klasično muško šišanje makazama i mašinicom',
            'price' => 1200,
            'duration_minutes' => 30,
            'category_id' => $cat->id
        ]);

        Schedule::create([
            'user_id' => $hairdresser->id,
            'day_of_week' => 'Monday',
            'start_time' => '09:00:00',
            'end_time' => '17:00:00',
        ]);
    }
}
