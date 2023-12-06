<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;



class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
   
    protected $fillable = [
        'name',
        'surname',
        'email',
        'phone',
        'company',
        'password',

    ];

    
    protected $hidden = [
        'password',
        'remember_token',
    ];

    
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

      //Relaciones Uno a Muchos
      public function companies(): HasMany
      {
          return $this->hasMany(Company::class);
      }

      public function drivers(): HasMany
      {
          return $this->hasMany(Driver::class);
      }

      public function passengers(): HasMany
      {
          return $this->hasMany(Passenger::class);
      }
      
      public function transportCompanies(): HasMany
      {
          return $this->hasMany(TransportCompany::class);
      }

      public function vehicles(): HasMany
      {
          return $this->hasMany(Vehicle::class);
      }
}
