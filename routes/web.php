<?php

use App\Http\Controllers\TransactionController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [TransactionController::class, 'index'])->name('dashboard');

    //Route::get('transaction', [TransactionController::class, 'index'])->name('transaction.index');
    Route::post('transaction', [TransactionController::class, 'store'])->name('transaction.store');

    Route::get('category', [CategoryController::class, 'index'])->name('category.index');
    Route::post('category', [CategoryController::class, 'store'])->name('category.store');
});

require __DIR__.'/settings.php';
