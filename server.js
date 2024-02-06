const express = require('express');
const os = require('os');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/get-ip', (req, res) => {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceKey of Object.keys(networkInterfaces)) {
        for (const interface of networkInterfaces[interfaceKey]) {
            if (!interface.internal && interface.family === 'IPv4') {
                return res.send(interface.address);
            }
        }
    }
    res.send('IP address not found');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});