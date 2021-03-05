const { createServer } = require('http');
const { readFile, existsSync, lstatSync, readFileSync } = require('fs');
const { extname, join } = require('path');


const server = createServer((request, response) => {
    if (request.url === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' }).end(getIndex(), 'utf-8')
    }

    const filePath = `./${request.url}`
    const contentType = getContentType(extname(filePath));

    if (existsSync(filePath) && lstatSync(filePath).isFile()) {
        const content = readFileSync(filePath, 'utf-8');
        response.writeHead(200, { 'Content-Type': contentType }).end(content, 'utf-8');
    } else {
        response.writeHead(404, { 'Content-Type': contentType }).end("File not found", 'utf-8');
    }
})

server.listen(3000, () => {
    console.log('listening on localhost:3000')
});


function getIndex() {
    return `<html>
    <head>
        <title>Devserver</title>
    </head>
    <body>
        <div id="app"></div>
        <script type="module" src="./main.js"></script>
    </body>
</html>
    `
}

function getContentType(/** @type {string} */extname) {
    switch (extname) {
        case '.js': return 'text/javascript';
        case '.css': return 'text/css';
        case '.json': return 'application/json';
        case '.png':
        case '.jpg': return 'image/jpg';
        default: return 'text/html';
    }
}