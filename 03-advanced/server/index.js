const express = require('express');
const renderer = require('vue-server-renderer').createRenderer();
const createApp = require('../dist/index-server').default;

const renderMarkup = (str) => `<!DOCTYPE html>
    <html lang="zh-CN">
      <meta charset="UTF-8">
      <head><title>Home</title></head>
      <body><div id="app">${str}</div></body>
    </html>`

const server = (port) => {
    const app = express();

    app.use(express.static('dist'))

    app.get('*', (req, res) => {
        const context = { url: req.url };
        const vm = createApp(context);
        renderer.renderToString(vm, (err, html) => {
            if (err) {
                res.status(500).end('Internal Server Error')
                return;
            }
            res.end(renderMarkup(html));
        })
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

server(process.env.PORT || 3000);
