<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'client_id',
        'hairdresser_id',
        'service_id',
        'start_time',
        'end_time',
        'status',
        'note'
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
    public function hairdresser()
    {
        return $this->belongsTo(User::class, 'hairdresser_id');
    }
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
