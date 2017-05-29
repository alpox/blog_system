import Router from 'koa-router';

const prefix = (name) => `/${name}`

export const defaultQuery = (db, name) => db.select().from(name);

export const resources = name => {
    const router = defaultResources(name, defaultQuery);
    return [ router.routes(), router.allowedMethods() ];
}

export const defaultResources = (name, queryCallback) =>
    new Router({prefix: prefix(name)})
        .get('/:id', async(ctx, next) => {
            const id = ctx.params.id;
            ctx.body = await ctx.db.where('id', id).first().from(name);
            await next();
        })
        .get('/', async(ctx, next) => {
            if(queryCallback) {
                ctx.body = await queryCallback(ctx.db, name);
                await next();
                return;
            }
            ctx.body = await defaultQuery(ctx.db, name);
            await next();
        })
        .post('/', async(ctx, next) => {
            const body = ctx.request.body;
            body.created_at = ctx.db.fn.now();
            body.updated_at = ctx.db.fn.now();
            await ctx.db(name).insert(body);
            await next();
        })
        .put('/:id', async(ctx, next) => {
            const id = ctx.params.id;
            const body = ctx.request.body;
            body.updated_at = ctx.db.fn.now();
            await ctx.db(name).where('id', id).update(body);
        })
        .delete('/:id', async(ctx, next) => {
            const id = ctx.params.id;
            await ctx.db(name).where('id', id).del();
            await next();
        })

export const withResource = (name, queryCallback) => 
    withNested(defaultResources(name, queryCallback))

export const withNested = router => app => 
    app.use(router.routes(), router.allowedMethods());