import http from 'node:http';

const port = process.env.PORT || 3000;

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
//     res.end('Hello World');
// })

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//     res.end('<h1>Hello World</h1>');
// })

// const server = http.createServer((req, res) => {
//     res.end(req.url);
// })

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//
//     if (req.url === '/user') {
//         res.write('<h1>Hello User!</h1>');
//     }
//     if (req.url === '/group') {
//         res.write('<h1>Hello Group!</h1>');
//     }
//     res.end();
// })

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plane; charset=utf-8' });
//     const url= new URL(req.url, `http://${req.headers.host}${req.url}`);
//     const name = url.searchParams.get('name');
//     res.end('Hello ' + name + '!');
// })

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    const url= new URL(req.url, `http://${req.headers.host}${req.url}`);
    const name = url.searchParams.get('name');
    res.end(JSON.stringify({message: `Hello ${name}!`}));
})

server.listen(port, () => console.log(`Listening on port ${port}`));