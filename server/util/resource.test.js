import {
    after,
    before,
    withDelete,
    withGet,
    withPatch,
    withPost,
    withPut,
} from "./resource";
import { compose } from "./compose";

const routerMock = () => {
    const router = {
        delete: jest.fn(() => router),
        get: jest.fn(() => router),
        patch: jest.fn(() => router),
        post: jest.fn(() => router),
        put: jest.fn(() => router),
    };
    return router;
};

const attachtesToRightRouterMethod = (method, shortHandWithMethod) => () => {
    const router = routerMock();
    shortHandWithMethod()()(router);
    expect(router[method]).toBeCalled();
};

describe("router resources", () => {
    test("can be used to setup a simple router with a middleware", () => {
        const middlewareMock = jest.fn();
        const router = routerMock();
        withGet("/", middlewareMock)()(router);
        expect(router.get).toHaveBeenCalledWith("/", middlewareMock);
    });

    test("can be used to setup a router with a middleware and before hook", () => {
        const middlewareMock = jest.fn();
        const hookMock = jest.fn();
        const router = routerMock();
        withGet("/", middlewareMock)(before(hookMock))(router);
        expect(router.get).toHaveBeenCalledWith("/", hookMock, middlewareMock);
    });

    test("can be used to setup a router with a middleware and an after hook", () => {
        const middlewareMock = jest.fn();
        const hookMock = jest.fn();
        const router = routerMock();
        withGet("/", middlewareMock)(after(hookMock))(router);
        expect(router.get).toHaveBeenCalledWith("/", middlewareMock, hookMock);
    });

    test("can be composed", () => {
        const middlewareMock = jest.fn();
        const hookMock = jest.fn();
        const router = routerMock();
        compose(
            withGet("/", middlewareMock)(),
            withGet("/foo", middlewareMock)(
                before(hookMock)
            ),
            withGet("/bar", middlewareMock)(
                after(hookMock)
            )
        )(router);
        expect(router.get).toHaveBeenCalledTimes(3);
        expect(router.get.mock.calls[0][0]).toBe("/bar");
        expect(router.get.mock.calls[0][2]).toBe(hookMock);
        expect(router.get.mock.calls[1][0]).toBe("/foo");
        expect(router.get.mock.calls[1][1]).toBe(hookMock);
        expect(router.get.mock.calls[2][0]).toBe("/");
    });

    test("shorthand withMethod (withGet) attaches to the right router method",
        attachtesToRightRouterMethod("get", withGet));

    test("shorthand withMethod (withPost) attaches to the right router method",
        attachtesToRightRouterMethod("post", withPost));

    test("shorthand withMethod (withPut) attaches to the right router method",
        attachtesToRightRouterMethod("put", withPut));

    test("shorthand withMethod (withPatch) attaches to the right router method",
        attachtesToRightRouterMethod("patch", withPatch));

    test("shorthand withMethod (withDelete) attaches to the right router method",
        attachtesToRightRouterMethod("delete", withDelete));
});
