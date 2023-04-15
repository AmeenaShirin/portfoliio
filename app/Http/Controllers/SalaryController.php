<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Salary;
class SalaryController extends Controller
{
    public function index()
    {
        $salary = Salary::all();
        return response()->json($salary);
    }  
    public function store(Request $request)
    {
        $salary = new Salary([
            'department' => $request->input('department'),
            'name' => $request->input('name'),
            'salary1' => $request->input('salary1'),
            'allowanceSalary' => $request->input('allowanceSalary'),
            'total'=> $request->input('total'),
        ]);
        $salary->save();
        return response()->json('Salary created!');
    }
    public function update(Request $request, $id)
    {
        $salary = Salary::find($id);
        $salary->department = $request->input('department');
        $salary->name = $request->input('name');
        $salary->salary1 = $request->input('salary1');
        $salary->allowanceSalary = $request->input('allowanceSalary');
        $salary->total = $request->input('total');
    
        
        $salary->save();
        return response()->json('Salary updated successfully');
    }

    public function destroy($id)
    {
        $salary = Salary::find($id);
        $salary->delete();
        return response()->json('Salary deleted successfully');
    }
   
}
