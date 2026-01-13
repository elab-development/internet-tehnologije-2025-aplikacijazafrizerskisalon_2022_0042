<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::with('category')->get();

        return response()->json([
            'data' => $services,
        ]);
    }

    public function show($id)
    {
        $service = Service::with('category')->find($id);

        if (!$service) {
            return response()->json([
                'message' => 'Usluga nije pronađena'
            ], 404);
        }

        return response()->json([
            'data' => $service
        ]);
    }

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

        return response()->json([
            'data' => $service,
        ], 201);
    }

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

        return response()->json([
            'data' => $service->fresh(),
        ]);
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return response()->json(null, 204);
    }


}
