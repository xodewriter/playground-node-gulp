// Modules
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Config server
const protocol = 'http';
const host = 'localhost';
const port = 5000;

// Create server
http
	.createServer((req, res) => {
		console.log('request ', req.url);

		let filePath = path.join(
			__dirname,
			'src',
			req.url === '/' ? 'index.html' : req.url
		);

		const extname = String(path.extname(filePath)).toLowerCase();

		const mimeTypes = {
			'.html': 'text/html',
			'.js': 'text/javascript',
			'.css': 'text/css',
			'.json': 'application/json',
			'.png': 'image/png',
			'.jpg': 'image/jpg',
			'.gif': 'image/gif',
			'.svg': 'image/svg+xml',
			'.wav': 'audio/wav',
			'.mp4': 'video/mp4',
			'.woff': 'application/font-woff',
			'.ttf': 'application/font-ttf',
			'.eot': 'application/vnd.ms-fontobject',
			'.otf': 'application/font-otf',
			'.wasm': 'application/wasm',
		};

		const contentType = mimeTypes[extname] || 'application/octet-stream';

		fs.readFile(filePath, (error, content) => {
			if (error) {
				if (error.code == 'ENOENT') {
					fs.readFile(
						path.join(__dirname, 'src', '404.html'),
						(error, content) => {
							res.writeHead(404, { 'Content-Type': 'text/html' });
							res.end(content, 'utf-8');
						}
					);
				} else {
					fs.readFile(
						path.join(__dirname, 'src', '500.html'),
						(error, content) => {
							res.writeHead(500, { 'Content-Type': 'text/html' });
							res.end(content, 'utf-8');
						}
					);
				}
			} else {
				// Success
				res.writeHead(200, { 'Content-Type': contentType });
				res.end(content, 'utf-8');
			}
		});
	})
	.listen(port, () => {
		console.log(`Server running at ${protocol}://${host}:${port}/`);
	});
