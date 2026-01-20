<?php

use Illuminate\Support\Facades\Route;

use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\DashboardController;

use App\Http\Controllers\HomeController;

Route::get('/language/{locale}', function ($locale) {
    if (in_array($locale, ['en', 'fr'])) {
        session()->put('locale', $locale);
    }
    return redirect()->back();
})->name('language.switch');

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    
    Route::resource('services', \App\Http\Controllers\Admin\ServiceController::class)->middleware('can:manage_services');
    Route::resource('gallery', \App\Http\Controllers\Admin\GalleryController::class)->middleware('can:manage_gallery');
    Route::resource('users', \App\Http\Controllers\Admin\UserController::class)->middleware('can:manage_users');
    Route::resource('team', \App\Http\Controllers\Admin\TeamController::class)->middleware('can:manage_team');
    Route::resource('news', \App\Http\Controllers\Admin\NewsController::class)->middleware('can:manage_news');
    Route::resource('hero-slides', \App\Http\Controllers\Admin\HeroSlideController::class)->middleware('can:manage_hero');
    Route::resource('bible-verses', \App\Http\Controllers\Admin\BibleVerseController::class)->middleware('can:manage_bible');
    
    Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index')->middleware('can:manage_settings');
    Route::post('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update')->middleware('can:manage_settings');
});
