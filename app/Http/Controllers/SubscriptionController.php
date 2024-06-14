<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function create(Request $request)
    {
        $plan = Plan::find($request->plan);

        $subscription = $request->user()->newSubscription($request->plan, $plan->stripe_plan)
                        ->create($request->token);

        return response()->json(['status' => 'subscription created']);
    }

    public function getPlans(Request $request)
    {
        $plans = Plan::all();
        return response()->json(['plans' => $plans]);
    }
}
