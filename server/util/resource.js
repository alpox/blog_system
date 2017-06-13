/**
 * Util for koa - define resources
 * in a composable way.
 * @module resource.js
 * @author Elias Bernhaut
 */

import { compose } from "./compose";

export const withMethod =
    method => (path, middleware) => (...hooks) => router => {
        // Compose the hooks of one route
        const composedHooks =
            compose(...hooks)({
                after: [],
                before: [],
            });

        // Concat the hooks with the main callback
        const finalHooks = composedHooks.before
            .concat([middleware])
            .concat(composedHooks.after);

        // Finally register the route
        // And return the router
        return router[method](path, ...finalHooks);
    };

export const withGet = withMethod("get");
export const withPost = withMethod("post");
export const withDelete = withMethod("delete");
export const withPut = withMethod("put");
export const withPatch = withMethod("patch");

export const before = (...middleware) => hook => {
    hook.before.push(...middleware);
    return hook;
};

export const after = (...middleware) => hook => {
    hook.after.push(...middleware);
    return hook;
};

export const defaults = name => ({
    create: withPost("/", async (ctx, next) => {
        const { body } = ctx.request;
        body.created_at = ctx.db.fn.now();
        body.updated_at = ctx.db.fn.now();
        await ctx.db(name).insert(body);
        return await next();
    }),
    findAll: withGet("/", async (ctx, next) => {
        ctx.body = await ctx.db.select().from(name);
        return await next();
    }),
    findOne: withGet("/:id", async (ctx, next) => {
        const { id } = ctx.params;
        ctx.body = await ctx.db.where("id", id).first()
            .from(name);
        return await next();
    }),
    remove: withDelete("/:id", async (ctx, next) => {
        const { id } = ctx.params;
        await ctx.db(name)
            .where("id", id)
            .del();
        return await next();
    }),
    update: withPatch("/:id", async (ctx) => {
        const { id } = ctx.params;
        const { body } = ctx.request;
        body.updated_at = ctx.db.fn.now();
        return await ctx.db(name)
            .where("id", id)
            .update(body);
    }),
});

export const withDefaults = name =>
    compose(...Object.values(defaults(name)).map(def => def()));
