const Koa = require('koa');
const controllers = require('./controllers/index');
const bodyParser = require('koa-bodyparser');
const request = require('request-promise');
const app = new Koa();








app.use(bodyParser());

app.use(async (ctx, next) => {
    //  console.log(ctx);     
     try {
         await next();
     } catch(e){
        ctx.status = 500;
        ctx.body = '500';
     }
     if(parseInt(ctx.response.status) === 404){

         let option = {
                url: 'http://bangumi.bilibili.com/player/web_api/playurl?cid=20501470&appkey=84956560bc028eb7&otype=json&type=&quality=112&module=bangumi&qn=112&sign=e886b783ec11fbdf9839d324aaffef12',
                method: ctx.request.method,
                json: true,
                // headers: ctx.request.header,  异常
                body: ctx.request.body
        };

         await request(option, (e, response, body) => {
             console.log(body);
            ctx.body = body;
         })
        // ctx.redirect('https://bangumi.bilibili.com/player/web_api/playurl?cid=20501470&appkey=84956560bc028eb7&otype=json&type=&quality=112&module=bangumi&qn=112&sign=e886b783ec11fbdf9839d324aaffef12');
    }

    
});

// app.use(function*(next) {  
//     try {
//         yield* next;
//     } catch (e) {
//        this.status = 500;
//        this.body = '500';
//     }
//     console.log(this.request.url);
//     if(parseInt(this.status) === 404){
//        this.body = '404';
//     }
// });


// router.get('/test/:name', async (ctx, next) => {
//     ctx.response.body = '<h1>test</h1>';
// });

app.use(controllers());
// app.use(router.routes());

app.listen(3000, () => console.log('ok 3000'));