const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8000 });
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.send('Welcome to the WebSocket server');
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
    ws.on('error', (error) => {
        console.error(`Error from client: ${error}`);
    });
});

console.log('WebSocket server started on port 8000');