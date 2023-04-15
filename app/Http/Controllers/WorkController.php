<?php

namespace App\Http\Controllers;
use App\Models\Work;
use Illuminate\Http\Request;

class WorkController extends Controller
{
    public function index(Request $request)
    {
        $work = Work::all();
    
        return response()->json($work);
    }
    public function store(Request $request)
    {
        $work = new Work([
            'employeeId' => $request->input('employeeId'),
            'firstName' => $request->input('firstName'),
            'lastName' => $request->input('lastName'),
            'department' => $request->input('department'),
            'email' => $request->input('email'),
            'mobile' => $request->input('mobile'),
            'country' => $request->input('country'),
            'state' => $request->input('state'),
            'city' => $request->input('city'),
            'address' => $request->input('address'),
            
        ]);
        $work->save();
        return response()->json('Employee created!');
    }
    public function update(Request $request, $id)
    {
        $work = Work::find($id);
        $work->employeeId = $request->input('employeeId');
        $work->firstName= $request->input('firstName');
        $work->lastName = $request->input('lastName');
        $work->department = $request->input('department');
        $work->email = $request->input('email');
        $work->mobile = $request->input('mobile');
        $work->country= $request->input('country');
        $work->state = $request->input('state');
        $work->city = $request->input('city');
        $work->address = $request->input('address');
        
        $work->save();
        return response()->json('Employee updated successfully');
    }

    public function destroy($id)
    {
        $work = Work::find($id);
        $work->delete();
        return response()->json('Employee deleted successfully');
    }
   
    
}
