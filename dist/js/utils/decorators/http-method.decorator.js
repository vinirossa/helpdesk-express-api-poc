"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpOptions = exports.HttpDelete = exports.HttpPatch = exports.HttpPut = exports.HttpPost = exports.HttpGet = void 0;
var http_method_enum_1 = require("../enums/http-method.enum");
function createRoute(httpMethod, router, path, middleware) {
    switch (httpMethod) {
        case http_method_enum_1.HttpMethod.GET:
            router.get(path, middleware);
            break;
        case http_method_enum_1.HttpMethod.POST:
            router.post(path, middleware);
            break;
        case http_method_enum_1.HttpMethod.PUT:
            router.put(path, middleware);
            break;
        case http_method_enum_1.HttpMethod.PATCH:
            router.patch(path, middleware);
            break;
        case http_method_enum_1.HttpMethod.DELETE:
            router.delete(path, middleware);
            break;
        case http_method_enum_1.HttpMethod.OPTIONS:
            router.options(path, middleware);
            break;
        default:
            break;
    }
}
function HttpGet(router, path) {
    if (path === void 0) { path = '/'; }
    return function (target, propertyKey, descriptor) {
        createRoute(http_method_enum_1.HttpMethod.GET, router, path, descriptor.value);
    };
}
exports.HttpGet = HttpGet;
function HttpPost(router, path) {
    if (path === void 0) { path = '/'; }
    return function (target, propertyKey, descriptor) {
        createRoute(http_method_enum_1.HttpMethod.POST, router, path, descriptor.value);
    };
}
exports.HttpPost = HttpPost;
function HttpPut(router, path) {
    if (path === void 0) { path = '/'; }
    return function (target, propertyKey, descriptor) {
        createRoute(http_method_enum_1.HttpMethod.PUT, router, path, descriptor.value);
    };
}
exports.HttpPut = HttpPut;
function HttpPatch(router, path) {
    if (path === void 0) { path = '/'; }
    return function (target, propertyKey, descriptor) {
        createRoute(http_method_enum_1.HttpMethod.PATCH, router, path, descriptor.value);
    };
}
exports.HttpPatch = HttpPatch;
function HttpDelete(router, path) {
    if (path === void 0) { path = '/'; }
    return function (target, propertyKey, descriptor) {
        createRoute(http_method_enum_1.HttpMethod.DELETE, router, path, descriptor.value);
    };
}
exports.HttpDelete = HttpDelete;
function HttpOptions(router, path) {
    if (path === void 0) { path = '/'; }
    return function (target, propertyKey, descriptor) {
        createRoute(http_method_enum_1.HttpMethod.OPTIONS, router, path, descriptor.value);
    };
}
exports.HttpOptions = HttpOptions;
//# sourceMappingURL=http-method.decorator.js.map