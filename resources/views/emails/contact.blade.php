@component('mail::message')
# Message from {{ $contact->name }}

The Email: {{ $contact->email }}<br>

{{ $contact->message }}<br>

Thanks
@endcomponent