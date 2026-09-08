import http from 'node:http';

const port = process.env.PORT || 3000;

const server = http.createServer( async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}${req.url}`);

    switch (url.pathname) {
        case '/hello':
            switch (req.method) {
                case 'GET':
                    const name = url.searchParams.get('name');
                    sendJson(res, 200, {message: `Hello ${name}!`});
                    break;
                case 'POST':
                        try {
                            const person = await parseJsonBody(req, res);
                            const firsName = person.firstName || "Guest";
                            const lastName = person.lastName || "";
                            const fullName = `${firsName} ${lastName}`.trim()

                            sendJson(res, 200, {message: `Hello ${fullName}!`});
                        }
                        catch (error) {
                            sendJson(res,400, {message: `Invalid JSON. ${error}`});
                        }
                    return;
            }
            break;
        case '/feed':
            switch (req.method) {
                case 'GET':
                    break;
                case 'POST':
                    try {
                        const person = await parseJsonBody(req, res);
                        const firsName = person.firstName || "Guest";
                        const lastName = person.lastName || "";
                        const fullName = `${firsName} ${lastName}`.trim()
                        let foods = ['Candy', 'Cakes', 'Cookies'];
                        sendJson(res, 200, {fullName: fullName, foods: foods});
                    }
                    catch (error) {
                        sendJson(res,400, {message: `Invalid JSON. ${error}`});
                    }
                    return;
            }
            break;
        default:
            sendJson(res, 404, {message: `Not found!`});
            break;
    }
});

const sendJson = (res, code, data) => {
    res.writeHead(code, {'Content-Type': 'text/json'});
    return res.end(JSON.stringify(data));
}

const parseJsonBody = async (request, response) => {
    let body = '';
    for await (const chunk of request)
        body += chunk;
    return JSON.parse(body || "{}");
}

server.listen(port, () => console.log(`Listening on ${port}`));