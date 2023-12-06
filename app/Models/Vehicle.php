<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;



class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'transport_companie_id',
        'number',        
        'type',
        'brand',
        'model',
        'patent',
        'year',
        'tecnical_revision_year',
        'seat_insurance',
        'driver_insurance',        
    ];


    public function transportCompanies(): BelongsTo
    {
        return $this->belongsTo(TransportCompany::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
