<!DOCTYPE html>
<html>

<head>
    <title>Potvrda rezervacije</title>
    <style>
        body {
            font-family: sans-serif;
            line-height: 1.6;
            color: #333;
        }

        .container {
            padding: 20px;
            border: 1px solid #eee;
            border-radius: 10px;
        }

        .header {
            color: #d63384;
            font-size: 24px;
            font-weight: bold;
        }

        .details {
            margin-top: 20px;
            background: #f9f9f9;
            padding: 15px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">Vaš termin je zakazan!</div>

        <p>Zdravo, <strong>{{ $reservation->client->first_name }}</strong>,</p>

        <p>Ovaj mejl je potvrda da ste uspešno rezervisali termin u našem salonu.</p>

        <div class="details">
            <p><strong>Usluga:</strong> {{ $reservation->service->name }}</p>
            <p><strong>Frizer:</strong> {{ $reservation->hairdresser->first_name }}</p>
            <p><strong>Vreme:</strong> {{ \Carbon\Carbon::parse($reservation->start_time)->format('d.m.Y \u H:i') }}</p>
        </div>

        <p>Ukoliko želite da otkažete termin, molimo Vas da to uradite putem aplikacije najkasnije 24h ranije.</p>

        <p>Vidimo se!</p>
    </div>
</body>

</html>