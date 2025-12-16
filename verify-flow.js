const https = require('http');

const data = JSON.stringify({
    postId: 'manual-test-1',
    scheduledAt: new Date(Date.now() + 10000).toISOString(),
    content: 'Hello World via Gateway',
    platform: 'TWITTER'
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/posts',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
        process.stdout.write(d);
    });
});

req.on('error', error => {
    console.error(error);
});

req.write(data);
req.end();
