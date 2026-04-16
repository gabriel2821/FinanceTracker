<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function index(){
        return inertia('dashboard', [
           'transactions' => auth()->user()->transaction()->with('category')->get(),
            // Add this line to pass categories to the frontend
            'categories' => auth()->user()->category()->get(['id', 'name']),
        ]); 
    }

    public function store(Request $request){

        $validated = $request->validate([
            'type' => 'required|in:income,expense',
            'notes' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'trans_date' => 'required|date',
            'category_id' => 'required|exists:categories,id',
        ]);

        // This automatically sets the user_id for the transaction!
        $request->user()->transaction()->create($validated);

        return redirect()->route('dashboard')->with('success', 'Transaction created successfully');
    }
} 
