const env = require('../../render');

const loginIndex = async (ctx, next) => {
    ctx.response.body = `<h1>hello，world</h1>
        <form action='./signin' method='post'>
            <p>Name: <input name='name' value='koa' /></p>
            <p>PassWord: <input type='password' name='password' /></p>
            <p>Name: <input type='submit' value='Submit' /></p>
        </form>
    `;
};

let evnRender = env.env;
const loginSignin = async (ctx, next) => {
    let name = ctx.request.body.name || '';
    let password = ctx.request.body.password || '';
    if(name == 'koa' && password === '123456') {
        ctx.body = evnRender.render('hello.html', {name: 'Welcome！'});
    }else {
        ctx.body = evnRender.render('hello.html', {name: 'Error'});
    }
};

module.exports = {
    'GET /': loginIndex,
    'POST /signin': loginSignin
};