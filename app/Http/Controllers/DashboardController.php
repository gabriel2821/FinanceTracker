<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index() {
        return inertia('dashboard', [
            'transactions' => auth()->user()->transaction()->with('category')->get(),
            // Add this line to pass categories to the frontend
            'categories' => auth()->user()->category()->get(['id', 'name']),
        ]); 
    }
}
