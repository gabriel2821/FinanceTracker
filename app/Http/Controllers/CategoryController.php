<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function index() {
        return inertia('category/index', [
            'categories' => auth()->user()->category()->get(['id', 'name', 'type']),
        ]);
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

        return redirect()->route('category.index')->with("success", "Category created successfully");
    }
    public function update(Request $request, Category $category) {
        if ($category->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'name' => 'required',
            'type' => 'required',
        ]);

        $category->update([
            'name' => $request->name,
            'type' => $request->type,
        ]);

        return redirect()->route('category.index')->with("success", "Category updated successfully");
    }

    public function destroy(Category $category) {
        if ($category->user_id !== Auth::id()) {
            abort(403);
        }

        // Optional: Check if transactions are linked to this category before deleting
        // $category->transactions()->delete(); // Or prevent deletion

        $category->delete();

        return redirect()->route('category.index')->with("success", "Category deleted successfully");
    }
}
