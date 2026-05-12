<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // Team::factory(10)->create();
        Team::insert([
            [
                'project_id'  => 1,
                'first_name'  => 'Dina',
                'last_name'   => 'Sabie',
                'role'        => 'Project Lead',
                'mugshot'     => 'Dina-Sabie.png',
                'email'       => 'tenzin@example.com',
                'background'  => 'Full stack developer with 5 years experience...',
                'linkedin'    => 'linkedin.com/in/tenzin',
                'github'      => 'github.com/tenzin',
            ],
            [
                'project_id'  => 1,
                'first_name'  => 'Dr. Umer',
                'last_name'   => 'Noor',
                'role'        => 'Instructor',
                'mugshot'     => 'Umer-Noor.png',
                'email'       => 'jane@example.com',
                'background'  => 'UI/UX designer specialising in...',
                'linkedin'    => 'linkedin.com/in/jane',
                'github'      => 'github.com/jane',
            ],
            [
                'project_id'  => 1,
                'first_name'  => 'Dr. Scott',
                'last_name'   => 'Fielder',
                'role'        => 'Instructor',
                'mugshot'     => 'Scott-Fielder.png',
                'email'       => 'jane@example.com',
                'background'  => 'UI/UX designer specialising in...',
                'linkedin'    => 'linkedin.com/in/jane',
                'github'      => 'github.com/jane',
            ],
            [
                'project_id'  => 1,
                'first_name'  => 'Paul',
                'last_name'   => 'Neale',
                'role'        => 'Profesor',
                'mugshot'     => 'Paul-Neale.png',
                'email'       => 'jane@example.com',
                'background'  => 'UI/UX designer specialising in...',
                'linkedin'    => 'linkedin.com/in/jane',
                'github'      => 'github.com/jane',
            ],
            [
                'project_id'  => 1,
                'first_name'  => 'Carolina',
                'last_name'   => 'Oliveira',
                'role'        => 'TBD',
                'mugshot'     => 'Carolina-Oliveira.png',
                'email'       => 'jane@example.com',
                'background'  => 'UI/UX designer specialising in...',
                'linkedin'    => 'linkedin.com/in/jane',
                'github'      => 'github.com/jane',
            ],
            [
                'project_id'  => 1,
                'first_name'  => 'Felipe',
                'last_name'   => 'P',
                'role'        => 'Videographer',
                'mugshot'     => 'Felipe-P.png',
                'email'       => 'jane@example.com',
                'background'  => 'UI/UX designer specialising in...',
                'linkedin'    => 'linkedin.com/in/jane',
                'github'      => 'github.com/jane',
            ],
            [
                'project_id'  => 1,
                'first_name'  => 'Cassidy',
                'last_name'   => 'Murray',
                'role'        => 'Technical Artist',
                'mugshot'     => 'Cassidy-Murray.png',
                'email'       => 'jane@example.com',
                'background'  => 'UI/UX designer specialising in...',
                'linkedin'    => 'linkedin.com/in/jane',
                'github'      => 'github.com/jane',
            ],
            [
                'project_id'  => 1,
                'first_name'  => 'Tenzin',
                'last_name'   => 'Rinzin',
                'role'        => 'Fullstack Developer',
                'mugshot'     => 'Tenzin-Rinzin.png',
                'email'       => 'jane@example.com',
                'background'  => 'UI/UX designer specialising in...',
                'linkedin'    => 'linkedin.com/in/jane',
                'github'      => 'github.com/jane',
            ],
            [
                'project_id'  => 1,
                'first_name'  => 'Stacy',
                'last_name'   => 'Cernova',
                'role'        => 'UI/UX Designer',
                'mugshot'     => 'Stacy-Cernova.png',
                'email'       => 'jane@example.com',
                'background'  => 'UI/UX designer specialising in...',
                'linkedin'    => 'linkedin.com/in/jane',
                'github'      => 'github.com/jane',
            ],

        ]);
    }
}
