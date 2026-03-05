<?php
namespace Tests\Feature;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Service;
use App\Models\Reservation;

class ReservationTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_get_reservations(): void
    {
        $user = User::factory()->create(['role' => 'client']);
        $token = $user->createToken('auth_token')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/reservations');

        $response->assertStatus(200);
    }

    public function test_unauthenticated_user_cannot_get_reservations(): void
    {
        $response = $this->getJson('/api/reservations');
        $response->assertStatus(401);
    }

    public function test_admin_can_see_all_reservations(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = $admin->createToken('auth_token')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/reservations');

        $response->assertStatus(200);
    }
}