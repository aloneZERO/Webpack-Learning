const { getAST, getDependencies, transform } = require('./parser');
const path = require('path');
const fs = require('fs');

module.exports = class Compiler {
    
    constructor(options) {
        const {  entry, output } = options;
        this.entry = entry;
        this.output = output;
        this.modules = [];
    }

    run() {
        const entryModule = this.buildModule(this.entry, true);
        this.modules.push(entryModule);
        this.modules.map(_module => {
            _module.dependencies.map(dependency => {
                this.modules.push(this.buildModule(dependency));
            })
        })

        this.emitFiles();
    }

    buildModule(filename, isEntry) {
        let ast;

        if (isEntry) {
            ast = getAST(filename);
        } else {
            const absolutePath = path.join(process.cwd(), './src', filename);
            ast = getAST(absolutePath);
        }

        return {
            filename,
            dependencies: getDependencies(ast),
            source: transform(ast)
        }
    }

    emitFiles() {
        const outputPath = path.resolve(this.output.path, this.output.filename);
        
        let modules = this.modules.map(_module => {
            return `'${_module.filename}': function(require, module, exports) {${_module.source}}`
        }).join(',');
        modules = `{${modules}}`;

        const bundle = `(function(modules) {
            function require(filename) {
                var fn = modules[filename];
                var module = { exports: {} };
                fn(require, module, module.exports);
                return module.exports;
            }
            require('${this.entry}');
        })(${modules})`
            .split('\n')
            .map(line => line ? line.trim() : '')
            .join('');

        let dir = path.parse(outputPath).dir;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        fs.writeFileSync(outputPath, bundle, 'utf-8');
    }
}