<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Schedule;
use App\Models\Service;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function getAvailableSlots(Request $request)
    {
        $request->validate([
            'hairdresser_id' => 'required|exists:users,id',
            'service_id' => 'required|exists:services,id',
            'date' => 'required|date|after_or_equal:today',
        ]);

        $date = Carbon::parse($request->date);
        $dayName = $date->format('l');

        $schedule = Schedule::where('user_id', $request->hairdresser_id)
            ->where('day_of_week', $dayName)
            ->where('is_active', true)
            ->first();

        if (!$schedule) {
            return response()->json(['message' => 'Frizer ne radi ovim danom.'], 404);
        }

        $existingReservations = Reservation::where('hairdresser_id', $request->hairdresser_id)
            ->whereDate('start_time', $request->date)
            ->where('status', '!=', 'cancelled')
            ->get();

        $slots = [];
        $startTime = Carbon::parse($request->date . ' ' . $schedule->start_time);
        $endTime = Carbon::parse($request->date . ' ' . $schedule->end_time);

        $service = Service::find($request->service_id);
        $duration = $service->duration_minutes;

        while ($startTime->copy()->addMinutes($duration)->lte($endTime)) {
            $slotStart = $startTime->copy();
            $slotEnd = $startTime->copy()->addMinutes($duration);

            $isOccupied = $existingReservations->contains(function ($res) use ($slotStart, $slotEnd) {
                return ($slotStart < Carbon::parse($res->end_time) && $slotEnd > Carbon::parse($res->start_time));
            });

            if (!$isOccupied) {
                $slots[] = [
                    'start' => $slotStart->format('H:i'),
                    'end' => $slotEnd->format('H:i'),
                ];
            }

            $startTime->addMinutes(30);
        }

        return response()->json($slots);
    }

    
}
