<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;



class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Reservas/Reservas', [
            'bookings'=>Booking::all(),
            'vehicles'=>Vehicle::all(),

        ]);
    }

    
  
    public function store(Request $request)
    {
         //Validacion de los datos
         $validated = $request->validate([

            'date'=>'required|string|max:100',
            'hour'=>'required',
            'flight_number'=>'required',
            'airline'=>'required',
            'from'=>'required',
            'until'=>'required',
            'passenger'=>'required',
            'price'=>'required',
            'parking_price'=>'required',
            'total_price'=>'required',
            'vehicle'=>'required',
            'status'=>'required',
            'observation'=>'required',

        ]);
       
       
        $request->user()->vehicles()->bookings()->create($validated);

        return redirect(route('bookings.index'));
    }

  
    public function update(Request $request, Booking $booking)
    {
        //
    }

  
    public function destroy(Booking $booking)
    {
        //
    }
}
