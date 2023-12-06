<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('drivers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('transport_company_id')->nullable();
            $table->string('name',60);
            $table->string('surname',60);
            $table->string('phone',15);
            $table->string('email',60)->unique();
            $table->string('address',150);
            $table->string('bank',80);
            $table->string('account',60);
            $table->string('account_type',60);
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('transport_company_id')->references('id')->on('transport_companies')->onDelete('cascade');
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('drivers');
    }
};
