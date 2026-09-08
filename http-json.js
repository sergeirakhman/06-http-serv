import http from 'node:http';

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}${req.url}`);

    if (req.method === 'GET' && url.pathname === '/hello') {
        const name = url.searchParams.get('name');
        sendJson(res, 200, {message: `Hello ${name}!`});
    }
    if (req.method === 'POST' && url.pathname === '/hello') {
        let body = '';
        req.on('data', (chunk) => body += chunk);
        req.on('end', () => {
            try {
                const person = JSON.parse(body || {});
                const firsName = person.firstName || "Guest";
                const lastName = person.lastName || "";
                const fullName = `${firsName} ${lastName}`.trim()

                sendJson(res, 200, {message: `Hello ${fullName}!`});
            }
            catch (error) {
                sendJson(res,400, {message: `Invalid JSON. ${error}`});
            }
        })
        return;
    }

    sendJson(res, 404, {message: `Not found!`});
});

const sendJson = (res, code, data) => {
    res.writeHead(code, {'Content-Type': 'text/json'});
    return res.end(JSON.stringify(data));
}

server.listen(port, () => console.log(`Listening on ${port}`));