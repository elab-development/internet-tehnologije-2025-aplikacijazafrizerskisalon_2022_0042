<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index()
    {
        return Schedule::with('user')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'day_of_week' => 'required|string',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);

        $schedule = Schedule::create($request->all());

        return response()->json([
            'message' => 'Radno vreme uspešno dodato!',
            'schedule' => $schedule
        ], 201);
    }

    public function destroy($id)
    {
        $schedule = Schedule::find($id);
        if (!$schedule) {
            return response()->json(['message' => 'Raspored nije pronađen'], 404);
        }

        $schedule->delete();
        return response()->json(['message' => 'Radno vreme obrisano']);
    }
}
