<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;
class ScheduleController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/schedules",
     *     summary="Lista svih rasporeda",
     *     tags={"Rasporedi"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="Lista rasporeda")
     * )
     */
    public function index()
    {
        return Schedule::with('user')->get();
    }

    /**
     * @OA\Post(
     *     path="/api/schedules",
     *     summary="Kreiranje ili ažuriranje rasporeda",
     *     tags={"Rasporedi"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"user_id","day_of_week","start_time","end_time"},
     *             @OA\Property(property="user_id", type="integer", example=2),
     *             @OA\Property(property="day_of_week", type="string", example="Monday"),
     *             @OA\Property(property="start_time", type="string", example="09:00"),
     *             @OA\Property(property="end_time", type="string", example="17:00")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Raspored ažuriran")
     * )
     */
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

    /**
     * @OA\Put(
     *     path="/api/schedules/{id}",
     *     summary="Ažuriranje rasporeda",
     *     tags={"Rasporedi"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="start_time", type="string", example="09:00"),
     *             @OA\Property(property="end_time", type="string", example="17:00")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Raspored ažuriran")
     * )
     */
    public function update(Request $request, $id)
    {
        $schedule = Schedule::findOrFail($id);
        $schedule->update($request->all());
        return response()->json(['message' => 'Raspored ažuriran!', 'schedule' => $schedule]);
    }

    /**
     * @OA\Delete(
     *     path="/api/schedules/{id}",
     *     summary="Brisanje rasporeda",
     *     tags={"Rasporedi"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Raspored obrisan"),
     *     @OA\Response(response=404, description="Nije pronađen")
     * )
     */
    public function destroy($id)
    {
        $schedule = Schedule::find($id);
        if (!$schedule) {
            return response()->json(['message' => 'Raspored nije pronađen'], 404);
        }
        $schedule->delete();
        return response()->json(['message' => 'Radno vreme obrisano']);
    }

    /**
     * @OA\Get(
     *     path="/api/my-schedule",
     *     summary="Moj raspored",
     *     tags={"Rasporedi"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="Raspored trenutnog frizera")
     * )
     */
    public function mySchedule()
    {
        $userId = auth()->id();
        $schedule = Schedule::where('user_id', $userId)
            ->orderByRaw("FIELD(day_of_week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')")
            ->get();
        return response()->json($schedule);
    }
}