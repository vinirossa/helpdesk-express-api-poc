import { RequestHandler, Router } from "express";
import { HttpMethod } from "../enums/http-method.enum";

function createRoute(
    httpMethod: HttpMethod,
    router: Router,
    path: string,
    middleware: RequestHandler,
): void {
    switch (httpMethod) {
        case HttpMethod.GET:
            router.get(path, middleware);
            break;
        case HttpMethod.POST:
            router.post(path, middleware);
            break;
        case HttpMethod.PUT:
            router.put(path, middleware);
            break;
        case HttpMethod.PATCH:
            router.patch(path, middleware);
            break;
        case HttpMethod.DELETE:
            router.delete(path, middleware);
            break;
        case HttpMethod.OPTIONS:
            router.options(path, middleware);
            break;
        default:
            break;
    }
}

export function HttpGet(router: Router, path: string = "/") {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): void => {
        createRoute(HttpMethod.GET, router, path, descriptor.value);
    };
}

export function HttpPost(router: Router, path: string = "/") {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): void => {
        createRoute(HttpMethod.POST, router, path, descriptor.value);
    };
}

export function HttpPut(router: Router, path: string = "/") {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): void => {
        createRoute(HttpMethod.PUT, router, path, descriptor.value);
    };
}

export function HttpPatch(router: Router, path: string = "/") {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): void => {
        createRoute(HttpMethod.PATCH, router, path, descriptor.value);
    };
}

export function HttpDelete(router: Router, path: string = "/") {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): void => {
        createRoute(HttpMethod.DELETE, router, path, descriptor.value);
    };
}

export function HttpOptions(router: Router, path: string = "/") {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): void => {
        createRoute(HttpMethod.OPTIONS, router, path, descriptor.value);
    };
}
