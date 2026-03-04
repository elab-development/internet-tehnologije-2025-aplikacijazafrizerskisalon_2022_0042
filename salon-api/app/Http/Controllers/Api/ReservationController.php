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
    /**
     * @OA\Get(
     *     path="/api/available-slots",
     *     summary="Dostupni termini frizera",
     *     tags={"Rezervacije"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="hairdresser_id", in="query", required=true, @OA\Schema(type="integer")),
     *     @OA\Parameter(name="service_id", in="query", required=true, @OA\Schema(type="integer")),
     *     @OA\Parameter(name="date", in="query", required=true, @OA\Schema(type="string", example="2026-03-10")),
     *     @OA\Response(response=200, description="Lista slobodnih termina"),
     *     @OA\Response(response=404, description="Frizer ne radi taj dan")
     * )
     */
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

    /**
     * @OA\Post(
     *     path="/api/reservations",
     *     summary="Kreiranje nove rezervacije",
     *     tags={"Rezervacije"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"hairdresser_id","service_id","start_time"},
     *             @OA\Property(property="hairdresser_id", type="integer", example=2),
     *             @OA\Property(property="service_id", type="integer", example=1),
     *             @OA\Property(property="start_time", type="string", example="2026-03-10 10:00:00")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Rezervacija kreirana"),
     *     @OA\Response(response=422, description="Greška validacije")
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/reservations",
     *     summary="Lista svih rezervacija",
     *     tags={"Rezervacije"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="Lista rezervacija")
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/reservations/{id}",
     *     summary="Detalji rezervacije",
     *     tags={"Rezervacije"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Detalji rezervacije"),
     *     @OA\Response(response=404, description="Nije pronađena")
     * )
     */
    public function show($id)
    {
        return Reservation::with(['client', 'hairdresser', 'service'])->findOrFail($id);
    }

    /**
     * @OA\Put(
     *     path="/api/reservations/{id}/cancel",
     *     summary="Otkazivanje rezervacije",
     *     tags={"Rezervacije"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Rezervacija otkazana"),
     *     @OA\Response(response=404, description="Nije pronađena")
     * )
     */
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

    /**
     * @OA\Put(
     *     path="/api/reservations/{id}",
     *     summary="Ažuriranje statusa rezervacije",
     *     tags={"Rezervacije"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"status"},
     *             @OA\Property(property="status", type="string", example="confirmed")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Status ažuriran"),
     *     @OA\Response(response=403, description="Nemate dozvolu")
     * )
     */
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

    /**
     * @OA\Delete(
     *     path="/api/reservations/{id}",
     *     summary="Brisanje rezervacije",
     *     tags={"Rezervacije"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Rezervacija obrisana"),
     *     @OA\Response(response=404, description="Nije pronađena")
     * )
     */
    public function destroy($id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();
        return response()->json(['message' => 'Rezervacija obrisana.']);
    }
}