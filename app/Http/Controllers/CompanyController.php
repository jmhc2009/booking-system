<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;



class CompanyController extends Controller
{
    
    public function index()
    {
        return Inertia::render("Empresas/Empresas",[
            'companies'=> Company::all(),
            

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

        $request->user()->companies()->create($validated);

        return redirect(route('companies.index'));
    }

    public function update(Request $request, $id)
    {
        $company = Company::find($id);
        $company->fill($request->input())->saveOrFail();

        return redirect(route('companies.index'));
    }

    
    public function destroy($id)
    {
        $company = Company::find($id);
        $company->delete();

        return redirect(route('companies.index'));
    }
}
