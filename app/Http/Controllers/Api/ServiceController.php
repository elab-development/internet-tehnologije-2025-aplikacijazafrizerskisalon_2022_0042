<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::query()->get();

        return response()->json([
            'data' => $services,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'duration_minutes' => ['required', 'integer', 'min:1'],
            'type' => ['required', 'string', 'max:255'],
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
            'type' => ['sometimes', 'required', 'string', 'max:255'],
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
