const fs = require('fs');
const path = require('path');




function addController(dir, router) {
    let currentFile = path.resolve(__dirname, '../');
    const files = fs.readdirSync(`${currentFile}/${dir}`);
    var jsfile = files.filter((f) => {
        return f.endsWith('.js');
    });

    console.log(jsfile);

    for (var f of jsfile) {
    let mapping = require(`${currentFile}/${dir}/${f}`);
        for(var key in mapping) {
            let path;
            if(key.startsWith('GET ')) {
                path = key.substring(4);
                router.get(path, mapping[key]);
            }else if(key.startsWith('POST ')) {
                path = key.substring(5);
                router.post(path, mapping[key]);
            }else {
                console.log(`controller[25] invalid URL: ${key}`);
            }
        }
    }
}





module.exports = function(dir) {
    let controllers_dir = dir || 'controllers/login',
    router = require('koa-router')();
    addController(controllers_dir, router);
    return router.routes();
}