<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
class ServiceController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/services",
     *     summary="Lista svih usluga",
     *     tags={"Usluge"},
     *     @OA\Response(response=200, description="Lista usluga")
     * )
     */
    public function index()
    {
        $services = Service::with('category')->get();
        return response()->json(['data' => $services]);
    }

    /**
     * @OA\Get(
     *     path="/api/services/{id}",
     *     summary="Detalji usluge",
     *     tags={"Usluge"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Detalji usluge"),
     *     @OA\Response(response=404, description="Usluga nije pronađena")
     * )
     */
    public function show($id)
    {
        $service = Service::with('category')->find($id);
        if (!$service) {
            return response()->json(['message' => 'Usluga nije pronađena'], 404);
        }
        return response()->json(['data' => $service]);
    }

    /**
     * @OA\Post(
     *     path="/api/services",
     *     summary="Kreiranje nove usluge",
     *     tags={"Usluge"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","price","duration_minutes","category_id"},
     *             @OA\Property(property="name", type="string", example="Šišanje"),
     *             @OA\Property(property="description", type="string", example="Osnovno šišanje"),
     *             @OA\Property(property="price", type="number", example=1500),
     *             @OA\Property(property="duration_minutes", type="integer", example=30),
     *             @OA\Property(property="category_id", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(response=201, description="Usluga kreirana"),
     *     @OA\Response(response=422, description="Greška validacije")
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'duration_minutes' => ['required', 'integer', 'min:1'],
            'category_id' => ['required', 'exists:categories,id'],
        ]);
        $service = Service::create($validated);
        return response()->json(['data' => $service], 201);
    }

    /**
     * @OA\Put(
     *     path="/api/services/{service}",
     *     summary="Ažuriranje usluge",
     *     tags={"Usluge"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="service", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Šišanje"),
     *             @OA\Property(property="price", type="number", example=1800),
     *             @OA\Property(property="duration_minutes", type="integer", example=45)
     *         )
     *     ),
     *     @OA\Response(response=200, description="Usluga ažurirana")
     * )
     */
    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['sometimes', 'required', 'numeric', 'min:0'],
            'duration_minutes' => ['sometimes', 'required', 'integer', 'min:1'],
            'category_id' => ['sometimes', 'required', 'exists:categories,id'],
        ]);
        $service->update($validated);
        return response()->json(['data' => $service->fresh()]);
    }

    /**
     * @OA\Delete(
     *     path="/api/services/{service}",
     *     summary="Brisanje usluge",
     *     tags={"Usluge"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="service", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=204, description="Usluga obrisana")
     * )
     */
    public function destroy(Service $service)
    {
        $service->delete();
        return response()->json(null, 204);
    }
}