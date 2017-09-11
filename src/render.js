const nunjucks = require('nunjucks');
const fs = require('fs');
const path1 = require('path');
function creatEnv(path, opts) {
    var 
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        loader = new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch
            }),
        env = new nunjucks.Environment(
            loader, {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            }
        );
        if(opts.filters) {
            for(var f in opts.filters) {
                env.addFilter(f, opts.filters[f]);
            }
        }

        return env;
}

var env = creatEnv(path1.resolve(__dirname, './views'), {
    watch: true,
    filters: {
        hex: (n) => {
            return '0x' + n.toString(16);
        }
    }
});

// console.log(env.render('hello.html'))

exports.env = env;