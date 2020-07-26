const fs = require('fs');
const path = require('path');
const express = require('express');
const renderer = require('vue-server-renderer').createRenderer();
const createApp = require('../dist/index-server').default;

const template = fs.readFileSync(
    path.resolve(__dirname, '../dist/template.html'),
    'utf-8'
);
const data = require('./data.json');

const renderMarkup = (str) => {
    const dataStr = JSON.stringify(data);
    // 利用模板占位符解决SSR样式加载和数据加载的问题
    return template
        .replace('<!--SSR_HTML_PLACEHOLDER-->', str)
        .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.__inital_data=${dataStr}</script>`)
}

const server = (port) => {
    const app = express();

    app.use(express.static('dist'))

    app.get('*', (req, res) => {
        const context = { url: req.url };
        const vm = createApp(context);
        renderer.renderToString(vm, (err, str) => {
            if (err) {
                res.status(500).end('Internal Server Error')
                return;
            }
            const html = renderMarkup(str);
            res.end(html);
        })
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

server(process.env.PORT || 3000);
