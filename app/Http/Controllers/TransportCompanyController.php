<?php

namespace App\Http\Controllers;

use App\Models\TransportCompany;
use Illuminate\Http\Request;
use Inertia\Inertia;



class TransportCompanyController extends Controller
{
   
    public function index()
    {
        return Inertia::render("Empresas_de_Transporte/Empresas_de_Transporte",[
            'transportCompanies'=> TransportCompany::all(),
            

        ]);
        
    }

   
    public function store(Request $request)
    {
            //Validacion de los datos
            $validated = $request->validate([
                'business_name'=>'required|string|max:100',
                'rut'=>'required',
                'turn'=>'required',
                'address'=>'required',
                'phone'=>'required',
                'email'=>'required'
    
            ]);    
            
            $request->user()->transportCompanies()->create($validated);
    
            return redirect(route('transportCompanies.index'));
    }

 
    public function update(Request $request,$id)
    {
        $transportCompany = TransportCompany::find($id);
        $transportCompany->fill($request->input())->saveOrFail();

        return redirect(route('transportCompanies.index'));
    }

    
    public function destroy($id)
    {
        $transportCompany = TransportCompany::find($id);
        $transportCompany->delete();

        return redirect(route('transportCompanies.index'));
    }
}
