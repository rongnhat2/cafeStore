<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('manager')->insert([
            'secret_key'    => '3745821',
            'email'         => 'admin@gmail.com',
            'password'      => '$2y$10$pmNHwQhyhP.dmPUxVMXzQOtB9IUo3q5NYqJSpaAvGEMI8aK5eyVx6',
            'status'        => '1',
        ]); 
        DB::table('permission')->insert([
            'display_name'      => 'Quản lí nhân viên',
            'name'              => 'staff',
        ]);
        DB::table('permission')->insert([
            'display_name'      => 'Thống kê doanh thu',
            'name'              => 'statistic',
        ]);
        DB::table('permission')->insert([
            'display_name'      => 'Quản lí sản phẩm',
            'name'              => 'product',
        ]);
    }
}
