<?php

namespace App\Http\Controllers;
use App\Models\Apply;
use Illuminate\Http\Request;

class ApplyController extends Controller
{
    public function index()
    {
        $apply = Apply::all();
        return response()->json($apply);
    }  
    public function store(Request $request)
    {
        $leave = new Apply([
            'leaveName' => $request->input('leaveName'),
            'startDate' => $request->input('startDate'),
            'endDate' => $request->input('endDate'),
            'description' => $request->input('description'),
            
        ]);
        $leave->save();
        return response()->json('Leave created!');
    }
    public function update(Request $request, $id)
    {
        $apply = Apply::findOrFail($id);
        $apply->status = 'approved'; // Update the status column to "approved"
        $apply->save();

        return response()->json(['message' => 'Leave request approved successfully'], 200);
    }

    public function destroy($id)
    {
        $apply = Apply::find($id);
        $apply->delete();
        return response()->json('Employee deleted successfully');
    }
    
}

