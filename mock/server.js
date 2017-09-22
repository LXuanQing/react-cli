const Koa = require('koa'), Router = require('koa-router');
const app = new Koa(), router = new Router;

// 首页
const homeAdData = require('./home/ad.js')
router.get('/home',(ctx, next) => {
    ctx.body = homeAdData;
});

// 首页列表
const homeListData = require('./home/list.js')
router.get('/homelist/:city/:page', (ctx, next) => {
    // 参数
    const params = ctx.params;
    const paramsCity = params.city;
    const paramsPage = params.page;
    console.log('当前城市：' + paramsCity);
    console.log('当前页数：' + paramsPage);
    ctx.body = homeListData;
});

// 开始服务并生成路由
app.use(router.routes())
app.listen(3000);
console.log('app running on port 3000');