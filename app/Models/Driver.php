<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Driver extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'transport_company_id',
        'name',
        'surname',
        'phone',
        'email',
        'address',
        'bank',
        'account',
        'account_type',
    ];

    //Relacion muchos a muchos

    public function vehicles(): BelongsToMany
    {
        return $this->belongsToMany(Vehicle::class);
    }

    //Relación uno a muchos (inversa)

    public function transportCompanies(): BelongsTo
    {
        return $this->belongsTo(TransportCompany::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
