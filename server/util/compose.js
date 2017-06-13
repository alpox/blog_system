import Router from "koa-router";

export const compose = (...funcs) => {
    if (funcs.length === 0) {
        return arg => arg;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)));
};

export const composeRouter = name => (...funcs) => {
    const router = compose(...funcs)(new Router({
        name,
        prefix: `/${name}`,
    }));
    return [router.routes(), router.allowedMethods()];
};
