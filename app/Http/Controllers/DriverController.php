<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\TransportCompany;
use Illuminate\Http\Request;
use Inertia\Inertia;


class DriverController extends Controller
{
    
    public function index()
    {
        
        return Inertia::render("Conductores/Conductores",[
            'drivers'=> Driver::all(),            
            
           
          
            

        ]);
        
    }
    
    public function store(Request $request)
    {
         //Validacion de los datos
         $validated = $request->validate([

            'name'=>'required|string|max:100',
            'surname'=>'required',
            'phone'=>'required',
            'email'=>'required',
            'address'=>'required',
            'bank'=>'required',
            'account'=>'required',
            'account_type'=>'required',

        ]);
       
        //dd($validated);
        $request->user()->drivers()->create($validated);

        

        return redirect(route('drivers.index'));
    }

    
    public function update(Request $request,$id)
    {
        $driver = Driver::find($id);
        $driver->fill($request->input())->saveOrFail();

        return redirect(route('drivers.index'));
    }

    
    public function destroy($id)
    {
        $driver = Driver::find($id);
        $driver->delete();

        return redirect(route('drivers.index'));
    }
}
