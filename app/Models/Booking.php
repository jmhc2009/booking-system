<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
        'hour',
        'flight_number',
        'airline',
        'from',
        'until',
        'passenger',
        'price',
        'parking_price',
        'total_price',
        'vehicle',
        'status',
        'observations'
    ];

    //Relaciones Muchos a Muchos
    public function passengers(): BelongsToMany
    {
        return $this->belongsToMany(Passenger::class);
    }

    public function Companies(): BelongsToMany
    {
        return $this->belongsToMany(Company::class);
    }

    public function vehicles(): BelongsToMany
    {
        return $this->belongsToMany(Vehicle::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
