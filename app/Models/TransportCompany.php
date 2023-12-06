<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;



class TransportCompany extends Model
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
  
    public function vehicles(): HasMany
    {
        return $this->hasMany(Vehicle::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function drivers(): HasMany
    {
        return $this->hasMany(Driver::class);
    }

   

}
