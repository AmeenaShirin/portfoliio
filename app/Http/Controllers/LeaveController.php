<?php

namespace App\Http\Controllers;
use App\Models\Leave;
use Illuminate\Http\Request;

class LeaveController extends Controller
{
    public function index()
    {
        $leave = Leave::all();
        return response()->json($leave);
    }  
    public function store(Request $request)
    {
        $leave = new Leave([
            'leaveName' => $request->input('leaveName'),
            
        ]);
        $leave->save();
        return response()->json('Leave created!');
    }
    public function update(Request $request, $id)
    {
        $leave = Leave::find($id);
        $leave->leaveName = $request->input('leaveName');
        $leave->save();
        return response()->json('Leave updated successfully');
    }

    public function destroy($id)
    {
        $leave = Leave::find($id);
        $leave->delete();
        return response()->json('Leave deleted successfully');
    }
}
