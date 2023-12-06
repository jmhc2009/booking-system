<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;



class Passenger extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_id',
        'client_type', 
        'company',       
        'name',
        'surname',
        'email',
        'phone',
        'address',
        'address2',
        'address3',        
    ];
    public function companies(): HasMany
    {
        return $this->hasMany(Company::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function bookings() : BelongsToMany {
        return $this->belongsToMany(Booking::class);

    }

    
}
