<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Passenger;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PassengerController extends Controller
{
    
    public function index()
    {
        return Inertia::render("Pasajeros/Pasajeros",[
            'passengers'=> Passenger::all(),
            'companies'=> Company::all(),
            

        ]);

    }

    public function store(Request $request)
    {
        //Validacion de los datos
        $validated = $request->validate([
            'company_id',
            'client_type'=>'required|string|max:100',            
            'company'=>'required',
            'name'=>'required',
            'surname'=>'required',
            'email'=>'required',
            'phone'=>'required',
            'address'=>'max:150',
            'address2'=>'max:150',
            'address3'=>'max:150',

        ]);

        $request->user()->passengers()->create($validated);

        return redirect(route('passengers.index'));
    }

 
    public function update(Request $request, $id)
    {
        $passenger = Passenger::find($id);
        $passenger->fill($request->input())->saveOrFail();

        return redirect(route('passengers.index'));
    }

    
    public function destroy($id)
    {
        $passenger = Passenger::find($id);
        $passenger->delete();

        return redirect(route('passengers.index'));
    }
}
