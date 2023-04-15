<?php

namespace App\Http\Controllers;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index()
    {
        $department = Department::all();
        return response()->json($department);
    }  
    public function store(Request $request)
    {
        $department = new Department([
            'name' => $request->input('name'),
            
        ]);
        $department->save();
        return response()->json('Department created!');
    }

    public function update(Request $request, $id)
    {
        $department = Department::find($id);
        $department->name = $request->input('name');
        $department->save();
        return response()->json('Department updated successfully');
    }

    public function destroy($id)
    {
        $department = Department::find($id);
        $department->delete();
        return response()->json('Department deleted successfully');
    }
}

