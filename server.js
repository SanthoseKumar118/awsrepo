const express = require('express');
const path = require('path');
const os = require('os');
const app = express();
const port = 3000;

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for fetching server IP
app.get('/ip', (req, res) => {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceKey of Object.keys(networkInterfaces)) {
        for (const interface of networkInterfaces[interfaceKey]) {
            if (!interface.internal && interface.family === 'IPv4') {
                return res.json({ ip: interface.address });
            }
        }
    }
    res.status(404).json({ error: 'IP address not found' });
});

// Fallback route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});