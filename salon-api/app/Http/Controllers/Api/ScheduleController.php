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
        $schedule = Schedule::updateOrCreate(
            [
                'user_id' => $request->user_id,
                'day_of_week' => $request->day_of_week
            ],
            [
                'start_time' => $request->start_time,
                'end_time' => $request->end_time
            ]
        );

        return response()->json(['message' => 'Raspored ažuriran!', 'schedule' => $schedule]);
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

    public function mySchedule()
    {
        $userId = auth()->id();

        $schedule = Schedule::where('user_id', $userId)
            ->orderByRaw("FIELD(day_of_week, 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota', 'Nedelja')")
            ->get();

        return response()->json($schedule);
    }
}
