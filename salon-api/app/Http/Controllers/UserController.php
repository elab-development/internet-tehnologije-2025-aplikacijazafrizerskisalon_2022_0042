<?php
namespace App\Http\Controllers;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;
class UserController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/clients",
     *     summary="Lista svih klijenata",
     *     tags={"Korisnici"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="Lista klijenata")
     * )
     */
    public function getClients()
    {
        $clients = User::where('role', 'client')
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($clients);
    }

    /**
     * @OA\Get(
     *     path="/api/hairdressers",
     *     summary="Lista svih frizera",
     *     tags={"Korisnici"},
     *     @OA\Response(response=200, description="Lista frizera")
     * )
     */
    public function getHairdressers()
    {
        $clients = User::where('role', 'hairdresser')
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($clients);
    }

    /**
     * @OA\Post(
     *     path="/api/hairdressers",
     *     summary="Kreiranje novog frizera",
     *     tags={"Korisnici"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"first_name","last_name","email","password"},
     *             @OA\Property(property="first_name", type="string", example="Ana"),
     *             @OA\Property(property="last_name", type="string", example="Jovic"),
     *             @OA\Property(property="email", type="string", example="ana@salon.com"),
     *             @OA\Property(property="password", type="string", example="password123"),
     *             @OA\Property(property="phone", type="string", example="0601234567"),
     *             @OA\Property(property="specialization", type="string", example="Bojenje"),
     *             @OA\Property(property="bio", type="string", example="10 godina iskustva")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Frizer kreiran"),
     *     @OA\Response(response=422, description="Greška validacije")
     * )
     */
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

    /**
     * @OA\Delete(
     *     path="/api/users/{id}",
     *     summary="Brisanje korisnika",
     *     tags={"Korisnici"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Korisnik obrisan"),
     *     @OA\Response(response=404, description="Nije pronađen")
     * )
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Korisnik uspešno obrisan']);
    }

    /**
     * @OA\Put(
     *     path="/api/users/{id}",
     *     summary="Ažuriranje korisnika",
     *     tags={"Korisnici"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"first_name","last_name","email"},
     *             @OA\Property(property="first_name", type="string", example="Ana"),
     *             @OA\Property(property="last_name", type="string", example="Jovic"),
     *             @OA\Property(property="email", type="string", example="ana@salon.com"),
     *             @OA\Property(property="phone", type="string", example="0601234567"),
     *             @OA\Property(property="specialization", type="string", example="Bojenje"),
     *             @OA\Property(property="bio", type="string", example="10 godina iskustva")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Korisnik ažuriran")
     * )
     */
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