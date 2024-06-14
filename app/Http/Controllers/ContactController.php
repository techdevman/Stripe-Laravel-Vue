<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMailable;

class ContactController extends Controller
{

    public function sendContactMessage(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'message' => 'required|string',
        ]);

        $contact = Contact::create([
            'user_id' => auth()->id(),
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
        ]);

        // Mail::to("surentechdev@gmail.com")
        //             ->queue(new ContactMailable($contact));

        return response()->json(['message' => 'Message successfully sent.'], 201);
    }
}
