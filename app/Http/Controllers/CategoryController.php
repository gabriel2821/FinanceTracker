<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function index() {
        return inertia('category/index');
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required',
            'type' => 'required',
        ]);

        $category = Category::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'type' => $request->type,
        ]);

        return redirect()->route('category.index');
    }
}
