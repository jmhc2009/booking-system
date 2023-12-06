<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    
    public function index()
    {
        return Inertia::render('Vehicles/Vehicles',[
            'vehicles'=>Vehicle::all(),
        ]);
    }

   
    public function store(Request $request)
    {
         //Validacion de los datos
         $validated = $request->validate([

            'number'=>'required|string|max:100',
            'type'=>'required',
            'brand'=>'required',
            'model'=>'required',
            'patent'=>'required',
            'year'=>'required',
            'tecnical_revision_year'=>'required',
            'seat_insurance'=>'required',
            'driver_insurance'=>'required',

        ]);
       
       
        $request->user()->vehicles()->create($validated);

        return redirect(route('vehicles.index'));
    }
    
 
   
    public function update(Request $request, $id)
    {
        $vehicle = Vehicle::find($id);
        $vehicle->fill($request->input())->saveOrFail();

        return redirect(route('vehicles.index'));
    }

   
    public function destroy($id)
    {
        $vehicle = Vehicle::find($id);
        $vehicle->delete();

        return redirect(route('vehicles.index'));
    }
}
