<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',       
        'business_name',
        'rut',
        'turn',
        'address',
        'phone',
        'email',        
    ];
    public function bookings() : BelongsToMany {
        return $this-> belongsToMany(Booking::class);

    }
    public function passengers() : BelongsToMany {
        return $this-> belongsToMany(Passenger::class);

    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
}
