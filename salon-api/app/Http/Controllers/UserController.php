<?php

namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getClients()
    {
        $clients = User::where('role', 'client')
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($clients);
    }

    public function getHairdressers()
    {
        $clients = User::where('role', 'hairdresser')
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($clients);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'phone' => 'nullable|string',
            'specialization' => 'nullable|string',
            'bio' => 'nullable|string',
        ]);

        $hairdresser = User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['phone'],
            'role' => 'hairdresser',
            'specialization' => $validated['specialization'],
            'bio' => $validated['bio'],
        ]);

        return response()->json($hairdresser, 201);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Korisnik uspešno obrisan']);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'phone' => 'nullable|string',
            'specialization' => 'nullable|string',
            'bio' => 'nullable|string',
            'password' => 'nullable|min:6',
        ]);

        $user->fill([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'specialization' => $validated['specialization'] ?? $user->specialization,
            'bio' => $validated['bio'] ?? $user->bio,
        ]);

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return response()->json([
            'message' => 'Podaci su uspešno ažurirani',
            'data' => $user
        ]);
    }
}
