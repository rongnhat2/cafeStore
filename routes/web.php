<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::middleware(['AuthAdmin:auth'])->group(function () {
    Route::get('/login', 'DisplayController@login')->name('admin.login');
    Route::post('/login', 'AuthController@login')->name('admin.login');
});
Route::post('logout', 'AuthController@logout')->name('admin.logout');

    
Route::middleware(['AuthAdmin:statistic'])->get('/', 'DisplayController@statistic')->name('admin.statistic.index');

Route::middleware(['AuthAdmin:product'])->prefix('product')->group(function () {
    Route::get('/', 'ProductController@index')->name('admin.product.index');
});
Route::middleware(['AuthAdmin:product'])->prefix('table')->group(function () {
    Route::get('/', 'TableController@index')->name('admin.table.index');
});
Route::middleware(['AuthAdmin:staff'])->prefix('permission')->group(function () {
    Route::get('/', 'PermissionController@index')->name('admin.permission.index');
});
Route::middleware(['AuthAdmin:staff'])->prefix('staff')->group(function () {
    Route::get('/', 'StaffController@index')->name('admin.staff.index');
});
Route::middleware(['AuthAdmin:staff'])->prefix('time')->group(function () {
    Route::get('/', 'TimeController@index')->name('admin.time.index');
});

Route::middleware(['AuthAdmin:waiter'])->prefix('waiter')->group(function () {
    Route::get('/', 'WaiterController@index')->name('admin.waiter');
});

Route::prefix('apip')->group(function () {
    Route::middleware(['AuthAdmin:product'])->prefix('product')->group(function () {
        Route::get('get', 'ProductController@get')->name('admin.product.get');
        Route::get('/get-one/{id}', 'ProductController@get_one')->name('admin.product.get_one');
        Route::post('store', 'ProductController@store')->name('admin.product.store');
        
        Route::post('/update', 'ProductController@update')->name('admin.product.update');
        Route::get('/delete/{id}', 'ProductController@delete')->name('admin.product.delete');
    });
    Route::middleware(['AuthAdmin:staff'])->prefix('permission')->group(function () {
        Route::get('get', 'PermissionController@get')->name('admin.permission.get');
    });
    Route::middleware(['AuthAdmin:staff'])->prefix('role')->group(function () {
        Route::get('get', 'RoleController@get')->name('admin.role.get');
        Route::get('/get-one/{id}', 'RoleController@get_one')->name('admin.role.get_one');
        Route::post('store', 'RoleController@store')->name('admin.role.store');
        
        Route::post('/update', 'RoleController@update')->name('admin.role.update');
        Route::get('/delete/{id}', 'RoleController@delete')->name('admin.role.delete');
    });
    Route::middleware(['AuthAdmin:staff'])->prefix('staff')->group(function () {
        Route::get('get', 'StaffController@get')->name('admin.staff.get');
        Route::get('get-waiter', 'StaffController@get_waiter')->name('admin.staff.get_waiter');

        Route::get('/get-one/{id}', 'StaffController@get_one')->name('admin.staff.get_one');
        Route::post('store', 'StaffController@store')->name('admin.staff.store');
        
        Route::post('/update', 'StaffController@update')->name('admin.staff.update');
        Route::get('/delete/{id}', 'StaffController@delete')->name('admin.staff.delete');
    });
    Route::middleware(['AuthAdmin:staff'])->prefix('time')->group(function () {
        Route::get('get', 'TimeController@get')->name('admin.time.get');
        Route::get('/get-one/{id}', 'StaffController@get_one')->name('admin.staff.get_one');
        Route::post('store', 'StaffController@store')->name('admin.staff.store');
        
        Route::post('/update', 'StaffController@update')->name('admin.staff.update');
        Route::get('/delete/{id}', 'StaffController@delete')->name('admin.staff.delete');
    });
    Route::middleware(['AuthAdmin:staff'])->prefix('calendar')->group(function () {
        Route::get('get', 'TimeController@get')->name('admin.time.get');
        Route::post('store', 'TimeController@store')->name('admin.time.store');
    });
    Route::middleware(['AuthAdmin:product'])->prefix('table')->group(function () {
        Route::get('get', 'TableController@get')->name('admin.table.get');
        Route::post('store', 'TableController@store')->name('admin.table.store');
        Route::get('/delete/{id}', 'TableController@delete')->name('admin.table.delete');
    });

    Route::middleware(['AuthAdmin:waiter'])->prefix('waiter')->group(function () {
        Route::get('/get-table', 'WaiterController@get_table')->name('admin.waiter.table-get');
        Route::get('/get-product', 'WaiterController@get_product')->name('admin.waiter.product-get');
        Route::get('/get-one/{id}', 'WaiterController@get_one')->name('admin.waiter.get_one');
        Route::post('store', 'WaiterController@store')->name('admin.waiter.store');
        Route::post('update', 'WaiterController@update')->name('admin.waiter.update');
    });
});

