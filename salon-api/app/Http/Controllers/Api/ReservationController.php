<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ReservationConfirmed;
use App\Models\Reservation;
use App\Models\Schedule;
use App\Models\Service;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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


    public function store(Request $request)
    {
        $request->validate([
            'hairdresser_id' => 'required|exists:users,id',
            'service_id' => 'required|exists:services,id',
            'start_time' => 'required|date|after:today',
        ]);

        $service = \App\Models\Service::find($request->service_id);

        $startTime = \Carbon\Carbon::parse($request->start_time);
        $endTime = $startTime->copy()->addMinutes($service->duration_minutes);

        $reservation = \App\Models\Reservation::create([
            'client_id' => auth()->id(),
            'hairdresser_id' => $request->hairdresser_id,
            'service_id' => $request->service_id,
            'start_time' => $startTime,
            'end_time' => $endTime,
            'status' => 'pending',
        ]);

        try {
            if ($request->user() && $request->user()->email) {
                Mail::to($request->user()->email)->send(new ReservationConfirmed($reservation));
            }
        } catch (\Exception $e) {
            \Log::error("Greška kod mejla: " . $e->getMessage());
        }
        return response()->json([
            'message' => 'Termin uspešno zakazan!',
            'reservation' => $reservation
        ], 201);
    }

    public function index()
    {
        $user = auth()->user();

        if ($user->role === "admin") {
            return Reservation::with(['client', 'hairdresser', 'service'])->get();
        }

        if ($user->role === 'hairdresser') {
            return Reservation::where('hairdresser_id', $user->id)
                ->with(['client', 'service'])
                ->get();
        }

        return Reservation::where('client_id', $user->id)
            ->with(['hairdresser', 'service'])
            ->get();
    }

    public function cancel($id)
    {
        $reservation = Reservation::where('id', $id)
            ->where('client_id', auth()->id())
            ->first();

        if (!$reservation) {
            return response()->json(['message' => 'Rezervacija nije pronađena ili nemate dozvolu.'], 404);
        }

        $reservation->update(['status' => 'cancelled']);

        return response()->json(['message' => 'Termin je uspešno otkazan.']);
    }

    public function update(Request $request, $id)
    {
        $reservation = Reservation::findOrFail($id);
        $user = auth()->user();

        $isAdmin = $user->role === 'admin';
        $isOwnerHairdresser = ($user->role === 'hairdresser' && $reservation->hairdresser_id === $user->id);

        if (!$isAdmin && !$isOwnerHairdresser) {
            return response()->json(['message' => 'Nemate dozvolu da menjate ovaj termin.'], 403);
        }

        $request->validate([
            'status' => 'required|in:pending,confirmed,completed,cancelled,no_show',
        ]);

        $reservation->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Status uspešno ažuriran!',
            'reservation' => $reservation->load(['client', 'service', 'hairdresser'])
        ]);
    }
}
