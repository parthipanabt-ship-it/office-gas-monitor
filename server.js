const express = require('express');
const app = express();
app.use(express.json());

let currentData = { gasValue: 0 };

// Endpoint for ESP8266 to send data
app.post('/update', (req, res) => {
    currentData = req.body;
    console.log("New data received:", currentData);
    res.sendStatus(200);
});

// The website people see
app.get('/', (req, res) => {
    const status = currentData.gasValue > 400 ? "DANGER" : "SAFE";
    const color = status === "DANGER" ? "#ff4757" : "#2ed573";
    
    res.send(`
        <html>
        <head><meta http-equiv="refresh" content="5"><title>Office Air Monitor</title></head>
        <body style="background:#2f3542; color:white; font-family:sans-serif; text-align:center; padding-top:100px;">
            <h1 style="color:${color}">OFFICE AIR STATUS: ${status}</h1>
            <div style="font-size:100px; margin:20px;">${currentData.gasValue}</div>
            <p style="font-size:20px;">Live MQ-2 Sensor Readings</p>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
